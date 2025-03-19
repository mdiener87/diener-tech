import { H3Event } from 'h3'
import { RateLimiter } from '~/utils/rateLimit'
import { generateContactEmailHtml, generateContactEmailText } from '~/utils/emailTemplates'

interface ReCaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get runtime config
    const config = useRuntimeConfig()
    
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

    const body = await readBody(event)
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

    // Check rate limit
    const isLimited = await rateLimiter.isRateLimited(ip)
    if (isLimited) {
      return createError({
        statusCode: 429,
        message: 'Too many attempts. Please try again later.'
      })
    }

    // Verify reCAPTCHA - but skip in development mode
    if (process.env.NODE_ENV !== 'development') {
      if (!body.recaptchaToken) {
        console.error('Missing reCAPTCHA token')
        return createError({
          statusCode: 400,
          message: 'reCAPTCHA verification required'
        })
      }
      
      try {
        // Get site verification from Google
        const recaptchaResponse = await fetch(
          'https://www.google.com/recaptcha/api/siteverify',
          { 
            method: 'POST', 
            body: new URLSearchParams({
              'secret': config.recaptchaSecret,
              'response': body.recaptchaToken,
              'remoteip': ip
            })
          }
        )
        
        if (!recaptchaResponse.ok) {
          console.error('reCAPTCHA API error:', await recaptchaResponse.text())
          return createError({
            statusCode: 500,
            message: 'Error verifying reCAPTCHA'
          })
        }
        
        const recaptchaData = await recaptchaResponse.json() as ReCaptchaResponse
        console.log('reCAPTCHA response:', recaptchaData)
        
        // For v3 reCAPTCHA, success might be true but with a low score
        if (!recaptchaData.success) {
          console.error('reCAPTCHA verification failed:', recaptchaData)
          return createError({
            statusCode: 400,
            message: 'Failed to verify reCAPTCHA'
          })
        }
        
        // Check score only if it exists (v3 only)
        if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
          console.error('reCAPTCHA score too low:', recaptchaData.score)
          return createError({
            statusCode: 400,
            message: 'Security check failed'
          })
        }
      } catch (error) {
        console.error('reCAPTCHA verification error:', error)
        return createError({
          statusCode: 500,
          message: 'Error processing reCAPTCHA verification'
        })
      }
    } else {
      console.log('Development mode: Skipping reCAPTCHA verification')
    }

    // Honeypot check
    if (body.website) {
      return createError({
        statusCode: 400,
        message: 'Invalid submission'
      })
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return createError({
        statusCode: 400,
        message: 'Missing required fields'
      })
    }

    // Send email via Cloudflare
    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "contact@diener.tech" }],
          },
        ],
        from: {
          email: "no-reply@diener.tech",
          name: "Contact Form",
        },
        subject: `New Contact Form Submission from ${body.name}`,
        content: [
          {
            type: "text/plain",
            value: generateContactEmailText(body),
          },
          {
            type: "text/html",
            value: generateContactEmailHtml(body),
          },
        ],
      }),
    })

    // Get remaining attempts for response
    const remainingAttempts = await rateLimiter.getRemainingAttempts(ip)

    return {
      success: true,
      remainingAttempts,
      message: 'Message sent successfully'
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return createError({
      statusCode: 500,
      message: 'Failed to process contact form submission'
    })
  }
}) 