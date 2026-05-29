// api/payment-callback.js
// Webhook от OxaPay — вызывается автоматически после оплаты
// Обновляет Firestore: заказ → paid, loyalty_points, total_spent

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore }                  from 'firebase-admin/firestore';

// Инициализация Firebase Admin (один раз)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  console.log('OxaPay callback:', JSON.stringify(data));

  // OxaPay присылает: status, orderId, trackId, amount, currency, txID
  const { status, orderId, trackId, amount } = data;

  // Принимаем только подтверждённые платежи
  if (status !== 'Paid' && status !== 'Confirming') {
    return res.status(200).json({ ok: true, skipped: true });
  }

  try {
    // 1. Ищем заказ в Firestore по orderId
    const ordersSnap = await db.collection('orders')
      .where('orderId', '==', String(orderId))
      .limit(1)
      .get();

    if (ordersSnap.empty) {
      console.warn('Order not found:', orderId);
      return res.status(200).json({ ok: true, warn: 'order not found' });
    }

    const orderDoc  = ordersSnap.docs[0];
    const orderData = orderDoc.data();
    const uid       = orderData.uid;
    const paidAmount = Number(amount) || 0;

    // 2. Обновляем заказ
    await orderDoc.ref.update({
      status:     'paid',
      trackId:    trackId || '',
      paid_at:    new Date(),
      paid_amount: paidAmount,
    });

    // 3. Обновляем пользователя: total_spent + loyalty_points
    if (uid && status === 'Paid') {
      const userRef  = db.collection('users').doc(uid);
      const userSnap = await userRef.get();
      const userData = userSnap.exists ? userSnap.data() : {};

      const newSpent  = (userData.total_spent  || 0) + paidAmount;
      const newPoints = (userData.loyalty_points || 0) + Math.floor(paidAmount);

      // Пересчитываем ранг
      const rank = calcRank(newPoints);

      await userRef.update({
        total_spent:      newSpent,
        loyalty_points:   newPoints,
        loyalty_rank:     rank.name,
        loyalty_discount: rank.discount,
      });

      // 4. Telegram уведомление
      const msg = `✅ PAYMENT CONFIRMED\n\n🆔 Order: ${orderId}\n💰 Amount: $${paidAmount}\n👤 UID: ${uid}\n🏆 Points: ${newPoints} (${rank.name})`;
      await fetch(`https://api.telegram.org/bot8742382444:AAE3oWQxDlWF9XH8PHTOPLR93rMK3DVcf6s/sendMessage`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ chat_id: '528289836', text: msg }),
      });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('payment-callback error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

// Лестница рангов (1$ = 1 балл)
function calcRank(points) {
  if (points >= 700) return { name: 'СЕО',      discount: 12 };
  if (points >= 500) return { name: 'Директор', discount: 10 };
  if (points >= 300) return { name: 'Менеджер', discount: 7  };
  if (points >= 100) return { name: 'Дизайнер', discount: 5  };
  return                     { name: 'Новичок', discount: 3  };
}
