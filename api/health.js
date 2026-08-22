export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'ok',
    service: 'Jit Tours and Travels Booking Backend',
    platform: 'Vercel Serverless',
    timestamp: new Date().toISOString(),
    gmailConfigured: Boolean(
      process.env.GMAIL_USER &&
      process.env.GMAIL_APP_PASSWORD &&
      !process.env.GMAIL_APP_PASSWORD.includes('your_16_digit')
    ),
    sender: process.env.GMAIL_USER || null
  });
}
