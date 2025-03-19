import { H3Event } from 'h3'
import { RateLimiter } from '~/utils/rateLimit'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get runtime config
    const runtime = useRuntimeConfig()
    
    // Get KV storage from Nitro context
    const storage = useStorage()
    if (!storage) {
      console.error('Storage not available')
      throw createError({
        statusCode: 500,
        message: 'Storage configuration error'
      })
    }

    // Initialize rate limiter with storage
    const rateLimiter = new RateLimiter(storage, {
      maxAttempts: 3,
      windowSeconds: 3600 // 1 hour
    })

    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    const remainingAttempts = await rateLimiter.getRemainingAttempts(ip)

    return {
      remainingAttempts,
      ip: process.env.NODE_ENV === 'development' ? ip : undefined // Only show IP in development
    }
  } catch (error: any) {
    console.error('Rate limit check error:', error)
    throw createError({
      statusCode: 500,
      message: process.env.NODE_ENV === 'development' 
        ? `Failed to check rate limit: ${error?.message || 'Unknown error'}`
        : 'Failed to check rate limit'
    })
  }
}) 