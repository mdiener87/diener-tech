import { H3Event } from "h3";
import { Resend } from "resend";
import { RateLimiter } from "~/utils/rateLimit";
import {
  generateContactEmailHtml,
  generateContactEmailText,
} from "~/utils/emailTemplates";

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
    console.log("conact form event handler");
    const config = useRuntimeConfig();

    // Get KV storage from Nitro context - specifically use the 'kv' namespace
    const kvStorage = useStorage('kv');
    if (!kvStorage) {
      console.error("KV storage not available");
      throw createError({
        statusCode: 500,
        message: "Storage configuration error",
      });
    }

    // Initialize rate limiter with storage
    const rateLimiter = new RateLimiter(kvStorage, {
      maxAttempts: 3,
      windowSeconds: 3600, // 1 hour
    });

    const body = await readBody(event);
    const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";

    // Check rate limit
    const isLimited = await rateLimiter.isRateLimited(ip);
    if (isLimited) {
      return createError({
        statusCode: 429,
        message: "Too many attempts. Please try again later.",
      });
    }

    // Verify reCAPTCHA - but skip in development mode
    // Use useNitro().dev to check if we're in development mode
    const isDev = process.dev;
    if (!isDev) {
      if (!body.recaptchaToken) {
        console.error("Missing reCAPTCHA token");
        return createError({
          statusCode: 400,
          message: "reCAPTCHA verification required",
        });
      }

      try {
        // Get site verification from Google
        const recaptchaResponse = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            body: new URLSearchParams({
              secret: config.recaptchaSecret,
              response: body.recaptchaToken,
              ...(ip ? { remoteip: ip } : {}),
            }),
          }
        );

        if (!recaptchaResponse.ok) {
          console.error("reCAPTCHA API error:", await recaptchaResponse.text());
          return createError({
            statusCode: 500,
            message: "Error verifying reCAPTCHA",
          });
        }

        const recaptchaData =
          (await recaptchaResponse.json()) as ReCaptchaResponse;

        // For v3 reCAPTCHA, success might be true but with a low score
        if (!recaptchaData.success) {
          console.error("reCAPTCHA verification failed:", recaptchaData);
          return createError({
            statusCode: 400,
            message: "Failed to verify reCAPTCHA",
          });
        }

        // Check score only if it exists (v3 only)
        if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
          console.error("reCAPTCHA score too low:", recaptchaData.score);
          return createError({
            statusCode: 400,
            message: "Security check failed",
          });
        }
      } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        return createError({
          statusCode: 500,
          message: "Error processing reCAPTCHA verification",
        });
      }
    } else {
      console.log("Development mode: Skipping reCAPTCHA verification");
    }

    // Honeypot check
    if (body.website) {
      return createError({
        statusCode: 400,
        message: "Invalid submission",
      });
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    // Send email via Resend
    console.log("Sending email using Resend");
    
    // Initialize the Resend client with API key from runtime config
    const resend = new Resend(config.resendApiKey);
    
    let emailResponseId;
    try {
      const emailResponse = await resend.emails.send({
        from: 'Contact Form <contact@diener.tech>',
        to: ['contact@diener.tech'],
        subject: `New Contact Form Submission from ${body.name}`,
        text: generateContactEmailText(body),
        html: generateContactEmailHtml(body),
        reply_to: body.email,
      });

      console.log('Resend result:', JSON.stringify(emailResponse, null, 2))

      
      if (emailResponse.error) {
        console.error('Resend reported error:', emailResponse.error)
        throw createError({ statusCode: 500, message: 'Failed to send email' })
      }
      
      emailResponseId = emailResponse.data?.id ?? "email-id-not-found";
      console.log("Email sent successfully:", emailResponseId);
    } catch (emailError) {
      console.error("Resend error:", emailError);
      throw createError({
        statusCode: 500,
        message: "Failed to send email",
      });
    }

    // Get remaining attempts for response
    const remainingAttempts = await rateLimiter.getRemainingAttempts(ip);

    return {
      success: true,
      remainingAttempts,
      message: "Message sent successfully",
      emailId: emailResponseId,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return createError({
      statusCode: 500,
      message: "Failed to process contact form submission",
    });
  }
});
