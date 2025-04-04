import { H3Event } from 'h3'
import { RateLimiter } from '~/utils/rateLimit'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get runtime config
    const runtime = useRuntimeConfig()
    
    // Get KV storage from Nitro context - specifically use the 'kv' namespace
    const kvStorage = useStorage('kv')
    if (!kvStorage) {
      console.error('KV storage not available')
      throw createError({
        statusCode: 500,
        message: 'Storage configuration error'
      })
    }

    // Initialize rate limiter with storage
    const rateLimiter = new RateLimiter(kvStorage, {
      maxAttempts: 3,
      windowSeconds: 3600 // 1 hour
    })

    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    const remainingAttempts = await rateLimiter.getRemainingAttempts(ip)

    return {
      remainingAttempts,
      ip: process.dev ? ip : undefined // Only show IP in development
    }
  } catch (error: any) {
    console.error('Rate limit check error:', error)
    throw createError({
      statusCode: 500,
      message: process.dev
        ? `Failed to check rate limit: ${error?.message || 'Unknown error'}`
        : 'Failed to check rate limit'
    })
  }
}) 