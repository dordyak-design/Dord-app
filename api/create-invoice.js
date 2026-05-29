// api/create-invoice.js
// Vercel Serverless Function — создаёт инвойс OxaPay

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { amount, currency = 'USD', orderId, description, email } = req.body;
  if (!amount || !orderId) return res.status(400).json({ error: 'amount and orderId are required' });

  const merchantApiKey = process.env.OXAPAY_API_KEY;
  if (!merchantApiKey) return res.status(500).json({ error: 'OXAPAY_API_KEY not configured' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dordai.art';

  try {
    const payload = {
      merchant:       merchantApiKey,
      amount:         Number(amount),
      currency,
      lifeTime:       60,
      feePaidByPayer: 0,
      underPaidCover: 0.5,
      callbackUrl:    `${siteUrl}/api/payment-callback`,
      returnUrl:      `${siteUrl}/payment-success?orderId=${orderId}`,
      description:    description || `DordAI Order #${orderId}`,
      orderId:        String(orderId),
      email:          email || '',
    };

    const response = await fetch('https://api.oxapay.com/merchants/request', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.result !== 100) {
      console.error('OxaPay error:', data);
      return res.status(400).json({ error: data.message || 'OxaPay error', code: data.result });
    }

    return res.status(200).json({ success: true, payLink: data.payLink, trackId: data.trackId, orderId });

  } catch (err) {
    console.error('create-invoice:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
