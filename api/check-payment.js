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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { trackId, orderId, cart, email, orderDetails, uid } = req.body;
    if (!trackId) return res.status(400).json({ error: 'trackId is required' });

    const oxaRes = await fetch('https://api.oxapay.com/merchants/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant: process.env.OXAPAY_API_KEY || 'LDKWVP-PPHZJE-WQASHD-POZGUU',
        trackId: trackId,
      }),
    });
    const oxaData = await oxaRes.json();
    console.log('OxaPay inquiry response:', JSON.stringify(oxaData));

    const payStatus = oxaData.status || oxaData.Status || 'unknown';
    const amount = oxaData.amount || oxaData.Amount || '0';
    const currency = oxaData.currency || oxaData.Currency || '';

    if (['Paid', 'paid', 'Confirming', 'confirming', 'Complete', 'complete', 'Sending', 'sending'].includes(payStatus)) {
      const existing = await db.collection('orders').where('trackId', '==', trackId).get();

      if (existing.empty) {
        const paidAmount = parseFloat(amount);

        const orderData = {
          trackId,
          orderId: orderId || oxaData.orderId || '',
          uid: uid || '',
          status: payStatus,
          amount: paidAmount,
          currency,
          email: email || oxaData.email || '',
          cart: cart || [],
          orderDetails: orderDetails || {},
          paidAt: new Date().toISOString(),
          created_at: FieldValue.serverTimestamp(),
          source: 'check-payment',
          oxapayRaw: oxaData,
        };
        await db.collection('orders').add(orderData);
        console.log('Order saved to Firestore:', trackId);

        // Loyalty points для покупателя
        if (uid) {
          const loyaltyPts = Math.floor(paidAmount);
          await db.collection('users').doc(uid).set({
            loyalty_points: FieldValue.increment(loyaltyPts),
            total_spent: FieldValue.increment(paidAmount),
            orders_count: FieldValue.increment(1),
            last_order: FieldValue.serverTimestamp(),
          }, { merge: true });

          // Referral 5% бонус рефереру
          try {
            const buyerSnap = await db.collection('users').doc(uid).get();
            const buyerData = buyerSnap.exists ? buyerSnap.data() : {};
            if (buyerData.referred_by) {
              const refQuery = await db.collection('users').where('ref_code', '==', buyerData.referred_by).limit(1).get();
              if (!refQuery.empty) {
                const referrerDoc = refQuery.docs[0];
                const refBonus = Math.floor(paidAmount * 0.05);
                if (refBonus > 0) {
                  await db.collection('users').doc(referrerDoc.id).set({
                    loyalty_points: FieldValue.increment(refBonus),
                    referral_earnings: FieldValue.increment(refBonus),
                  }, { merge: true });
                  console.log(`Referral bonus: ${refBonus} pts to ${referrerDoc.id}`);
                }
              }
            }
          } catch (refErr) {
            console.error('Referral bonus error:', refErr);
          }
        }

        // Telegram уведомление
        const cartText = (cart || []).map(i => `  • ${i.name}: ${i.detail} — $${i.price}`).join('\n');
        const msg = `💳 ОПЛАТА ПОДТВЕРЖДЕНА!\n\n🆔 Заказ: ${orderId || '—'}\n🔗 Track: ${trackId}\n💰 Сумма: $${amount} ${currency}\n📊 Статус: ${payStatus}\n📧 Клиент: ${email || '—'}\n\n🛒 Корзина:\n${cartText || '—'}`;
        await fetch('https://api.telegram.org/bot8742382444:AAE3oWQxDlWF9XH8PHTOPLR93rMK3DVcf6s/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: '528289836', text: msg }),
        });
      }

      return res.status(200).json({ ok: true, status: payStatus, amount, currency });
    }

    return res.status(200).json({ ok: false, status: payStatus, message: 'Payment not confirmed yet' });
  } catch (error) {
    console.error('Check payment error:', error);
    return res.status(500).json({ error: error.message });
  }
}
