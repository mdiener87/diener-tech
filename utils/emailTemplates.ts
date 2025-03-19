interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function generateContactEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          border: 1px solid #e9ecef;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          color: #495057;
        }
        .message {
          white-space: pre-wrap;
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>New Contact Form Submission</h2>
      </div>
      <div class="content">
        <div class="field">
          <div class="field-label">From:</div>
          <div>${data.name} (${data.email})</div>
        </div>
        <div class="field">
          <div class="field-label">Message:</div>
          <div class="message">${data.message}</div>
        </div>
        <hr>
        <p style="color: #6c757d; font-size: 0.9em;">
          This message was sent from the contact form on diener.tech
        </p>
      </div>
    </body>
    </html>
  `;
}

export function generateContactEmailText(data: ContactFormData): string {
  return `
New Contact Form Submission

From: ${data.name} (${data.email})

Message:
${data.message}

--
Sent from the contact form on diener.tech
  `.trim();
} 