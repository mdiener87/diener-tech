import { onMounted } from 'vue'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

export function useReCaptcha() {
  onMounted(() => {
    if (!document.querySelector('script#recaptcha')) {
      const script = document.createElement('script')
      script.id = 'recaptcha'
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      document.head.appendChild(script)
    }
  })

  const executeReCaptcha = async (action: string): Promise<string> => {
    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded')
    }

    return new Promise((resolve, reject) => {
      try {
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          resolve(token)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    executeReCaptcha
  }
} 