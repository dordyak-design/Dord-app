import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Инициализация Firebase Admin (один раз)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  // GET — проверка что эндпоинт жив
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'Callback endpoint is alive', time: new Date().toISOString() });
  }

  try {
    const body = req.body || {};
    const rawBody = JSON.stringify(body);

    console.log('=== OXAPAY WEBHOOK ===');
    console.log('Method:', req.method);
    console.log('Body:', rawBody);

    // Сохраняем в Firestore
    const orderData = {
      ...body,
      receivedAt: new Date().toISOString(),
      source: 'oxapay-webhook',
    };

    await db.collection('orders').add(orderData);
    console.log('Saved to Firestore');

    // Telegram уведомление
    const status = body.status || body.Status || '—';
    const amount = body.amount || body.Amount || '—';
    const orderId = body.orderId || body.OrderId || body.trackId || '—';
    const currency = body.currency || body.Currency || '';
    const email = body.email || body.Email || '—';

    const msg = `💳 ОПЛАТА ПОЛУЧЕНА!\n\n🆔 Заказ: ${orderId}\n💰 Сумма: $${amount} ${currency}\n📊 Статус: ${status}\n📧 Клиент: ${email}\n\n📦 Данные:\n${rawBody.substring(0, 2000)}`;

    await fetch('https://api.telegram.org/bot8742382444:AAE3oWQxDlWF9XH8PHTOPLR93rMK3DVcf6s/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '528289836', text: msg }),
    });

    return res.status(200).send('ok');
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).send('ok');
  }
}
