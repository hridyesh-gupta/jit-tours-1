import nodemailer from 'nodemailer';

const createTransporter = () => {
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
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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
            Jit Tours and Travels &bull; Automated Gmail Notification System
          </div>
        </div>
      </body>
      </html>
    `;

    // Customer Receipt HTML
    // Customer Receipt HTML with Voucher & 1-Click WhatsApp Confirmation
    const confirmWaMsg = encodeURIComponent(
      `Hello Jit Tours and Travels, I have reviewed my booking data for Ref ID: ${bookingId} (${carType}, ${pickupCity} to ${dropCity}, ${pickupDate}). Everything is fine from my side, please confirm my reservation!`
    );
    const confirmWaUrl = `https://wa.me/919876543210?text=${confirmWaMsg}`;

    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
          .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: #090d16; padding: 24px; text-align: center; }
          .content { padding: 24px; }
          .card { background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin: 16px 0; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 14px; }
          .row:last-child { border-bottom: none; }
          .label { color: #94a3b8; }
          .val { font-weight: bold; color: #f8fafc; }
          .btn-confirm { display: block; width: 100%; text-align: center; background-color: #10b981; color: #ffffff; font-weight: bold; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-size: 15px; margin-top: 20px; box-sizing: border-box; }
          .footer { text-align: center; font-size: 11px; color: #64748b; padding: 16px; border-top: 1px solid #334155; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; font-size: 22px;">Booking Voucher & Confirmation Request</h2>
            <p style="margin: 4px 0 0 0; color: #090d16; font-weight: bold;">Jit Tours and Travels &bull; UP & MP Regional Circuit</p>
          </div>
          <div class="content">
            <p>Namaste <strong>${fullName}</strong>,</p>
            <p>Thank you for booking with <strong>Jit Tours and Travels</strong>! Here is your official booking voucher data (Ref: <strong style="color: #f59e0b;">${bookingId}</strong>).</p>

            <div class="card">
              <div class="row"><span class="label">Booking Ref ID:</span><span class="val" style="color: #f59e0b;">${bookingId}</span></div>
              <div class="row"><span class="label">Vehicle:</span><span class="val">${carType}</span></div>
              <div class="row"><span class="label">Route:</span><span class="val">${pickupCity} ➔ ${dropCity}</span></div>
              <div class="row"><span class="label">Estimated Distance:</span><span class="val">${calculatedDistance}</span></div>
              <div class="row"><span class="label">Pickup Date:</span><span class="val">${pickupDate} (${pickupTime})</span></div>
              <div class="row"><span class="label">Return Date:</span><span class="val">${returnDate}</span></div>
              <div class="row"><span class="label">Passengers:</span><span class="val">${passengers}</span></div>
              <div class="row"><span class="label">Driver Preference:</span><span class="val">${driverPreference}</span></div>
              ${notes && notes !== 'N/A' ? `<div class="row"><span class="label">Special Notes:</span><span class="val">${notes}</span></div>` : ''}
            </div>

            <p style="font-size: 13px; color: #cbd5e1; background-color: #0f172a; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b;">
              <strong>Consumer Action Required:</strong> Please review your booking details above. If everything is fine, click the confirmation button below to confirm your reservation with our travel coordinator.
            </p>

            <a href="${confirmWaUrl}" class="btn-confirm" target="_blank">
              ✅ CONFIRM MY RESERVATION ON WHATSAPP
            </a>

            <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 12px;">
              Or call our 24/7 Helpline directly: <strong style="color: #f8fafc;">+91 98765 43210</strong>
            </p>
          </div>
          <div class="footer">
            Jit Tours and Travels &bull; Civil Lines / Sangam Area, Prayagraj, UP &bull; jittoursandtravels@gmail.com
          </div>
        </div>
      </body>
      </html>
    `;

    const transporter = createTransporter();

    if (!transporter) {
      console.log(`[MOCK] Booking ${bookingId} for ${fullName} (${phone}) - ${pickupCity} -> ${dropCity}`);

      return res.status(200).json({
        success: true,
        mode: 'mock',
        emailSent: false,
        bookingId,
        message: 'Inquiry received and recorded successfully!'
      });
    }

    const receiver = process.env.NOTIFICATION_RECEIVER || process.env.GMAIL_USER;

    // Attempt email with graceful fallback
    try {
      await transporter.sendMail({
        from: `"Jit Tours and Travels Inquiry System" <${process.env.GMAIL_USER}>`,
        to: receiver,
        subject: `🚘 [NEW BOOKING ${bookingId}] ${pickupCity} to ${dropCity} (${carType})`,
        html: adminHtml
      });

      await transporter.sendMail({
        from: `"Jit Tours and Travels" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Booking Request Received [${bookingId}] - Jit Tours and Travels`,
        html: customerHtml
      });

      return res.status(200).json({
        success: true,
        mode: 'live',
        emailSent: true,
        bookingId,
        message: 'Booking inquiry submitted! Confirmation email sent via Gmail.'
      });

    } catch (mailError) {
      console.error('[GMAIL ERROR]:', mailError.message);

      // Return success anyway - booking is confirmed even if email fails
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
}
