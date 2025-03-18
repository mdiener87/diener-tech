import { H3Event } from 'h3'
import { RateLimiter } from '~/utils/rateLimit'
import { generateContactEmailHtml, generateContactEmailText } from '~/utils/emailTemplates'

// Initialize rate limiter with KV namespace
const rateLimiter = new RateLimiter(process.env.CONTACT_FORM_KV, {
  maxAttempts: 3,
  windowSeconds: 3600 // 1 hour
})

export default defineEventHandler(async (event: H3Event) => {
  try {
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

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`,
      { method: 'POST' }
    )
    
    const recaptchaData = await recaptchaResponse.json()
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return createError({
        statusCode: 400,
        message: 'Invalid captcha verification'
      })
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