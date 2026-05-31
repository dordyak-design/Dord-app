export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { amount, orderId, description, email } = req.body;

    const payload = {
      merchant: 'LDKWVP-PPHZJE-WQASHD-POZGUU',
      amount: parseFloat(amount),
      currency: 'USD',
      lifeTime: 30,
      feePaidByPayer: 0,
      underPaidCover: 2.5,
      callbackUrl: 'https://dordai.art/api/payment-callback',
      returnUrl: 'https://dordai.art/services.html?payment=success',
      description: description || 'Dord AI Studio Order',
      orderId: orderId,
      email: email || ''
    };

    console.log('Creating invoice:', JSON.stringify(payload));

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
    } else {
      return res.status(400).json({ 
        error: 'OxaPay error', 
        message: data.message || 'Unknown error',
        result: data.result
      });
    }
  } catch (error) {
    console.error('Create invoice error:', error);
    return res.status(500).json({ error: error.message });
  }
}
