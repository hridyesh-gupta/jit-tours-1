import {
  createTransporter,
  generateBookingId,
  buildOwnerAlertEmail,
  buildCustomerConfirmationEmail
} from './_lib/email.js';
import { saveEnquiry } from './_lib/db.js';

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

    const ownerHtml = buildOwnerAlertEmail({ bookingId, submissionTime, fullName, email, phone, carType, place, message });
    const customerHtml = buildCustomerConfirmationEmail({ bookingId, fullName, carType, place });

    const transporter = createTransporter();

    let mode = 'mock';
    let emailSent = false;
    let emailError = null;

    if (!transporter) {
      console.log(`[MOCK] Enquiry ${bookingId} from ${fullName} (${phone}, ${email}) - Car: ${carType || 'N/A'}, Place: ${place || 'N/A'}`);
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
        emailSent = true;
      } catch (mailError_) {
        console.error('[GMAIL ERROR]:', mailError_.message);
        mode = 'logged_fallback';
        emailError = mailError_.message;
      }
    }

    // Best-effort — an unconfigured or unreachable database never blocks
    // the customer from getting their confirmation.
    await saveEnquiry({ bookingId, fullName, email, phone, carType, place, message, emailSent });

    return res.status(200).json({
      success: true,
      mode,
      emailSent,
      emailError,
      bookingId,
      message: emailSent ? 'Enquiry submitted! Confirmation email sent.' : 'Enquiry received! Ref: ' + bookingId
    });

  } catch (error) {
    console.error('Error handling enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing enquiry.',
      error: error.message
    });
  }
}
