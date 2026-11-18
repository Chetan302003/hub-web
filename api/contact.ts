import nodemailer from 'nodemailer';

interface ContactRequestBody {
  name?: string;
  email?: string;
  discordId?: string;
  subject?: string;
  message?: string;
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Parse body for both Vercel Serverless and local dev middleware
    let body: ContactRequestBody = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (!body) {
      body = await new Promise<ContactRequestBody>((resolve) => {
        let raw = '';
        req.on('data', (chunk: any) => {
          raw += chunk;
        });
        req.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve({});
          }
        });
      });
    }

    const { name, email, discordId, subject, message } = body;

    // Field validations
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required to connect back' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Main context / message is required' });
    }

    // SMTP Configuration from .env
    const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.in';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass || smtpPass === '') {
      console.warn(
        '[Contact API] SMTP credentials missing. Please set SMTP_USER and SMTP_PASS in .env'
      );
      return res.status(503).json({
        error:
          'Zoho Mail SMTP credentials are not configured yet. Please set SMTP_USER and SMTP_PASS in .env.',
        code: 'MISSING_SMTP_CREDENTIALS',
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedDiscord = discordId?.trim() || null;
    const sanitizedSubject = subject.trim();
    const sanitizedMessage = message.trim();

    // Responsive HTML Email Template
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #0b0f19; color: #f3f4f6; border: 1px solid rgba(112, 238, 255, 0.2); border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a, #082f49); padding: 26px; border-bottom: 2px solid #70eeff;">
          <h2 style="margin: 0; color: #70eeff; font-size: 20px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
            MY HUB &bull; Contact Transmission
          </h2>
          <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 12px; font-weight: 500;">
            Incoming communication from chetanmahajan.site
          </p>
        </div>

        <!-- Details Table -->
        <div style="padding: 26px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
            <tr>
              <td style="padding: 9px 0; color: #94a3b8; font-size: 13px; width: 140px;"><strong>Operator Name:</strong></td>
              <td style="padding: 9px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${sanitizedName}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #94a3b8; font-size: 13px;"><strong>Return Email:</strong></td>
              <td style="padding: 9px 0; color: #70eeff; font-size: 14px; font-weight: 600;">
                <a href="mailto:${sanitizedEmail}" style="color: #70eeff; text-decoration: underline;">${sanitizedEmail}</a>
              </td>
            </tr>
            ${sanitizedDiscord
        ? `<tr>
                    <td style="padding: 9px 0; color: #94a3b8; font-size: 13px;"><strong>Discord ID:</strong></td>
                    <td style="padding: 9px 0; color: #c084fc; font-size: 14px; font-weight: 700;">
                      <span style="background: rgba(192, 132, 252, 0.15); border: 1px solid rgba(192, 132, 252, 0.3); padding: 3px 8px; border-radius: 6px;">
                        ${sanitizedDiscord}
                      </span>
                      <span style="color: #94a3b8; font-size: 11px; margin-left: 6px;">(Faster reply requested)</span>
                    </td>
                  </tr>`
        : ''
      }
            <tr>
              <td style="padding: 9px 0; color: #94a3b8; font-size: 13px;"><strong>Subject:</strong></td>
              <td style="padding: 9px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${sanitizedSubject}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #94a3b8; font-size: 13px;"><strong>Timestamp:</strong></td>
              <td style="padding: 9px 0; color: #94a3b8; font-size: 12px; font-family: monospace;">${new Date().toUTCString()}</td>
            </tr>
          </table>

          <!-- Main Context -->
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px;">
            <p style="margin: 0 0 10px 0; color: #70eeff; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;">
              Main Context / Message
            </p>
            <div style="background-color: #030712; padding: 20px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.08); white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
${sanitizedMessage}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #030712; padding: 16px 26px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; color: #94a3b8; text-align: center;">
          Reply directly to this email to respond to <strong>${sanitizedName}</strong> (${sanitizedEmail}).
        </div>
      </div>
    `;

    // Plain text alternative
    const textContent = `[MY HUB Contact Transmission]

From: ${sanitizedName} (${sanitizedEmail})
${sanitizedDiscord ? `Discord ID: ${sanitizedDiscord} (Faster reply requested)\n` : ''}Subject: ${sanitizedSubject}
Received: ${new Date().toUTCString()}

Main Context:
---------------------------------------------
${sanitizedMessage}
---------------------------------------------
Target Inbox: ${recipientEmail}
`;

    // Send Mail via Zoho SMTP
    const info = await transporter.sendMail({
      from: `"MY HUB Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: `"${sanitizedName}" <${sanitizedEmail}>`,
      subject: `[MY HUB] ${sanitizedSubject}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('[Contact API] Email dispatched via Zoho SMTP:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Transmission successfully sent via Zoho Mail SMTP',
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('[Contact API] Nodemailer SMTP failure:', error);
    return res.status(500).json({
      error: error.message || 'SMTP transmission failure',
      code: error.code || 'SMTP_ERROR',
    });
  }
}
