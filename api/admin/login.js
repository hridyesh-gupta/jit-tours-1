import { isAdminConfigured, verifyCredentials, createSessionToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!isAdminConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'Admin login is not set up yet. Add ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET to your environment variables.'
    });
  }

  const { username, password } = req.body || {};

  if (!verifyCredentials(username, password)) {
    return res.status(401).json({ success: false, message: 'Incorrect username or password.' });
  }

  const token = createSessionToken(username);
  return res.status(200).json({ success: true, token });
}
