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

  // Enhanced cleanup function to remove reCAPTCHA elements from DOM
  const cleanup = () => {
    if (process.client) {
      // Remove script tag
      const scriptTag = document.getElementById(scriptId)
      if (scriptTag) {
        scriptTag.remove()
      }
      
      // Remove the badge style
      const badgeStyle = document.getElementById('recaptcha-badge-style')
      if (badgeStyle) {
        badgeStyle.remove()
      }
      
      // Aggressively hide any remaining badge elements
      const badges = document.getElementsByClassName('grecaptcha-badge')
      if (badges && badges.length > 0) {
        for (let i = 0; i < badges.length; i++) {
          const badge = badges[i] as HTMLElement
          badge.style.visibility = 'hidden'
          badge.style.opacity = '0'
          badge.style.display = 'none'
        }
      }
      
      // Remove any reCAPTCHA iframes
      const iframes = document.querySelectorAll('iframe[src*="recaptcha"]')
      iframes.forEach(iframe => iframe.remove())
      
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
      
      // Add the style back to ensure badges stay hidden
      setTimeout(() => {
        const newStyle = document.createElement('style')
        newStyle.id = 'recaptcha-badge-style'
        newStyle.textContent = `
          .grecaptcha-badge { 
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
        `
        document.head.appendChild(newStyle)
      }, 100)
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
          
          // Hide the reCAPTCHA badge with aggressive CSS and periodic checks
          // This ensures it stays hidden even when navigating between pages
          const style = document.createElement('style')
          style.textContent = `
            .grecaptcha-badge { 
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              display: none !important;
              width: 0 !important;
              height: 0 !important;
              position: absolute !important;
              left: -9999px !important;
            }
          `
          style.id = 'recaptcha-badge-style'
          document.head.appendChild(style)
          
          // Set up a periodic check to ensure the badge stays hidden
          // This handles cases where the badge is recreated after our CSS is applied
          const ensureBadgeHidden = () => {
            const badges = document.getElementsByClassName('grecaptcha-badge')
            if (badges && badges.length > 0) {
              for (let i = 0; i < badges.length; i++) {
                const badge = badges[i] as HTMLElement
                badge.style.visibility = 'hidden'
                badge.style.opacity = '0'
                badge.style.display = 'none'
              }
            }
          }
          
          // Run immediately
          ensureBadgeHidden()
          
          // Then check periodically for 10 seconds after load
          const intervalId = setInterval(ensureBadgeHidden, 500)
          setTimeout(() => clearInterval(intervalId), 10000)
          
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