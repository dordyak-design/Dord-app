export default async function handler(req, res) {
  // GET — проверка что эндпоинт жив
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'Callback endpoint is alive', time: new Date().toISOString() });
  }

  // Принимаем ВСЁ — POST, PUT, PATCH — чтобы не пропустить webhook
  try {
    // Логируем сырое тело — узнаем формат OxaPay
    const rawBody = JSON.stringify(req.body);
    const headers = JSON.stringify(req.headers);
    
    console.log('=== OXAPAY WEBHOOK ===');
    console.log('Method:', req.method);
    console.log('Headers:', headers);
    console.log('Body:', rawBody);

    // OxaPay может слать поля как: status, amount, orderId, trackId, currency, type
    // Или вложенно. Берём всё что есть
    const body = req.body || {};
    
    const msg = `💳 WEBHOOK ПОЛУЧЕН!\n\n📦 Method: ${req.method}\n📊 Body:\n${rawBody.substring(0, 3000)}`;

    await fetch('https://api.telegram.org/bot8742382444:AAE3oWQxDlWF9XH8PHTOPLR93rMK3DVcf6s/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '528289836', text: msg })
    });

    // OxaPay требует ответ 200 чтобы не повторять
    return res.status(200).send('ok');
  } catch (error) {
    console.error('Webhook error:', error);
    // Даже при ошибке — 200, чтобы OxaPay не ретраил бесконечно
    return res.status(200).send('ok');
  }
}
