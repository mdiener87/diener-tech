import { H3Event } from 'h3'
import { RateLimiter } from '~/utils/rateLimit'

const rateLimiter = new RateLimiter(process.env.CONTACT_FORM_KV, {
  maxAttempts: 3,
  windowSeconds: 3600
})

export default defineEventHandler(async (event: H3Event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const remainingAttempts = await rateLimiter.getRemainingAttempts(ip)

  return {
    remainingAttempts
  }
}) 