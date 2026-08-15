import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());

// In-memory persistent inquiry store
const inquiriesStore = [];

// Helper to create Nodemailer Transporter
const createTransporter = () => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || pass.includes('your_16_digit')) {
    return null; // Signals mock/development fallback
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, '') // remove any accidental spaces in app password
    }
  });
};

// Root Landing & API Status Dashboard
app.get('/', (req, res) => {
  const isGmailConfigured = Boolean(
    process.env.GMAIL_USER && 
    process.env.GMAIL_APP_PASSWORD && 
    !process.env.GMAIL_APP_PASSWORD.includes('your_16_digit')
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BharatWheels &bull; Backend API Server</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #090d16;
          color: #f1f5f9;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          line-height: 1.6;
        }
        .card {
          max-width: 760px;
          width: 100%;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(245, 158, 11, 0.08);
        }
        .header {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border-bottom: 1px solid #1e293b;
          padding: 28px 32px;
          position: relative;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .subtitle {
          color: #94a3b8;
          font-size: 13px;
          margin-top: 2px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          margin-top: 12px;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
          animation: pulse 1.8s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }
        .body-content {
          padding: 28px 32px;
        }
        .info-box {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .info-box h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #fbbf24;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .grid { grid-template-columns: 1fr; }
        }
        .stat-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 14px;
        }
        .stat-label {
          color: #94a3b8;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .stat-value {
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          margin-top: 4px;
        }
        .table-wrap {
          background: #141e33;
          border: 1px solid #233554;
          border-radius: 10px;
          overflow-x: auto;
          margin-top: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
          text-align: left;
        }
        th {
          background: #1e293b;
          padding: 10px 14px;
          color: #94a3b8;
          font-weight: 600;
          border-bottom: 1px solid #334155;
        }
        td {
          padding: 10px 14px;
          border-bottom: 1px solid #1e293b;
          color: #cbd5e1;
        }
        .actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #090d16;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          transform: translateY(-1px);
        }
        .btn-secondary {
          background: #1e293b;
          color: #f1f5f9;
          border: 1px solid #334155;
        }
        .btn-secondary:hover {
          background: #334155;
          color: #ffffff;
        }
        .footer {
          border-top: 1px solid #1e293b;
          padding: 16px 32px;
          text-align: center;
          color: #64748b;
          font-size: 12px;
          background: #0b1120;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="brand">
            <div class="brand-icon">🚗</div>
            <div>
              <h1>BharatWheels API Server</h1>
              <div class="subtitle">Express Backend &bull; Outstation Car Rentals & Mail Dispatch</div>
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
              <div class="stat-value" style="color: ${isGmailConfigured ? '#34d399' : '#fbbf24'};">
                ${isGmailConfigured ? '✅ Configured (Active Mode)' : 'ℹ️ Dev Mock Mode'}
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Inquiries Received</div>
              <div class="stat-value" style="color: #38bdf8;">
                ${inquiriesStore.length} Inquiries Logged
              </div>
            </div>
          </div>

          <h3 style="font-family: 'Outfit', sans-serif; font-size: 14px; color: #f1f5f9; margin-bottom: 8px;">
            Recent Inquiries (${inquiriesStore.length})
          </h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Car</th>
                  <th>Email Status</th>
                </tr>
              </thead>
              <tbody>
                ${inquiriesStore.length === 0 ? `
                  <tr>
                    <td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">
                      No inquiries received yet in this server session. Submit one from the frontend!
                    </td>
                  </tr>
                ` : inquiriesStore.slice(-5).reverse().map(inq => `
                  <tr>
                    <td><strong style="color: #fbbf24;">${inq.bookingId}</strong></td>
                    <td>${inq.fullName} <span style="font-size: 11px; color: #94a3b8;">(${inq.phone})</span></td>
                    <td>${inq.pickupCity} ➔ ${inq.dropCity}</td>
                    <td>${inq.carType.split('(')[0]}</td>
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
          BharatWheels Car Rentals &bull; Automated Outstation Booking Engine
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
    service: 'BharatWheels Booking Backend',
    port: PORT,
    timestamp: new Date().toISOString(),
    inquiriesCount: inquiriesStore.length,
    gmailConfigured: Boolean(
      process.env.GMAIL_USER && 
      process.env.GMAIL_APP_PASSWORD && 
      !process.env.GMAIL_APP_PASSWORD.includes('your_16_digit')
    ),
    sender: process.env.GMAIL_USER || null
  });
});

// Get recent inquiries (for admin inspection)
app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    total: inquiriesStore.length,
    inquiries: inquiriesStore
  });
});

// Post Endpoint for Booking Inquiries
app.post('/api/inquiry', async (req, res) => {
  try {
    const {
      pickupCity,
      dropCity,
      tripType = 'Outstation Round-Trip',
      passengers = '4',
      carType = '7-Seater MPV (Innova Crysta / Ertiga)',
      driverPreference = 'With Professional Chauffeur',
      pickupDate,
      returnDate,
      pickupTime = '08:00 AM',
      fullName,
      phone,
      email,
      notes = 'N/A',
      calculatedDistance = 'N/A'
    } = req.body;

    // Basic Validation
    if (!pickupCity || !dropCity || !fullName || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required inquiry fields (Pickup, Destination, Name, Phone, Email are required).'
      });
    }

    const bookingId = `BW-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Store inquiry in memory
    const inquiryRecord = {
      bookingId,
      submissionTime,
      fullName,
      phone,
      email,
      pickupCity,
      dropCity,
      calculatedDistance,
      tripType,
      carType,
      passengers,
      driverPreference,
      pickupDate,
      returnDate: returnDate || 'N/A',
      pickupTime,
      notes,
      emailSent: false,
      emailError: null
    };

    // Build Admin Email HTML
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; }
          .header { background: linear-gradient(135deg, #d97706, #b45309); padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; letter-spacing: 0.5px; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 24px; }
          .badge { display: inline-block; background: #f59e0b; color: #0f172a; font-weight: bold; padding: 4px 10px; border-radius: 9999px; font-size: 12px; margin-bottom: 16px; }
          .section-title { font-size: 16px; font-weight: 600; color: #f59e0b; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px; }
          .grid { display: table; width: 100%; margin-bottom: 10px; }
          .row { display: table-row; }
          .cell-label { display: table-cell; padding: 6px 12px 6px 0; color: #94a3b8; font-size: 14px; width: 40%; }
          .cell-val { display: table-cell; padding: 6px 0; color: #f8fafc; font-weight: 500; font-size: 14px; }
          .highlight-box { background: #0f172a; border-left: 4px solid #f59e0b; padding: 14px; border-radius: 6px; margin: 16px 0; }
          .footer { background: #0f172a; text-align: center; padding: 16px; color: #64748b; font-size: 12px; border-top: 1px solid #334155; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 New Travel Inquiry Received!</h1>
            <p>Ref ID: <strong>${bookingId}</strong> | ${submissionTime} IST</p>
          </div>
          <div class="content">
            <span class="badge">MAX 1500 KM COVERAGE TRIP</span>

            <div class="section-title">📍 Trip & Route Details</div>
            <div class="grid">
              <div class="row"><div class="cell-label">Pickup City:</div><div class="cell-val">${pickupCity}</div></div>
              <div class="row"><div class="cell-label">Destination:</div><div class="cell-val">${dropCity}</div></div>
              <div class="row"><div class="cell-label">Est. Distance:</div><div class="cell-val">${calculatedDistance}</div></div>
              <div class="row"><div class="cell-label">Trip Type:</div><div class="cell-val">${tripType}</div></div>
            </div>

            <div class="section-title">🚘 Vehicle & Passenger Selection</div>
            <div class="grid">
              <div class="row"><div class="cell-label">Selected Car:</div><div class="cell-val"><strong>${carType}</strong></div></div>
              <div class="row"><div class="cell-label">Passengers:</div><div class="cell-val">${passengers} Person(s)</div></div>
              <div class="row"><div class="cell-label">Driver Mode:</div><div class="cell-val">${driverPreference}</div></div>
            </div>

            <div class="section-title">📅 Dates & Schedule</div>
            <div class="grid">
              <div class="row"><div class="cell-label">Pickup Date:</div><div class="cell-val">${pickupDate}</div></div>
              <div class="row"><div class="cell-label">Return Date:</div><div class="cell-val">${returnDate || 'N/A (One Way)'}</div></div>
              <div class="row"><div class="cell-label">Pickup Time:</div><div class="cell-val">${pickupTime}</div></div>
            </div>

            <div class="section-title">👤 Customer Contact Information</div>
            <div class="grid">
              <div class="row"><div class="cell-label">Customer Name:</div><div class="cell-val"><strong>${fullName}</strong></div></div>
              <div class="row"><div class="cell-label">Phone / WhatsApp:</div><div class="cell-val"><a href="tel:${phone}" style="color: #38bdf8;">${phone}</a></div></div>
              <div class="row"><div class="cell-label">Email Address:</div><div class="cell-val"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></div></div>
            </div>

            ${notes && notes !== 'N/A' ? `
            <div class="highlight-box">
              <strong style="color: #f59e0b;">Special Requests / Notes:</strong><br/>
              <span style="color: #cbd5e1; font-size: 14px;">${notes}</span>
            </div>` : ''}
          </div>
          <div class="footer">
            BharatWheels Outstation Car Rentals &bull; Automated Gmail Notification System
          </div>
        </div>
      </body>
      </html>
    `;

    // Customer Receipt HTML
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
          .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; color: #f59e0b; }
          .content { padding: 24px; }
          .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
          .footer { background: #f1f5f9; text-align: center; padding: 16px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Namaste, ${fullName}! 🙏</h1>
            <p style="margin: 4px 0 0 0; color: #94a3b8;">Your Car Rental Request Has Been Received</p>
          </div>
          <div class="content">
            <p>Thank you for choosing <strong>BharatWheels Car Rentals</strong>! We have received your booking inquiry (Ref: <strong>${bookingId}</strong>).</p>
            
            <p>Our outstation travel specialist is reviewing your route from <strong>${pickupCity}</strong> to <strong>${dropCity}</strong> (${calculatedDistance}) and will call/WhatsApp you shortly at <strong>${phone}</strong> with the exact transparent quote & driver assignment.</p>

            <div class="summary-card">
              <h4 style="margin: 0 0 10px 0; color: #d97706;">Trip Snapshot</h4>
              <p style="margin: 4px 0;">🚘 <strong>Vehicle:</strong> ${carType}</p>
              <p style="margin: 4px 0;">👥 <strong>Passengers:</strong> ${passengers}</p>
              <p style="margin: 4px 0;">📅 <strong>Pickup Date:</strong> ${pickupDate} (${pickupTime})</p>
              <p style="margin: 4px 0;">🛡️ <strong>Service Policy:</strong> 100% Sanitized, Verified Driver, Max 1500 km Route Limit</p>
            </div>

            <p style="font-size: 13px; color: #475569;">If you need urgent assistance or custom changes, call our 24/7 Helpline at <strong>+91 98765 43210</strong>.</p>
          </div>
          <div class="footer">
            BharatWheels Rentals &bull; Premium Outstation Travel Across India
          </div>
        </div>
      </body>
      </html>
    `;

    const transporter = createTransporter();

    if (!transporter) {
      console.log('\n======================================================');
      console.log('📬 [MOCK GMAIL NOTIFICATION LOGGED - DEV MODE]');
      console.log(`Booking ID: ${bookingId}`);
      console.log(`Customer: ${fullName} (${email}, ${phone})`);
      console.log(`Route: ${pickupCity} -> ${dropCity} (${calculatedDistance})`);
      console.log(`Vehicle: ${carType} (${passengers} passengers)`);
      console.log(`Dates: ${pickupDate} to ${returnDate || 'One Way'} at ${pickupTime}`);
      console.log('ℹ️ Mock mode active. To send real emails, generate an App Password in your Google Account.');
      console.log('======================================================\n');

      inquiryRecord.emailSent = false;
      inquiriesStore.push(inquiryRecord);

      return res.status(200).json({
        success: true,
        mode: 'mock',
        emailSent: false,
        bookingId,
        message: 'Inquiry received and recorded successfully!'
      });
    }

    const receiver = process.env.NOTIFICATION_RECEIVER || process.env.GMAIL_USER;

    // Attempt live email transmission with safe fallback
    try {
      // Send Mail to Agency Admin
      await transporter.sendMail({
        from: `"BharatWheels Inquiry System" <${process.env.GMAIL_USER}>`,
        to: receiver,
        subject: `🚘 [NEW BOOKING ${bookingId}] ${pickupCity} to ${dropCity} (${carType})`,
        html: adminHtml
      });

      // Send Mail Confirmation to Customer
      await transporter.sendMail({
        from: `"BharatWheels Rentals" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Booking Request Received [${bookingId}] - BharatWheels Car Rentals`,
        html: customerHtml
      });

      inquiryRecord.emailSent = true;
      inquiriesStore.push(inquiryRecord);

      console.log(`\n✅ [GMAIL SENT] Booking Ref ${bookingId} dispatched successfully to ${receiver} and ${email}\n`);

      return res.status(200).json({
        success: true,
        mode: 'live',
        emailSent: true,
        bookingId,
        message: 'Booking inquiry submitted! Confirmation email sent via Gmail.'
      });

    } catch (mailError) {
      console.error('\n⚠️ [GMAIL DISPATCH NOTICE]:', mailError.message);
      if (mailError.code === 'EAUTH') {
        console.error('👉 Cause: Google rejected the Gmail App Password.');
        console.error('👉 Solution: Generate a 16-character App Password at: https://myaccount.google.com/apppasswords');
      }
      console.log(`📦 Booking Ref ${bookingId} for ${fullName} (${phone}) has been securely logged on the server.\n`);

      inquiryRecord.emailSent = false;
      inquiryRecord.emailError = mailError.message;
      inquiriesStore.push(inquiryRecord);

      // Return 200 OK so customer is NOT blocked and gets their reference ID
      return res.status(200).json({
        success: true,
        mode: 'logged_fallback',
        emailSent: false,
        emailError: mailError.message,
        bookingId,
        message: 'Booking inquiry received and confirmed! Ref: ' + bookingId
      });
    }

  } catch (error) {
    console.error('Error handling booking inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing booking inquiry.',
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
        <title>404 Not Found &bull; BharatWheels API</title>
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
  console.log(`🚀 BharatWheels Express Server running on http://localhost:${PORT}`);
  console.log(`🌐 Frontend Web App URL: ${FRONTEND_URL}`);
  console.log(`📧 Gmail Status: ${process.env.GMAIL_USER && !process.env.GMAIL_APP_PASSWORD?.includes('your_16') ? 'CONFIGURED ✅' : 'DEV MOCK MODE ℹ️'}`);
  console.log(`======================================================\n`);
});
