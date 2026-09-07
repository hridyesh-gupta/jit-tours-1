import nodemailer from 'nodemailer';
import { OWNER_PHONE, OWNER_PHONE_DISPLAY, OWNER_WHATSAPP_NUMBER, OWNER_EMAIL } from '../../src/data/fleetData.js';

export function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || pass.includes('your_16_digit')) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, '')
    }
  });
}

export function generateBookingId() {
  return `JIT-${Math.floor(100000 + Math.random() * 900000)}`;
}

// Email clients (Gmail dark mode especially) often ignore color set only via
// a <style> block and repaint text using their own dark-mode heuristics.
// Every text-bearing element below sets its color inline as well, which
// email clients respect far more reliably.
const EMAIL_STYLES = `
  body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; }
  .header { background: linear-gradient(135deg, #d97706, #b45309); padding: 24px; text-align: center; }
  .content { padding: 24px; }
  .grid { display: table; width: 100%; margin-bottom: 10px; }
  .row { display: table-row; }
  .cell-label { display: table-cell; padding: 6px 12px 6px 0; font-size: 14px; width: 35%; }
  .cell-val { display: table-cell; padding: 6px 0; font-weight: 500; font-size: 14px; }
  .highlight-box { background: #0f172a; border-left: 4px solid #f59e0b; padding: 14px; border-radius: 6px; margin: 16px 0; }
  .btn-confirm { display: block; width: 100%; text-align: center; background-color: #10b981; font-weight: bold; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-size: 15px; margin-top: 20px; box-sizing: border-box; }
  .footer { background: #0f172a; text-align: center; padding: 16px; font-size: 12px; border-top: 1px solid #334155; }
`;

const C = {
  text: '#f8fafc',
  muted: '#94a3b8',
  faint: '#64748b',
  amber: '#f59e0b',
  white: '#ffffff',
  dark: '#0f172a',
  link: '#38bdf8'
};

export function buildOwnerAlertEmail({ bookingId, submissionTime, fullName, email, phone, carType, place, message }) {
  return `
    <!DOCTYPE html>
    <html>
    <head><style>${EMAIL_STYLES}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.5px; color: ${C.white};">🚗 New Travel Enquiry Received!</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: ${C.white};">Ref ID: <strong>${bookingId}</strong> | ${submissionTime} IST</p>
        </div>
        <div class="content">
          <span style="display: inline-block; background: ${C.amber}; color: ${C.dark}; font-weight: bold; padding: 4px 10px; border-radius: 9999px; font-size: 12px; margin-bottom: 16px;">NEW WEBSITE ENQUIRY</span>

          <div style="font-size: 16px; font-weight: 600; color: ${C.amber}; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px;">👤 Customer Contact Information</div>
          <div class="grid">
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Name:</div><div class="cell-val" style="color: ${C.text};"><strong>${fullName}</strong></div></div>
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Phone / WhatsApp:</div><div class="cell-val" style="color: ${C.text};"><a href="tel:${phone}" style="color: ${C.link};">${phone}</a></div></div>
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Email Address:</div><div class="cell-val" style="color: ${C.text};"><a href="mailto:${email}" style="color: ${C.link};">${email}</a></div></div>
          </div>

          <div style="font-size: 16px; font-weight: 600; color: ${C.amber}; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px;">🚘 Trip Preference</div>
          <div class="grid">
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Preferred Car:</div><div class="cell-val" style="color: ${C.text};"><strong>${carType || 'Not Sure / Recommend'}</strong></div></div>
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Destination / Place:</div><div class="cell-val" style="color: ${C.text};">${place || 'Not Sure / Other'}</div></div>
          </div>

          ${message ? `
          <div class="highlight-box">
            <strong style="color: ${C.amber};">Message from Customer:</strong><br/>
            <span style="color: #cbd5e1; font-size: 14px;">${message}</span>
          </div>` : ''}
        </div>
        <div class="footer" style="color: ${C.faint};">
          Jit Tours and Travels &bull; Automated Website Enquiry Notification
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildCustomerConfirmationEmail({ bookingId, fullName, carType, place }) {
  const waMsg = encodeURIComponent(
    `Hello Jit Tours and Travels, I just submitted an enquiry (Ref: ${bookingId}). Following up here.`
  );
  const waUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${waMsg}`;

  return `
    <!DOCTYPE html>
    <html>
    <head><style>${EMAIL_STYLES}</style></head>
    <body>
      <div class="container">
        <div class="header" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
          <h1 style="margin: 0; font-size: 22px; color: ${C.dark};">Thanks for Reaching Out!</h1>
          <p style="margin: 5px 0 0 0; font-weight: bold; color: ${C.dark};">Jit Tours and Travels &bull; UP & MP Tour & Taxi Services</p>
        </div>
        <div class="content">
          <p style="color: ${C.text}; font-size: 14px; line-height: 1.6;">Namaste <strong>${fullName}</strong>,</p>
          <p style="color: ${C.text}; font-size: 14px; line-height: 1.6;">Thank you for your enquiry with <strong>Jit Tours and Travels</strong> (Ref: <strong style="color: ${C.amber};">${bookingId}</strong>). Our team has been notified and will get back to you shortly with availability and a final quotation.</p>

          <div class="grid" style="background: ${C.dark}; border: 1px solid #334155; border-radius: 8px; padding: 12px 16px;">
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Reference ID:</div><div class="cell-val" style="color: ${C.amber};">${bookingId}</div></div>
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Preferred Car:</div><div class="cell-val" style="color: ${C.text};">${carType || 'To be recommended'}</div></div>
            <div class="row"><div class="cell-label" style="color: ${C.muted};">Destination:</div><div class="cell-val" style="color: ${C.text};">${place || 'To be discussed'}</div></div>
          </div>

          <a href="${waUrl}" class="btn-confirm" style="color: ${C.white};" target="_blank">
            💬 CHAT WITH US ON WHATSAPP
          </a>

          <p style="font-size: 12px; color: ${C.muted}; text-align: center; margin-top: 12px;">
            Or call our helpline directly: <strong style="color: ${C.text};">${OWNER_PHONE_DISPLAY}</strong>
          </p>
        </div>
        <div class="footer" style="color: ${C.faint};">
          Jit Tours and Travels &bull; Civil Lines / Sangam Area, Prayagraj, UP &bull; ${OWNER_EMAIL}
        </div>
      </div>
    </body>
    </html>
  `;
}

export { OWNER_PHONE, OWNER_PHONE_DISPLAY, OWNER_WHATSAPP_NUMBER, OWNER_EMAIL };
