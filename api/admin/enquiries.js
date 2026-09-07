import { verifySessionToken } from '../_lib/auth.js';
import { listEnquiries } from '../_lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!verifySessionToken(token)) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  const { rows, reason } = await listEnquiries();
  return res.status(200).json({ success: true, enquiries: rows, notice: reason || null });
}
