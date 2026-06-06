// /api/admin-list-users.js
// Возвращает список всех юзеров из Firebase Auth
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
    const { adminUid } = req.body;
    if (!adminUid) return res.status(400).json({ ok: false, error: 'Missing adminUid' });

    // Verify admin
    const adminUser = await admin.auth().getUser(adminUid);
    if (adminUser.email !== 'dordyak@gmail.com') {
      return res.status(403).json({ ok: false, error: 'Access denied' });
    }

    // List all users (max 1000)
    const listResult = await admin.auth().listUsers(1000);
    const users = listResult.users.map(u => ({
      uid: u.uid,
      email: u.email || '',
      displayName: u.displayName || '',
      photoURL: u.photoURL || '',
      disabled: u.disabled,
      creationTime: u.metadata.creationTime,
      lastSignInTime: u.metadata.lastSignInTime,
      providerData: u.providerData.map(p => p.providerId),
    }));

    return res.status(200).json({ ok: true, users });
  } catch (err) {
    console.error('admin-list-users error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};
