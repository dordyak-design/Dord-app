import { Resend } from 'resend';
import admin from 'firebase-admin';
import axios from 'axios';

const resend = new Resend('re_...');  // Нужно добавить API ключ Resend

const firebaseConfig = {
  apiKey: "AIzaSyCfot_WKYkikmKHrqet2nXnPasQB1ln61g",
  authDomain: "dord-ai-studio.firebaseapp.com",
  projectId: "dord-ai-studio",
  storageBucket: "dord-ai-studio.firebasestorage.app",
  messagingSenderId: "759031422125",
  appId: "1:759031422125:web:22367b8059ce661f51fa24"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    ...firebaseConfig
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, amount, status, currency, email, walletHash } = req.body;

    console.log('OxaPay Webhook received:', { orderId, amount, status, currency, email });

    // Проверяем статус платежа
    if (status !== 'success' && status !== 'completed') {
      return res.status(200).json({ ok: true, message: 'Payment not completed' });
    }

    if (!orderId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Сохраняем в Firebase
    const db = admin.firestore();
    const orderRef = await db.collection('orders').add({
      orderId,
      amount: parseFloat(amount),
      currency,
      clientEmail: email,
      walletHash,
      status: 'paid',
      paymentMethod: 'oxapay',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('Order saved to Firebase:', orderRef.id);

    // Отправляем чек на email
    if (email) {
      try {
        const now = new Date();
        const dateStr = now.toLocaleDateString('ru-RU');
        const timeStr = now.toLocaleTimeString('ru-RU');
        const amountFormatted = parseFloat(amount).toFixed(2);

        await resend.emails.send({
          from: 'noreply@dordai.art',
          to: email,
          subject: `✅ Чек заказа #${orderId} — Dord AI Studio`,
          html: `
            <html>
              <body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px;">
                  <h2 style="color: #004aad;">🎁 Dord AI Studio</h2>
                  <h3 style="color: #8892a4;">Чек заказа</h3>
                  
                  <div style="background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <p><strong>Номер заказа:</strong> ${orderId}</p>
                    <p><strong>Дата:</strong> ${dateStr}</p>
                    <p><strong>Время:</strong> ${timeStr}</p>
                    <p><strong>Статус:</strong> <span style="color: #00c896;">✅ ОПЛАЧЕНО</span></p>
                    <h3 style="color: #004aad; margin-top: 20px;">Итого: $${amountFormatted} ${currency}</h3>
                  </div>

                  <div style="background: #f0f9ff; border-left: 4px solid #00c896; padding: 15px; margin: 20px 0; border-radius: 4px;">
                    <p style="color: #004aad; margin: 0;"><strong>✨ Спасибо за ваш заказ!</strong></p>
                    <p style="color: #8892a4; margin: 8px 0 0;">Результаты будут готовы в течение <strong>48 часов</strong>.</p>
                  </div>

                  <p style="color: #8892a4; font-size: 12px; text-align: center; margin-top: 30px;">
                    © 2026 Dord AI Studio — Luxury AI Product Photography<br>
                    Israel, Tel Aviv, Electra Tower
                  </p>
                </div>
              </body>
            </html>
          `,
        });

        console.log('✅ Receipt email sent to:', email);
      } catch (emailError) {
        console.error('❌ Email send error:', emailError);
      }
    }

    // Отправляем уведомление в Telegram
    const telegramMsg = `✅ ОПЛАТА ПОЛУЧЕНА — Dord AI Studio

🆔 Заказ: ${orderId}
💰 Сумма: $${parseFloat(amount).toFixed(2)} ${currency}
📧 Клиент: ${email || 'не указан'}

📝 Статус: ОПЛАЧЕНО ✅
⏰ ${new Date().toLocaleString('ru-RU')}

✉️ Чек отправлен клиенту на email
📊 Заказ в Firebase готов к обработке`;

    try {
      await axios.post('https://api.telegram.org/bot8742382444:AAE3oWQxDlWF9XH8PHTOPLR93rMK3DVcf6s/sendMessage', {
        chat_id: '528289836',
        text: telegramMsg,
      });
      console.log('✅ Telegram notification sent');
    } catch (tgError) {
      console.error('❌ Telegram error:', tgError);
    }

    return res.status(200).json({
      ok: true,
      message: 'Payment processed successfully',
      orderId,
      firebaseDocId: orderRef.id
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
