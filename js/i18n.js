/* ==========================================
   VIAPACK I18N ENGINE
   Client-side language switcher (fr default, en, ar).
   Translations: js/i18n/common.json (shared header/footer/nav/etc.)
   + per-page <script type="application/json" id="i18n-data"> block.
   ========================================== */
(function(){
  var LANGS = ['fr','en','ar'];
  var RTL_LANGS = {ar:true};
  var LABELS = {fr:'Français', en:'English', ar:'العربية'};
  var CODES = {fr:'FR', en:'EN', ar:'AR'};
  var STORAGE_KEY = 'viapack_lang';
  var ATTRS = ['placeholder','alt','title','content','value','aria-label'];

  var COMMON = {en:{},ar:{}};
  var PAGE = {en:{},ar:{}};
  var snapshots = new WeakMap();

  function readPageDict(){
    var el = document.getElementById('i18n-data');
    if(!el) return;
    try{
      var data = JSON.parse(el.textContent);
      PAGE.en = data.en || {};
      PAGE.ar = data.ar || {};
    }catch(e){ /* no page dict, fr-only page */ }
  }

  function snapshot(el){
    var s = snapshots.get(el);
    if(s) return s;
    s = {text: el.hasAttribute('data-i18n') ? el.textContent : null, attrs:{}};
    for(var i=0;i<ATTRS.length;i++){
      var a = ATTRS[i];
      if(el.hasAttribute('data-i18n-'+a)) s.attrs[a] = el.getAttribute(a);
    }
    snapshots.set(el, s);
    return s;
  }

  function initSnapshots(){
    document.querySelectorAll('[data-i18n]').forEach(snapshot);
    ATTRS.forEach(function(a){
      document.querySelectorAll('[data-i18n-'+a+']').forEach(snapshot);
    });
  }

  function dictFor(lang){
    var d = {};
    var c = COMMON[lang] || {}, p = PAGE[lang] || {};
    for(var k in c) d[k] = c[k];
    for(var k2 in p) d[k2] = p[k2];
    return d;
  }

  function applyLang(lang){
    var dict = lang === 'fr' ? null : dictFor(lang);

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var s = snapshot(el);
      var key = el.getAttribute('data-i18n');
      if(!dict){ el.textContent = s.text; return; }
      var v = dict[key];
      el.textContent = (v != null && v !== '') ? v : s.text;
    });

    ATTRS.forEach(function(a){
      document.querySelectorAll('[data-i18n-'+a+']').forEach(function(el){
        var s = snapshot(el);
        var key = el.getAttribute('data-i18n-'+a);
        if(!dict){ el.setAttribute(a, s.attrs[a]); return; }
        var v = dict[key];
        el.setAttribute(a, (v != null && v !== '') ? v : s.attrs[a]);
      });
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', RTL_LANGS[lang] ? 'rtl' : 'ltr');
    document.body.classList.toggle('lang-rtl', !!RTL_LANGS[lang]);
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
    updateSwitcherUI(lang);
  }

  function updateSwitcherUI(lang){
    document.querySelectorAll('.lang-switch-code').forEach(function(el){ el.textContent = CODES[lang]; });
    document.querySelectorAll('.lang-switch-menu button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  function buildSwitcher(){
    var hosts = document.querySelectorAll('.hdr-right');
    if(!hosts.length) return;
    hosts.forEach(function(host){
      if(host.querySelector('.lang-switch')) return;
      var wrap = document.createElement('div');
      wrap.className = 'lang-switch';
      wrap.innerHTML =
        '<button class="lang-switch-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Choisir la langue">' +
          '<i class="fa fa-globe"></i><span class="lang-switch-code">FR</span>' +
        '</button>' +
        '<div class="lang-switch-menu" role="menu">' +
          LANGS.map(function(l){
            return '<button type="button" role="menuitem" data-lang="'+l+'">'+LABELS[l]+'</button>';
          }).join('') +
        '</div>';
      host.insertBefore(wrap, host.firstChild);

      var btn = wrap.querySelector('.lang-switch-btn');
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        wrap.classList.toggle('open');
        btn.setAttribute('aria-expanded', wrap.classList.contains('open') ? 'true' : 'false');
      });
      wrap.querySelectorAll('.lang-switch-menu button').forEach(function(b){
        b.addEventListener('click', function(){
          wrap.classList.remove('open');
          setLang(b.getAttribute('data-lang'));
        });
      });
    });
    document.addEventListener('click', function(){
      document.querySelectorAll('.lang-switch.open').forEach(function(w){ w.classList.remove('open'); });
    });
  }

  function setLang(lang){
    if(LANGS.indexOf(lang) === -1) lang = 'fr';
    applyLang(lang);
  }

  function getInitialLang(){
    try{
      var saved = localStorage.getItem(STORAGE_KEY);
      if(saved && LANGS.indexOf(saved) !== -1) return saved;
    }catch(e){}
    var nav = (navigator.language || '').slice(0,2).toLowerCase();
    if(LANGS.indexOf(nav) !== -1) return nav;
    return 'fr';
  }

  function loadCommon(){
    var data = window.VIAPACK_I18N_COMMON;
    if(data){ COMMON.en = data.en || {}; COMMON.ar = data.ar || {}; }
  }

  function init(){
    readPageDict();
    loadCommon();
    initSnapshots();
    buildSwitcher();
    setLang(getInitialLang());
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ViapackI18n = {setLang: setLang};
})();
