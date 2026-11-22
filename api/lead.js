// /api/lead.js
// Заявка с лендинга AI-ботов (bots.html) → сообщение в Telegram владельцу.
// Токен и chat id берутся из переменных окружения Vercel: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('Telegram env vars are not set');
  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!r.ok) throw new Error('Telegram HTTP ' + r.status);
}

const clip = (v, n = 200) => String(v ?? '').trim().slice(0, n);

const BIZ = {
  dental: 'Стоматология / клиника',
  beauty: 'Салон красоты',
  shop: 'Магазин',
  legal: 'Адвокат / бухгалтер',
  auto: 'Автосервис',
  other: 'Другое',
};
const PACK = { start: 'Старт', business: 'Бизнес', pro: 'Про', unsure: 'Пока не знаю' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const b = req.body || {};
    if (b.type !== 'lead') return res.status(400).json({ ok: false, error: 'Unknown type' });
    if (clip(b.hp)) return res.status(200).json({ ok: true }); // скрытое поле: заполняют только спам-боты

    const name = clip(b.name, 80);
    const phone = clip(b.phone, 30);
    const email = clip(b.email, 120);
    if (!name) return res.status(400).json({ ok: false, error: 'Name required' });
    if (!phone && !email) return res.status(400).json({ ok: false, error: 'Phone or email required' });
    if (phone && !/^[+\d][\d\s\-()]{6,}$/.test(phone)) return res.status(400).json({ ok: false, error: 'Invalid phone' });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'Invalid email' });

    const when = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Jerusalem' });
    const msg = [
      '🤖 НОВАЯ ЗАЯВКА — AI-бот',
      '🏢 ' + (BIZ[b.biz] || 'Не указано') + (clip(b.bizName) ? ' · ' + clip(b.bizName, 120) : ''),
      '👤 ' + name,
      phone ? '📞 ' + phone : null,
      email ? '📧 ' + email : null,
      clip(b.city) ? '📍 ' + clip(b.city, 60) : null,
      '📦 Пакет: ' + (PACK[b.pack] || 'Не выбран'),
      clip(b.msg) ? '📝 ' + clip(b.msg, 1500) : null,
      '🌐 Язык страницы: ' + (b.lang === 'he' ? 'иврит' : 'русский'),
      '🕒 ' + when,
    ].filter(Boolean).join('\n');

    await sendTelegram(msg);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('lead error:', e);
    return res.status(500).json({ ok: false, error: 'Lead failed' });
  }
}
