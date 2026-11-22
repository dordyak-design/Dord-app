// /api/create-invoice.js
// Создаёт счёт в OxaPay. Ключ мерчанта — только из переменных окружения Vercel.

const SITE_URL = 'https://www.dordai.art';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const merchant = (process.env.OXAPAY_MERCHANT_KEY || process.env.OXAPAY_API_KEY);
  if (!merchant) {
    console.error('OXAPAY_MERCHANT_KEY is not set');
    return res.status(500).json({ error: 'Payment config missing' });
  }

  try {
    const { amount, orderId, description, email } = req.body || {};
    const sum = parseFloat(amount);
    if (!sum || sum <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const payload = {
      merchant,
      amount: sum,
      currency: 'USD',
      lifeTime: 30,
      feePaidByPayer: 0,
      underPaidCover: 2.5,
      callbackUrl: `${SITE_URL}/api/payment-callback`,
      returnUrl: `${SITE_URL}/services.html?payment=success`,
      description: description || 'Dord AI Studio Order',
      orderId: orderId,
      email: email || ''
    };

    console.log('Creating invoice:', JSON.stringify({ ...payload, merchant: '***' }));

    const response = await fetch('https://api.oxapay.com/merchants/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('OxaPay response:', JSON.stringify(data));

    if (data.result === 100) {
      return res.status(200).json({
        ok: true,
        payLink: data.payLink,
        trackId: data.trackId
      });
    }

    return res.status(400).json({
      error: 'OxaPay error',
      message: data.message || 'Unknown error',
      result: data.result
    });
  } catch (error) {
    console.error('Create invoice error:', error);
    return res.status(500).json({ error: error.message });
  }
}
