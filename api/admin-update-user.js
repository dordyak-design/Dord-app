// /api/admin-update-user.js
// Смена пароля юзера через Firebase Admin SDK
// Доступ только для admin UID

const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const { adminUid, targetUid, password } = req.body;
    if (!adminUid || !targetUid || !password) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // Verify admin
    const adminUser = await admin.auth().getUser(adminUid);
    if (adminUser.email !== 'dordyak@gmail.com') {
      return res.status(403).json({ ok: false, error: 'Access denied' });
    }

    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: 'Password must be at least 6 characters' });
    }

    // Update password
    await admin.auth().updateUser(targetUid, { password });

    return res.status(200).json({ ok: true, message: 'Password updated' });
  } catch (err) {
    console.error('admin-update-user error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};
