/**
 * Dord AI Studio — i18n.js
 * Глобальная мультиязычность. Работает на ВСЕХ страницах.
 * EN по умолчанию. Сохраняется в localStorage.
 */

const DORD_I18N = {

    ru: {
        "nav.home":"Главная","nav.services":"Услуги","nav.brief":"ТЗ","nav.dashboard":"Кабинет","nav.gallery":"Галерея","nav.order":"Заказать",
        "footer.col1.title":"Партнёры","footer.col2.title":"Информация","footer.col3.title":"Документы",
        "footer.faq":"FAQ","footer.howto":"Как это работает","footer.contact":"Связаться с нами","footer.privacy":"Политика конфиденциальности","footer.terms":"Правила использования","footer.refund":"Политика возврата",
        "footer.promo.hint":"Промокоды можно найти в наших соцсетях и в ТГ на каналах партнёров (ссылки в подвале сайта)",
        "footer.address":"Израиль, Тель-Авив, ул. Игаль Алон 98, Electra Tower","footer.type":"Автоматизированный AI-продакшен","footer.copy":"© 2026 Все права защищены",
        "btn.order":"Заказать →","btn.details":"Подробнее и цены →","btn.guide":"Читать гайд по ТЗ","btn.allservices":"Смотреть все услуги",
        "disclaimer.title":"Важно перед оплатой","disclaimer.text":"Запуск генерации — прямая аренда GPU-часов. Если результат точно соответствует вашему ТЗ, но не совпадает с личными ожиданиями — возврат невозможен.",
        "refund.title":"Политика возврата","refund.text":"Запуск генерации — прямая аренда GPU-часов. Возврат невозможен если результат соответствует ТЗ.",
        "index.title":"Dord AI Studio — AI-фотостудия для бизнеса и Shopify",
        "hero.badge":"Серверы онлайн — 3 агента активны",
        "hero.title":"Визуал для вашего<br>бизнеса — за <span class=\"highlight\">часы,</span><br>не недели",
        "hero.sub":"AI-студия для Shopify-продавцов и малого бизнеса. Карточки товаров, рекламные ролики — без фотографов, без студий. Оплата в USDT.",
        "hero.cta1":"Все услуги и цены →","hero.cta2":"Как сделать заказ",
        "why.label":"Почему Dord AI Studio","why.title":"Фотосессия стоит $300+. Мы — от $74.99.",
        "why.sub":"Профессиональный студийный визуал без студии, фотографа и недельного ожидания.",
        "why.c1.title":"Точная физика материалов","why.c1.text":"Грани ювелирных изделий, блики стекла, текстура кожи, хромовые отражения — точно, каждый раз.",
        "why.c2.title":"Без утечек данных","why.c2.text":"Ваши фото никогда не попадут в датасеты. Приватные серверы. Не Midjourney. Не DALL-E.",
        "why.c3.title":"Под ключ","why.c3.text":"Пришлите фото или описание — мы сделаем люксовый визуал. Никакого софта.",
        "svc.label":"Тарифы","svc.title":"Три пакета. Без подписок.","svc.sub":"Каждый заказ обсуждается лично.",
        "svc1.title":"Starter","svc1.price":"/ 20 снимков","svc1.text":"20 студийных снимков товара.",
        "svc1.f1":"20 снимков · 512–1024px","svc1.f2":"Готово для Shopify и Amazon","svc1.f3":"Коммерческие права включены","svc1.f4":"Доставка в течение 48 часов",
        "svc2.title":"Growth (E-Com)","svc2.price":"/ 50 снимков","svc2.badge":"Самый популярный","svc2.text":"50 люксовых снимков товара.",
        "svc2.f1":"50 снимков · до 1024px","svc2.f2":"Amazon и Shopify форматы","svc2.f3":"Полные коммерческие права","svc2.f4":"Ручная проверка каждого снимка","svc2.f5":"Доставка в течение 48 часов",
        "svc3.title":"Scale (Business)","svc3.price":"/ 150 снимков","svc3.text":"150 снимков — полная визуальная айдентика.",
        "svc3.f1":"150 снимков · до 1024px","svc3.f2":"Уникальный визуальный стиль бренда","svc3.f3":"Lifestyle, студия и макро","svc3.f4":"Приватный сервер — данные только ваши","svc3.f5":"Доставка в течение 48 часов",
        "how.label":"Процесс","how.title":"Три шага до люкс-визуала",
        "how.s1.title":"Пришлите фото товара","how.s1.text":"Фото со смартфона на белом фоне — достаточно.",
        "how.s2.title":"Оплатите в USDT","how.s2.text":"TON или BNB Smart Chain. Автоматическая активация.",
        "how.s3.title":"Получите результат за 48ч","how.s3.text":"Люксовый визуал готов к загрузке на Shopify и Amazon.",
        "cta.title":"Пришлите фото товара.<br>Получите люкс-визуал. Бесплатно.","cta.sub":"Отправьте нам фото вашего продукта — даже со смартфона на белом фоне. Мы вернём 1–2 премиальных рендера бесплатно.",
        "promo.hint":"Промокоды можно найти в наших соцсетях и в ТГ на каналах партнёров (ссылки в подвале сайта)",
        "promo.apply":"Применить","promo.placeholder":"Введите промокод","promo.success":"Промокод применён! Скидка:","promo.error":"Промокод недействителен или истёк","promo.label":"Промокод",
        "gallery.title":"Галерея работ — Dord AI Studio",
        "gallery.bc":"Галерея",
        "dash.login.subtitle":"AI Фото и Видео Студия · Тель-Авив",
        "dash.login.signin":"Войти","dash.login.register":"Регистрация",
        "dash.login.email":"Email","dash.login.password":"Пароль","dash.login.confirm":"Подтвердите пароль",
        "dash.login.signin.btn":"Войти →","dash.login.forgot":"Забыли пароль?","dash.login.or":"или",
        "dash.login.create":"Создать аккаунт →",
        "dash.login.reset.desc":"Введите email и мы отправим ссылку для сброса пароля.",
        "dash.login.reset.btn":"Отправить ссылку →","dash.login.back":"← Назад ко входу","dash.login.main":"← На главную",
        "dash.logout":"Выйти",
        "dash.neworder":"Новый заказ",
        "dash.stat.images":"Изображений в пакете","dash.stat.purchased":"куплено всего",
        "dash.stat.completed":"Выполнено","dash.stat.remaining":"осталось",
        "dash.stat.spent":"Потрачено","dash.stat.alltime":"за всё время",
        "dash.loyalty.title":"🏆 Программа лояльности",
        "dash.loyalty.discount.label":"Ваша персональная скидка на все заказы",
        "dash.loyalty.hint":"1 потраченный $ = 1 балл лояльности",
        "dash.loyalty.next":"до следующего ранга",
        "dash.loyalty.max":"🏆 Максимальный ранг достигнут!",
        "dash.loyalty.max.hint":"Вы достигли высшего ранга. Скидка: 12%",
        "dash.loyalty.pts":"баллов","dash.loyalty.pts.to":"балл(ов) до",
        "dash.orders.title":"📋 История заказов","dash.orders.new":"+ Новый заказ",
        "dash.orders.th.num":"#","dash.orders.th.type":"Тип","dash.orders.th.pack":"Пакет",
        "dash.orders.th.amount":"Сумма","dash.orders.th.date":"Дата","dash.orders.th.status":"Статус",
        "dash.orders.empty":"Заказов пока нет.","dash.orders.empty.cta":"Сделайте первый заказ →",
        "dash.profile.member":"Участник с","dash.profile.uid":"ID аккаунта",
        "dash.rank.newcomer":"Новичок","dash.rank.designer":"Дизайнер","dash.rank.manager":"Менеджер","dash.rank.director":"Директор","dash.rank.ceo":"CEO",
        "dash.referral.title":"🔗 Реферальная программа",
        "dash.referral.desc":"Поделитесь ссылкой с друзьями. Вы получаете 5% от каждого их заказа в виде баллов лояльности. Оба получают 10 бонусных баллов при регистрации.",
        "dash.referral.copy":"Копировать","dash.referral.earned":"баллов от рефералов","dash.referral.friends":"друзей присоединилось",
        "svc.cfg.title":"Соберите заказ","svc.cfg.sub":"Выберите что вам нужно. Каждый заказ обсуждается лично.",
        "svc.cfg.free.title":"🎁 Бесплатный пример — попробуйте до покупки","svc.cfg.free.text":"Отправьте нам фото товара — даже со смартфона. Мы вернём 1–2 рендера бесплатно.",
        "svc.cfg.free.btn":"Получить бесплатный пример →",
        "svc.cfg.img.title":"📸 Пакеты изображений","svc.cfg.img.sub":"Выберите разрешение, затем объём. Все пакеты включают коммерческие права и ручную проверку.",
        "svc.cfg.res":"Шаг 1 — Разрешение","svc.cfg.vol":"Шаг 2 — Объём",
        "svc.cfg.vid.title":"🎬 Видео","svc.cfg.vid.sub":"Динамические ролики 5–15 сек для TikTok / Instagram.",
        "svc.cfg.bulk.title":"🏷️ Карточки товаров","svc.cfg.bulk.sub":"$2.50/карточка (512px). Мин 30, макс 200.",
        "svc.cfg.upload.title":"📎 Загрузить фото","svc.cfg.upload.sub":"Загрузите фото товаров. Мы начнём в течение 48ч после оплаты.",
        "svc.cfg.details.title":"✏️ Детали заказа",
        "svc.cfg.compare.title":"Dord AI vs. Обычная студия","svc.cfg.how.title":"Как это работает",
        "svc.cfg.faq.title":"Часто задаваемые вопросы",
        "svc.cfg.faq1.q":"Какого качества нужны исходные фото?","svc.cfg.faq1.a":"Фото со смартфона подойдут, но чем лучше исходник — тем лучше результат. Мин 800×800px.",
        "svc.cfg.faq2.q":"Сколько времени занимает доставка?","svc.cfg.faq2.a":"До 48 часов после подтверждения оплаты.",
        "svc.cfg.faq3.q":"Какие способы оплаты?","svc.cfg.faq3.a":"Крипто: USDC, USDT, TON, BTC через OxaPay.",
        "svc.cfg.faq4.q":"Мои данные в безопасности?","svc.cfg.faq4.a":"Да. Свои GPU-серверы. Без облачных API, без датасетов."
    },

    en: {
        "nav.home":"Home","nav.services":"Order","nav.brief":"Brief","nav.dashboard":"Dashboard","nav.gallery":"Gallery","nav.order":"Order",
        "footer.col1.title":"Partners","footer.col2.title":"Information","footer.col3.title":"Legal",
        "footer.faq":"FAQ","footer.howto":"How It Works","footer.contact":"Contact Us","footer.privacy":"Privacy Policy","footer.terms":"Terms of Service","footer.refund":"Refund Policy",
        "footer.promo.hint":"Promo codes can be found on our social media and on partner Telegram channels (links in the footer)",
        "footer.address":"Israel, Tel Aviv, Yigal Alon St 98, Electra Tower","footer.type":"Automated AI Production Studio","footer.copy":"© 2026 All rights reserved",
        "btn.order":"Order →","btn.details":"Details & pricing →","btn.guide":"Read the brief guide","btn.allservices":"View all services",
        "disclaimer.title":"Important before payment","disclaimer.text":"Starting generation means direct rental of GPU hours. If the result matches your brief exactly but doesn't meet personal expectations — no refund is possible.",
        "refund.title":"Refund policy","refund.text":"Starting generation means direct rental of GPU hours. No refund if result matches brief.",
        "index.title":"Dord AI Studio — AI Photo Studio for Business & Shopify",
        "hero.badge":"Private GPU Servers Online — 3 Agents Active",
        "hero.title":"Stop Wasting $3,000<br>on Product <span class=\"highlight\">Photoshoots.</span>",
        "hero.sub":"Dord AI Studio delivers high-end, store-ready commercial visuals in 24 hours. No plastic geometry. No fake reflections. Pure luxury — from $74.99.",
        "hero.cta1":"Get a Free Sample →","hero.cta2":"Explore Gallery",
        "why.label":"The Infrastructure Difference","why.title":"Why Cloud AI Fails You",
        "why.sub":"90% of services are just API wrappers — shared queues, generic models, no human review. We run our own dedicated GPU hardware.",
        "why.c1.title":"Perfect Material Physics","why.c1.text":"Jewelry facets, glass highlights, leather texture, chrome reflections — rendered accurately, every time.",
        "why.c2.title":"Zero Data Leaks","why.c2.text":"Your product images never enter training datasets. Private servers, private results. Not Midjourney. Not DALL-E.",
        "why.c3.title":"Done-For-You","why.c3.text":"You send us a raw photo or description. We deliver a luxury commercial visual. No software to learn.",
        "svc.label":"Pricing","svc.title":"Three Packs. No Subscriptions.","svc.sub":"Every order is handled personally.",
        "svc1.title":"Starter","svc1.price":"/ 20 images","svc1.text":"20 studio-grade product visuals.",
        "svc1.f1":"20 images · 512px–1024px","svc1.f2":"Shopify & Amazon ready","svc1.f3":"Commercial rights included","svc1.f4":"Delivered within 48 hours",
        "svc2.title":"Growth (E-Com)","svc2.price":"/ 50 images","svc2.badge":"Most Popular","svc2.text":"50 luxury commercial visuals.",
        "svc2.f1":"50 images · up to 1024px","svc2.f2":"Amazon & Shopify formats","svc2.f3":"Full commercial rights included","svc2.f4":"Human QA on every image","svc2.f5":"Delivered within 48 hours",
        "svc3.title":"Scale (Business)","svc3.price":"/ 150 images","svc3.text":"150 visuals — complete visual identity.",
        "svc3.f1":"150 images · up to 1024px","svc3.f2":"Custom visual style for your brand","svc3.f3":"Lifestyle, studio & detail shots","svc3.f4":"Private server — your data stays yours","svc3.f5":"Delivered within 48 hours",
        "how.label":"How It Works","how.title":"Three Steps to Luxury Visuals",
        "how.s1.title":"Send Your Product","how.s1.text":"Share a raw photo or product link via Telegram. No complex briefs needed.",
        "how.s2.title":"Pay in USDT or USDC","how.s2.text":"TON or BNB Smart Chain. No banks, no chargebacks, no geographic restrictions.",
        "how.s3.title":"Receive in 48 Hours","how.s3.text":"Your luxury commercial visuals delivered directly. Full commercial rights included.",
        "cta.title":"Drop Your Raw Product Photo.<br>Get a Luxury Visual. Free.","cta.sub":"Send us a basic photo of your product — even a phone shot on white background. We'll return a premium luxury commercial image with no watermark.",
        "promo.hint":"Promo codes can be found on our social media and on partner Telegram channels (links in the footer)","promo.apply":"Apply","promo.placeholder":"Enter promo code","promo.success":"Promo applied! Discount:","promo.error":"Invalid or expired promo code","promo.label":"Promo Code",
        "gallery.title":"Gallery — Dord AI Studio",
        "gallery.bc":"Gallery",
        "dash.login.subtitle":"AI Photo & Video Studio · Tel Aviv",
        "dash.login.signin":"Sign In","dash.login.register":"Register",
        "dash.login.email":"Email","dash.login.password":"Password","dash.login.confirm":"Confirm Password",
        "dash.login.signin.btn":"Sign In →","dash.login.forgot":"Forgot password?","dash.login.or":"or",
        "dash.login.create":"Create Account →",
        "dash.login.reset.desc":"Enter your email and we'll send a password reset link.",
        "dash.login.reset.btn":"Send Reset Link →","dash.login.back":"← Back to Sign In","dash.login.main":"← Back to main page",
        "dash.logout":"Sign out",
        "dash.neworder":"New Order",
        "dash.stat.images":"Images in pack","dash.stat.purchased":"purchased total",
        "dash.stat.completed":"Completed","dash.stat.remaining":"remaining",
        "dash.stat.spent":"Total spent","dash.stat.alltime":"all time",
        "dash.loyalty.title":"🏆 Loyalty Program",
        "dash.loyalty.discount.label":"Your personal discount on all orders",
        "dash.loyalty.hint":"1 spent $ = 1 loyalty point",
        "dash.loyalty.next":"to next rank",
        "dash.loyalty.max":"🏆 Maximum rank reached!",
        "dash.loyalty.max.hint":"You have reached the highest rank. Discount: 12%",
        "dash.loyalty.pts":"pts","dash.loyalty.pts.to":"pts to",
        "dash.orders.title":"📋 Order History","dash.orders.new":"+ New Order",
        "dash.orders.th.num":"#","dash.orders.th.type":"Type","dash.orders.th.pack":"Pack",
        "dash.orders.th.amount":"Amount","dash.orders.th.date":"Date","dash.orders.th.status":"Status",
        "dash.orders.empty":"No orders yet.","dash.orders.empty.cta":"Place your first order →",
        "dash.profile.member":"Member since","dash.profile.uid":"Account ID",
        "dash.rank.newcomer":"Newcomer","dash.rank.designer":"Designer","dash.rank.manager":"Manager","dash.rank.director":"Director","dash.rank.ceo":"CEO",
        "dash.referral.title":"🔗 Referral Program",
        "dash.referral.desc":"Share your link with friends. You earn 5% of every order they make as loyalty points. Both of you get 10 bonus points on signup.",
        "dash.referral.copy":"Copy Link","dash.referral.earned":"pts earned from referrals","dash.referral.friends":"friends joined",
        "svc.cfg.title":"Build Your Order","svc.cfg.sub":"Select exactly what you need. Every order is handled personally.",
        "svc.cfg.free.title":"🎁 Free Sample — Try Before You Buy","svc.cfg.free.text":"Send us a photo of your product — even a phone shot on a white background. We'll return 1–2 premium renders completely free.",
        "svc.cfg.free.btn":"Get Free Sample →",
        "svc.cfg.img.title":"📸 Image Packs","svc.cfg.img.sub":"Choose resolution, then volume. All packs include commercial rights and human QA.",
        "svc.cfg.res":"Step 1 — Resolution","svc.cfg.vol":"Step 2 — Volume",
        "svc.cfg.vid.title":"🎬 Video Reels","svc.cfg.vid.sub":"Short dynamic videos 5–15 sec for TikTok / Instagram.",
        "svc.cfg.bulk.title":"🏷️ Bulk Product Cards","svc.cfg.bulk.sub":"$2.50/card (512px). Min 30, max 200.",
        "svc.cfg.upload.title":"📎 Upload Photos","svc.cfg.upload.sub":"Upload product images. We start within 48h after payment.",
        "svc.cfg.details.title":"✏️ Order Details",
        "svc.cfg.compare.title":"Dord AI vs. Traditional Studio","svc.cfg.how.title":"How It Works",
        "svc.cfg.faq.title":"Frequently Asked Questions",
        "svc.cfg.faq1.q":"What quality source photos do you need?","svc.cfg.faq1.a":"Phone photos work, but better source = better result. Min 800×800px, good lighting.",
        "svc.cfg.faq2.q":"How long does delivery take?","svc.cfg.faq2.a":"Up to 48 hours after payment confirmation.",
        "svc.cfg.faq3.q":"What payment methods?","svc.cfg.faq3.a":"Crypto: USDC, USDT, TON, BTC via OxaPay.",
        "svc.cfg.faq4.q":"Is my data private?","svc.cfg.faq4.a":"Yes. Own GPU servers. No cloud APIs, no training datasets."
    }
};

// ===================== ENGINE =====================
(function() {
    function applyLang(lang) {
        const dict = DORD_I18N[lang];
        if (!dict) return;
        localStorage.setItem('dord_lang', lang);
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });
        const pageKey = document.body.getAttribute('data-page');
        if (pageKey && dict[pageKey + '.title']) {
            document.title = dict[pageKey + '.title'];
        }
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang') || btn.textContent.trim().toLowerCase();
            btn.classList.toggle('active', btnLang === lang);
        });
    }

    window.setLang = function(lang) { applyLang(lang); };
    window.switchLanguage = function(lang, btn) { applyLang(lang); };
    window.i18nSetLang = function(lang) { applyLang(lang); };
    window.i18nGet = function(key) {
        const lang = localStorage.getItem('dord_lang') || 'en';
        return (DORD_I18N[lang] && DORD_I18N[lang][key]) || (DORD_I18N['en'] && DORD_I18N['en'][key]) || key;
    };

    document.addEventListener('DOMContentLoaded', function() {
        const saved = localStorage.getItem('dord_lang') || 'en';
        applyLang(saved);
    });
})();
