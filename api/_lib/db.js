import { neon } from '@neondatabase/serverless';

let sql = null;

function getClient() {
  if (!process.env.DATABASE_URL) return null;
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}

// Saves one enquiry row. Safe to call even if DATABASE_URL isn't set yet —
// it just skips saving so the site keeps working on email alone.
export async function saveEnquiry({ bookingId, fullName, email, phone, carType, place, message, emailSent }) {
  const client = getClient();
  if (!client) {
    return { saved: false, reason: 'DATABASE_URL not configured' };
  }

  try {
    await client`
      INSERT INTO enquiries (booking_id, full_name, email, phone, car_type, place, message, email_sent)
      VALUES (${bookingId}, ${fullName}, ${email}, ${phone}, ${carType || null}, ${place || null}, ${message || null}, ${Boolean(emailSent)})
    `;
    return { saved: true };
  } catch (err) {
    console.error('[DB] Failed to save enquiry:', err.message);
    return { saved: false, reason: err.message };
  }
}
