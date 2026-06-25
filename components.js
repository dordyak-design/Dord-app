/* components.js — загружает header.html и footer.html в страницу */
(async function() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  if (header) {
    try {
      const res = await fetch('header.html');
      if (res.ok) {
        header.innerHTML = await res.text();
        // Подсветка текущей страницы в навигации
        const page = location.pathname.split('/').pop().replace('.html','') || 'index';
        header.querySelectorAll('nav .nav-btn').forEach(function(btn) {
          if (btn.getAttribute('data-page') === page) {
            btn.classList.add('active');
          }
        });
        // Переинициализировать lang-switcher если setLang уже определён
        if (typeof setLang === 'function') {
          const lang = localStorage.getItem('lang') || 'en';
          header.querySelectorAll('.lang-btn').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
          });
        }
      }
    } catch(e) { console.warn('header.html load failed', e); }
  }

  if (footer) {
    try {
      const res = await fetch('footer.html');
      if (res.ok) {
        footer.innerHTML = await res.text();
        // Переприменить i18n к футеру если applyI18n доступен
        if (typeof applyI18n === 'function') {
          applyI18n(localStorage.getItem('lang') || 'en');
        }
      }
    } catch(e) { console.warn('footer.html load failed', e); }
  }
})();
