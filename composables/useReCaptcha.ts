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
  const scriptId = 'recaptcha-script'
  const badgeId = 'recaptcha-badge-container'

  // Cleanup function to remove reCAPTCHA elements from DOM
  const cleanup = () => {
    if (process.client) {
      // Remove script tag
      const scriptTag = document.getElementById(scriptId)
      if (scriptTag) {
        scriptTag.remove()
      }
      
      // Remove badge container if it exists
      const badgeContainer = document.getElementById(badgeId)
      if (badgeContainer) {
        badgeContainer.remove()
      }
      
      // Remove any other reCAPTCHA elements that might be present
      const recaptchaElements = document.querySelectorAll('.grecaptcha-badge')
      recaptchaElements.forEach(el => el.remove())
      
      // Reset loaded state
      isLoaded.value = false
      isLoading.value = false
      
      // Remove grecaptcha from window object if possible
      if (window.grecaptcha) {
        try {
          // @ts-ignore - attempt to remove grecaptcha from window
          window.grecaptcha = undefined
        } catch (e) {
          console.warn('Could not undefine window.grecaptcha')
        }
      }
    }
  }

  const loadReCaptcha = () => {
    return new Promise<void>((resolve, reject) => {
      if (!process.client) {
        reject(new Error('reCAPTCHA can only be loaded in browser environment'))
        return
      }
      
      // Check for existing script first
      if (document.getElementById(scriptId)) {
        cleanup() // Clean up existing reCAPTCHA elements before loading again
      }
      
      // Check for already loaded grecaptcha
      if (window.grecaptcha) {
        isLoaded.value = true
        resolve()
        return
      }

      // Start loading
      isLoading.value = true

      // Create badge container to control visibility
      const badgeContainer = document.createElement('div')
      badgeContainer.id = badgeId
      badgeContainer.style.cssText = 'position: fixed; bottom: 0; right: 0; z-index: 1000;'
      document.body.appendChild(badgeContainer)

      // Create and append script
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        // Wait for grecaptcha to be ready
        window.grecaptcha.ready(() => {
          isLoaded.value = true
          isLoading.value = false
          
          // Move the reCAPTCHA badge into our container for better control
          setTimeout(() => {
            const badges = document.querySelectorAll('.grecaptcha-badge')
            badges.forEach(badge => {
              // Only move badge if not already in our container
              if (badge.parentElement !== badgeContainer) {
                badgeContainer.appendChild(badge)
              }
            })
          }, 1000)
          
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

  // Load reCAPTCHA on component mount if in client
  onMounted(() => {
    if (process.client && siteKey) {
      loadReCaptcha().catch(error => {
        console.error('Error loading reCAPTCHA:', error)
      })
    }
  })

  const executeReCaptcha = async (action: string): Promise<string> => {
    if (!process.client) {
      throw new Error('reCAPTCHA can only be executed in browser environment')
    }
    
    if (!siteKey) {
      throw new Error('reCAPTCHA site key is not configured')
    }

    // Handle development mode with a fake token
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV MODE] Executing reCAPTCHA with action: ${action}`)
      return 'dev-mode-recaptcha-token'
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
    isLoading,
    cleanup
  }
} 