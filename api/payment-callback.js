export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, amount, status, currency, email } = req.body;

    if (status !== 'success' && status !== 'completed') {
      return res.status(200).json({ ok: true });
    }

    // Telegram уведомление
    const msg = `✅ ОПЛАТА ПОЛУЧЕНА\n\n🆔 Заказ: ${orderId}\n💰 Сумма: $${amount} ${currency}\n📧 Клиент: ${email || '—'}`;
    
    await fetch(`https://api.telegram.org/bot8742382444:AAE3oWQxDlWF9XH8PHTOPLR93rMK3DVcf6s/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '528289836', text: msg })
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
