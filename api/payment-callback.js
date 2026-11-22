// /api/payment-callback.js
// Вебхук OxaPay. Данным из тела запроса не доверяем:
// статус оплаты перепроверяется запросом к OxaPay по trackId.
// Все ключи — только из переменных окружения Vercel.

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

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

const PAID_STATUSES = ['paid', 'confirming', 'complete', 'sending'];

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || '528289836'; // Telegram ID Руслана — не секрет, не меняется
  if (!token || !chatId) {
    console.error('Telegram env vars are not set');
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (e) {
    console.error('Telegram send error:', e);
  }
}

export default async function handler(req, res) {
  // GET — проверка, что эндпоинт жив
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: 'Callback endpoint is alive', time: new Date().toISOString() });
  }

  try {
    const body = req.body || {};
    console.log('=== OXAPAY WEBHOOK ===', JSON.stringify(body));

    const trackId = body.trackId || body.TrackId || body.track_id;
    if (!trackId) {
      console.warn('Webhook without trackId');
      return res.status(200).send('ok');
    }

    // Перепроверяем статус напрямую в OxaPay
    let verified = null;
    const merchant = process.env.OXAPAY_MERCHANT_KEY;
    if (merchant) {
      try {
        const r = await fetch('https://api.oxapay.com/merchants/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ merchant, trackId }),
        });
        verified = await r.json();
        console.log('Inquiry:', JSON.stringify(verified));
      } catch (e) {
        console.error('Inquiry error:', e);
      }
    } else {
      console.error('OXAPAY_MERCHANT_KEY is not set');
    }

    const status = (verified && (verified.status || verified.Status)) || 'unverified';
    const amount = (verified && (verified.amount || verified.Amount)) || '—';
    const currency = (verified && (verified.currency || verified.Currency)) || '';
    const orderId = (verified && verified.orderId) || body.orderId || '—';
    const email = (verified && verified.email) || body.email || '—';
    const isPaid = PAID_STATUSES.includes(String(status).toLowerCase());

    // Пишем лог вебхука отдельно от заказов
    await db.collection('payment_events').add({
      trackId: String(trackId),
      webhookBody: body,
      verifiedStatus: status,
      verifiedRaw: verified || null,
      receivedAt: new Date().toISOString(),
      created_at: FieldValue.serverTimestamp(),
    });

    // Заказ создаём только если OxaPay подтвердил оплату и такого trackId ещё нет
    if (isPaid) {
      const existing = await db.collection('orders').where('trackId', '==', String(trackId)).get();
      if (existing.empty) {
        await db.collection('orders').add({
          trackId: String(trackId),
          orderId,
          status,
          amount: parseFloat(amount) || 0,
          currency,
          email,
          paidAt: new Date().toISOString(),
          created_at: FieldValue.serverTimestamp(),
          source: 'oxapay-webhook',
          oxapayRaw: verified,
        });
        await sendTelegram(
          `💳 ОПЛАТА ПОЛУЧЕНА (вебхук)!\n\n🆔 Заказ: ${orderId}\n🔗 Track: ${trackId}\n💰 Сумма: $${amount} ${currency}\n📊 Статус: ${status}\n📧 Клиент: ${email}`
        );
      }
    }

    return res.status(200).send('ok');
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).send('ok');
  }
}
