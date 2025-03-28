import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // Get runtime config
  const config = useRuntimeConfig()
  
  const recaptchaStatus = {
    hasSecretKey: !!config.recaptchaSecret,
    secretKeyLength: config.recaptchaSecret ? config.recaptchaSecret.length : 0,
    hasSiteKey: !!config.public.recaptchaSiteKey,
    siteKeyLength: config.public.recaptchaSiteKey ? config.public.recaptchaSiteKey.length : 0,
    // Add masked versions of keys for verification
    siteKeyPrefix: config.public.recaptchaSiteKey ? `${config.public.recaptchaSiteKey.substring(0, 6)}...` : null,
    secretKeyPrefix: config.recaptchaSecret ? `${config.recaptchaSecret.substring(0, 6)}...` : null,
    timestamp: new Date().toISOString()
  }
  
  return {
    status: 'success',
    data: recaptchaStatus
  }
}) 