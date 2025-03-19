import { onMounted, ref } from 'vue'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function useReCaptcha() {
  const config = useRuntimeConfig()
  const siteKey = config.public.recaptchaSiteKey
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const loadReCaptcha = () => {
    return new Promise<void>((resolve, reject) => {
      // Already loaded
      if (window.grecaptcha) {
        isLoaded.value = true
        resolve()
        return
      }

      // Start loading
      isLoading.value = true

      // Create and append script
      const script = document.createElement('script')
      script.id = 'recaptcha'
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        // Wait for grecaptcha to be ready
        window.grecaptcha.ready(() => {
          isLoaded.value = true
          isLoading.value = false
          resolve()
        })
      }
      
      script.onerror = (error) => {
        console.error('Failed to load reCAPTCHA:', error)
        isLoading.value = false
        reject(new Error('Failed to load reCAPTCHA'))
      }

      document.head.appendChild(script)
    })
  }

  // Load reCAPTCHA on component mount
  onMounted(() => {
    if (!document.querySelector('script#recaptcha')) {
      loadReCaptcha().catch(error => {
        console.error('Error loading reCAPTCHA:', error)
      })
    }
  })

  const executeReCaptcha = async (action: string): Promise<string> => {
    if (!siteKey) {
      throw new Error('reCAPTCHA site key is not configured')
    }

    // Load if not already loaded
    if (!isLoaded.value) {
      await loadReCaptcha()
    }

    try {
      // Execute reCAPTCHA with the given action
      return await window.grecaptcha.execute(siteKey, { action })
    } catch (error) {
      console.error('reCAPTCHA execution error:', error)
      throw error
    }
  }

  return {
    executeReCaptcha,
    isLoaded,
    isLoading
  }
} 