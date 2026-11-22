// /api/tg-leads-bot.js
// «Начинка» для @Dordsoftbot (бот для страницы AI-ботов dordai.pro).
// Клиент пишет боту → сообщение пересылается Руслану с меткой клиента.
// Руслан отвечает РЕПЛАЕМ на это сообщение → бот отправляет ответ клиенту.
// Приветствие — только на /start (не после каждого сообщения).
//
// Токен: переменная Vercel TELEGRAM_LEADS_BOT_TOKEN.
// Включение (один раз): открыть в браузере https://www.dordai.art/api/tg-leads-bot?setup=1

import crypto from 'crypto';

const OWNER = String(process.env.TELEGRAM_CHAT_ID || '528289836');
const TOKEN = () => process.env.TELEGRAM_LEADS_BOT_TOKEN;
// Секрет вебхука выводится из токена — отдельная переменная не нужна
const secret = () => crypto.createHash('sha256').update('wh:' + TOKEN()).digest('hex').slice(0, 48);

async function tg(method, payload) {
  const r = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return r.json();
}

const WELCOME = {
  ru: 'Здравствуйте! 👋 Это Dord AI Studio — делаем AI-ботов для бизнеса в Израиле.\n\n' +
      'Напишите, пожалуйста:\n• чем занимается ваш бизнес;\n• что хотите автоматизировать (заявки, запись, напоминания…);\n• как с вами удобнее связаться.\n\n' +
      'Мы ответим здесь же, обычно в течение рабочего дня.',
  he: 'שלום! 👋 כאן Dord AI Studio — בוטים חכמים לעסקים בישראל.\n\n' +
      'כתבו לנו בבקשה:\n• במה העסק שלכם עוסק;\n• מה הייתם רוצים להפוך לאוטומטי (פניות, תורים, תזכורות…);\n• איך הכי נוח ליצור איתכם קשר.\n\n' +
      'נענה כאן, בדרך כלל תוך יום עסקים.',
};

export default async function handler(req, res) {
  if (!TOKEN()) return res.status(500).json({ ok: false, error: 'TELEGRAM_LEADS_BOT_TOKEN is not set' });

  // Разовая настройка вебхука
  if (req.method === 'GET') {
    if (req.query.setup !== '1') return res.status(200).send('Dordsoftbot webhook endpoint');
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `https://${host}/api/tg-leads-bot`;
    const r = await tg('setWebhook', { url, secret_token: secret(), allowed_updates: ['message'], drop_pending_updates: true });
    await tg('setMyCommands', { commands: [{ command: 'start', description: 'Начать / התחלה' }] });
    return res.status(200).json({ webhook: url, telegram: r });
  }

  if (req.method !== 'POST') return res.status(405).end();
  if (req.headers['x-telegram-bot-api-secret-token'] !== secret()) return res.status(401).end();

  try {
    const m = (req.body || {}).message;
    if (!m || !m.chat || m.chat.type !== 'private') return res.status(200).json({ ok: true });
    const from = String(m.chat.id);

    // Руслан отвечает реплаем на пересланное сообщение → ответ уходит клиенту
    if (from === OWNER) {
      const ref = m.reply_to_message && (m.reply_to_message.text || m.reply_to_message.caption || '');
      const hit = ref && ref.match(/#id(\d+)/);
      if (!hit) {
        await tg('sendMessage', { chat_id: OWNER, text: 'ℹ️ Чтобы ответить клиенту, сделай «Ответить» (reply) на его сообщение с меткой #id.' });
      } else {
        const r = await tg('copyMessage', { chat_id: hit[1], from_chat_id: OWNER, message_id: m.message_id });
        await tg('sendMessage', { chat_id: OWNER, text: r.ok ? '✅ Отправлено клиенту' : '⚠️ Не доставлено: ' + (r.description || 'ошибка'), reply_to_message_id: m.message_id });
      }
      return res.status(200).json({ ok: true });
    }

    // Сообщение от клиента
    const u = m.from || {};
    const name = [u.first_name, u.last_name].filter(Boolean).join(' ') || 'Без имени';
    const lang = (u.language_code || '').startsWith('he') ? 'he' : 'ru';
    const head = `🤖 Dordsoftbot · ${name}${u.username ? ' @' + u.username : ''} · #id${from}`;

    if ((m.text || '').startsWith('/start')) {
      await tg('sendMessage', { chat_id: from, text: WELCOME[lang] });
      await tg('sendMessage', { chat_id: OWNER, text: `${head}\n🟢 Открыл бота (/start)` });
      return res.status(200).json({ ok: true });
    }

    if (m.text) {
      await tg('sendMessage', { chat_id: OWNER, text: `${head}\n\n${m.text}` });
    } else {
      // фото, голосовые, файлы: копируем как есть, метку кладём отдельным сообщением
      const note = await tg('sendMessage', { chat_id: OWNER, text: `${head}\n📎 вложение ниже` });
      await tg('copyMessage', { chat_id: OWNER, from_chat_id: from, message_id: m.message_id,
        reply_to_message_id: note.result && note.result.message_id });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('tg-leads-bot error:', e);
    return res.status(200).json({ ok: false }); // 200, чтобы Telegram не повторял апдейт бесконечно
  }
}
