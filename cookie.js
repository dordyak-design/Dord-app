
/**
 * Dord AI Studio — Cookie Consent Banner
 * Подключить: <script src="cookie.js"></script> (перед </body>)
 * Показывается 1 раз, выбор в localStorage. GA работает всегда.
 */
(function(){
  if(localStorage.getItem('dord_cookie_consent')) return;

  const bar = document.createElement('div');
  bar.id = 'cookieBar';
  bar.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;padding:16px 20px;background:rgba(8,11,26,0.97);border-top:1px solid rgba(0,200,150,0.2);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:'Inter',sans-serif">
      <div style="flex:1;min-width:240px">
        <div style="font-size:12px;color:#fff;font-weight:600;margin-bottom:4px" id="cookieTitle">🍪 We use cookies</div>
        <div style="font-size:11px;color:#8892a4;line-height:1.6" id="cookieText">This site uses cookies for analytics and to improve your experience. You can accept all or only essential cookies.</div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button onclick="dordCookieAccept('essential')" style="padding:9px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:#cdd5e0;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s" id="cookieBtnEss">Essential only</button>
        <button onclick="dordCookieAccept('all')" style="padding:9px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,#004aad,#00c896);color:#fff;font-family:'Inter',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s" id="cookieBtnAll">Accept all</button>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  var lang = localStorage.getItem('dord_lang');
  if(lang === 'ru'){
    var t = document.getElementById('cookieTitle');
    var p = document.getElementById('cookieText');
    var b1 = document.getElementById('cookieBtnEss');
    var b2 = document.getElementById('cookieBtnAll');
    if(t) t.textContent = '🍪 Мы используем cookies';
    if(p) p.textContent = 'Сайт использует cookies для аналитики и улучшения работы. Вы можете принять все или только необходимые.';
    if(b1) b1.textContent = 'Только необходимые';
    if(b2) b2.textContent = 'Принять все';
  }

  window.dordCookieAccept = function(choice){
    localStorage.setItem('dord_cookie_consent', choice);
    var el = document.getElementById('cookieBar');
    if(el) el.remove();
  };
})();
COOKIEOF
cat /home/claude/cookie.js
Output

/**
 * Dord AI Studio — Cookie Consent Banner
 * Подключить: <script src="cookie.js"></script> (перед </body>)
 * Показывается 1 раз, выбор в localStorage. GA работает всегда.
 */
(function(){
  if(localStorage.getItem('dord_cookie_consent')) return;

  const bar = document.createElement('div');
  bar.id = 'cookieBar';
  bar.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;padding:16px 20px;background:rgba(8,11,26,0.97);border-top:1px solid rgba(0,200,150,0.2);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:'Inter',sans-serif">
      <div style="flex:1;min-width:240px">
        <div style="font-size:12px;color:#fff;font-weight:600;margin-bottom:4px" id="cookieTitle">🍪 We use cookies</div>
        <div style="font-size:11px;color:#8892a4;line-height:1.6" id="cookieText">This site uses cookies for analytics and to improve your experience. You can accept all or only essential cookies.</div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button onclick="dordCookieAccept('essential')" style="padding:9px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:#cdd5e0;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s" id="cookieBtnEss">Essential only</button>
        <button onclick="dordCookieAccept('all')" style="padding:9px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,#004aad,#00c896);color:#fff;font-family:'Inter',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s" id="cookieBtnAll">Accept all</button>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  var lang = localStorage.getItem('dord_lang');
  if(lang === 'ru'){
    var t = document.getElementById('cookieTitle');
    var p = document.getElementById('cookieText');
    var b1 = document.getElementById('cookieBtnEss');
    var b2 = document.getElementById('cookieBtnAll');
    if(t) t.textContent = '🍪 Мы используем cookies';
    if(p) p.textContent = 'Сайт использует cookies для аналитики и улучшения работы. Вы можете принять все или только необходимые.';
    if(b1) b1.textContent = 'Только необходимые';
    if(b2) b2.textContent = 'Принять все';
  }

  window.dordCookieAccept = function(choice){
    localStorage.setItem('dord_cookie_consent', choice);
    var el = document.getElementById('cookieBar');
    if(el) el.remove();
  };
})();

