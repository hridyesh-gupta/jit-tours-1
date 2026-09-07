import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  createTransporter,
  generateBookingId,
  buildOwnerAlertEmail,
  buildCustomerConfirmationEmail
} from './api/_lib/email.js';
import { saveEnquiry } from './api/_lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());

// In-memory inquiry log for this server session (for local dev inspection only)
const inquiriesStore = [];

const isGmailConfigured = () => Boolean(
  process.env.GMAIL_USER &&
  process.env.GMAIL_APP_PASSWORD &&
  !process.env.GMAIL_APP_PASSWORD.includes('your_16_digit')
);

// Root Landing & API Status Dashboard
app.get('/', (req, res) => {
  const gmailConfigured = isGmailConfigured();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Jit Tours and Travels &bull; Backend API Server</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #090d16; color: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; line-height: 1.6; }
        .card { max-width: 720px; width: 100%; background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(245, 158, 11, 0.08); }
        .header { background: linear-gradient(135deg, #1e293b, #0f172a); border-bottom: 1px solid #1e293b; padding: 28px 32px; }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .brand-icon { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }
        h1 { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; }
        .subtitle { color: #94a3b8; font-size: 13px; margin-top: 2px; }
        .status-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-top: 12px; }
        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); animation: pulse 1.8s infinite; }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); } }
        .body-content { padding: 28px 32px; }
        .info-box { background: rgba(30, 41, 59, 0.6); border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .info-box h3 { font-family: 'Outfit', sans-serif; font-size: 14px; color: #fbbf24; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
        .stat-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 14px; }
        .stat-label { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
        .stat-value { color: #ffffff; font-size: 15px; font-weight: 600; margin-top: 4px; }
        .table-wrap { background: #141e33; border: 1px solid #233554; border-radius: 10px; overflow-x: auto; margin-top: 10px; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left; }
        th { background: #1e293b; padding: 10px 14px; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #334155; }
        td { padding: 10px 14px; border-bottom: 1px solid #1e293b; color: #cbd5e1; }
        .actions { display: flex; gap: 12px; margin-top: 24px; }
        .btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 18px; border-radius: 10px; font-weight: 600; font-size: 13.5px; text-decoration: none; cursor: pointer; transition: all 0.2s ease; border: none; }
        .btn-primary { background: linear-gradient(135deg, #f59e0b, #d97706); color: #090d16; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3); }
        .btn-primary:hover { background: linear-gradient(135deg, #fbbf24, #f59e0b); transform: translateY(-1px); }
        .btn-secondary { background: #1e293b; color: #f1f5f9; border: 1px solid #334155; }
        .btn-secondary:hover { background: #334155; color: #ffffff; }
        .footer { border-top: 1px solid #1e293b; padding: 16px 32px; text-align: center; color: #64748b; font-size: 12px; background: #0b1120; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="brand">
            <div class="brand-icon">🚗</div>
            <div>
              <h1>Jit Tours and Travels API Server</h1>
              <div class="subtitle">Express Backend &bull; Enquiry & Mail Dispatch</div>
            </div>
          </div>
          <div class="status-badge">
            <span class="pulse-dot"></span>
            Server Online & Listening (Port ${PORT})
          </div>
        </div>

        <div class="body-content">
          <div class="info-box">
            <h3>💡 Frontend Application</h3>
            <p style="font-size: 13px; color: #cbd5e1;">
              You have accessed the backend API service directly. The user-facing website runs on the Vite frontend server at
              <a href="${FRONTEND_URL}" style="color: #38bdf8; text-decoration: underline;"><strong>${FRONTEND_URL}</strong></a>.
            </p>
          </div>

          <div class="grid">
            <div class="stat-card">
              <div class="stat-label">Gmail Notification Service</div>
              <div class="stat-value" style="color: ${gmailConfigured ? '#34d399' : '#fbbf24'};">
                ${gmailConfigured ? '✅ Configured (Active Mode)' : 'ℹ️ Dev Mock Mode'}
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Enquiries Received</div>
              <div class="stat-value" style="color: #38bdf8;">
                ${inquiriesStore.length} Enquiries Logged
              </div>
            </div>
          </div>

          <h3 style="font-family: 'Outfit', sans-serif; font-size: 14px; color: #f1f5f9; margin-bottom: 8px;">
            Recent Enquiries (${inquiriesStore.length})
          </h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Place</th>
                  <th>Email Status</th>
                </tr>
              </thead>
              <tbody>
                ${inquiriesStore.length === 0 ? `
                  <tr>
                    <td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">
                      No enquiries received yet in this server session. Submit one from the frontend!
                    </td>
                  </tr>
                ` : inquiriesStore.slice(-5).reverse().map(inq => `
                  <tr>
                    <td><strong style="color: #fbbf24;">${inq.bookingId}</strong></td>
                    <td>${inq.fullName} <span style="font-size: 11px; color: #94a3b8;">(${inq.phone})</span></td>
                    <td>${inq.carType || 'Not Sure'}</td>
                    <td>${inq.place || 'Not Sure'}</td>
                    <td>
                      <span style="color: ${inq.emailSent ? '#34d399' : '#fbbf24'}; font-size: 11px; font-weight: 600;">
                        ${inq.emailSent ? '✅ Sent' : (inq.emailError ? '⚠️ Logged' : 'ℹ️ Mocked')}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="actions">
            <a href="${FRONTEND_URL}" class="btn btn-primary">
              🌐 Open Frontend Web App (${FRONTEND_URL})
            </a>
            <a href="/api/health" class="btn btn-secondary" target="_blank">
              🩺 Test Health API (/api/health)
            </a>
          </div>
        </div>

        <div class="footer">
          Jit Tours and Travels &bull; Automated Enquiry Notification Engine
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Jit Tours and Travels Enquiry Backend',
    port: PORT,
    timestamp: new Date().toISOString(),
    inquiriesCount: inquiriesStore.length,
    gmailConfigured: isGmailConfigured(),
    sender: process.env.GMAIL_USER || null
  });
});

// Get recent enquiries (for local admin inspection)
app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    total: inquiriesStore.length,
    inquiries: inquiriesStore
  });
});

// Post Endpoint for Enquiries
app.post('/api/inquiry', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      carType = '',
      place = '',
      message = ''
    } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Phone Number, and Email are required.'
      });
    }

    const bookingId = generateBookingId();
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const inquiryRecord = {
      bookingId,
      submissionTime,
      fullName,
      phone,
      email,
      carType,
      place,
      message,
      emailSent: false,
      emailError: null
    };

    const ownerHtml = buildOwnerAlertEmail({ bookingId, submissionTime, fullName, email, phone, carType, place, message });
    const customerHtml = buildCustomerConfirmationEmail({ bookingId, fullName, carType, place });

    const transporter = createTransporter();

    let mode = 'mock';

    if (!transporter) {
      console.log('\n======================================================');
      console.log('📬 [MOCK GMAIL NOTIFICATION LOGGED - DEV MODE]');
      console.log(`Ref ID: ${bookingId}`);
      console.log(`Customer: ${fullName} (${email}, ${phone})`);
      console.log(`Car: ${carType || 'Not Sure'} | Place: ${place || 'Not Sure'}`);
      console.log('ℹ️ Mock mode active. To send real emails, generate an App Password in your Google Account.');
      console.log('======================================================\n');
    } else {
      const receiver = process.env.NOTIFICATION_RECEIVER || process.env.GMAIL_USER;

      try {
        await transporter.sendMail({
          from: `"Jit Tours and Travels Enquiry System" <${process.env.GMAIL_USER}>`,
          to: receiver,
          subject: `🚘 [NEW ENQUIRY ${bookingId}] ${fullName} — ${carType || 'Any Car'} to ${place || 'Not Specified'}`,
          html: ownerHtml
        });

        await transporter.sendMail({
          from: `"Jit Tours and Travels" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `We've Received Your Enquiry [${bookingId}] - Jit Tours and Travels`,
          html: customerHtml
        });

        mode = 'live';
        inquiryRecord.emailSent = true;

        console.log(`\n✅ [GMAIL SENT] Enquiry Ref ${bookingId} dispatched successfully to ${receiver} and ${email}\n`);

      } catch (mailError) {
        console.error('\n⚠️ [GMAIL DISPATCH NOTICE]:', mailError.message);
        if (mailError.code === 'EAUTH') {
          console.error('👉 Cause: Google rejected the Gmail App Password.');
          console.error('👉 Solution: Generate a 16-character App Password at: https://myaccount.google.com/apppasswords');
        }
        console.log(`📦 Enquiry Ref ${bookingId} for ${fullName} (${phone}) has been securely logged on the server.\n`);

        mode = 'logged_fallback';
        inquiryRecord.emailError = mailError.message;
      }
    }

    inquiriesStore.push(inquiryRecord);

    // Best-effort — an unconfigured or unreachable database never blocks
    // the customer from getting their confirmation.
    await saveEnquiry({ bookingId, fullName, email, phone, carType, place, message, emailSent: inquiryRecord.emailSent });

    return res.status(200).json({
      success: true,
      mode,
      emailSent: inquiryRecord.emailSent,
      emailError: inquiryRecord.emailError,
      bookingId,
      message: inquiryRecord.emailSent ? 'Enquiry submitted! Confirmation email sent.' : 'Enquiry received! Ref: ' + bookingId
    });

  } catch (error) {
    console.error('Error handling enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing enquiry.',
      error: error.message
    });
  }
});

// Custom 404 Handler
app.use((req, res) => {
  if (req.accepts('html')) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>404 Not Found &bull; Jit Tours and Travels API</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; background: #090d16; color: #f1f5f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .box { background: #0f172a; border: 1px solid #1e293b; padding: 32px; border-radius: 16px; text-align: center; max-width: 480px; }
          h2 { color: #f59e0b; margin-bottom: 8px; }
          p { color: #94a3b8; font-size: 14px; margin-bottom: 20px; }
          a { display: inline-block; background: #f59e0b; color: #090d16; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>404 &bull; Endpoint Not Found</h2>
          <p>The requested route <code>${req.url}</code> does not exist on this backend server.</p>
          <a href="/">Go to Backend Dashboard</a>
        </div>
      </body>
      </html>
    `);
  }
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} not found. Available endpoints: GET /api/health, POST /api/inquiry`
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Jit Tours and Travels Express Server running on http://localhost:${PORT}`);
  console.log(`🌐 Frontend Web App URL: ${FRONTEND_URL}`);
  console.log(`📧 Gmail Status: ${isGmailConfigured() ? 'CONFIGURED ✅' : 'DEV MOCK MODE ℹ️'}`);
  console.log(`======================================================\n`);
});
