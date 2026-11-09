// /api/notify.js
// Уведомление в Telegram о заявке на бесплатный образец.
// Раньше токен бота лежал прямо в services.html — теперь он только на сервере.

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('Telegram env vars are not set');
  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!r.ok) throw new Error('Telegram HTTP ' + r.status);
}

const clip = (v, n = 300) => String(v ?? '—').slice(0, n);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const b = req.body || {};
    if (b.type !== 'sample') return res.status(400).json({ ok: false, error: 'Unknown type' });

    const email = clip(b.email, 120);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' });
    }

    const msg =
      '🎁 FREE SAMPLE\n' +
      '📧 ' + email + '\n' +
      '📐 ' + clip(b.size, 40) + '\n' +
      '📝 ' + clip(b.object, 500) + '\n' +
      '🌿 ' + clip(b.background, 200) + '\n' +
      '💡 ' + clip(b.lighting, 200);

    await sendTelegram(msg);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('notify error:', e);
    return res.status(500).json({ ok: false, error: 'Notify failed' });
  }
}
