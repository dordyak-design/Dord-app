/* components.js — загружает header.html и footer.html в страницу */
(async function() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  // Применить сохранённый язык к только что вставленному HTML
  function reapplyLang() {
    const lang = localStorage.getItem('dord_lang') || 'en';
    if (typeof window.setLang === 'function') window.setLang(lang);
  }

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
        reapplyLang();
      }
    } catch(e) { console.warn('header.html load failed', e); }
  }

  if (footer) {
    try {
      const res = await fetch('footer.html');
      if (res.ok) {
        footer.innerHTML = await res.text();
        reapplyLang();
      }
    } catch(e) { console.warn('footer.html load failed', e); }
  }
})();
