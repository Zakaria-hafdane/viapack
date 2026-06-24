(function(){
  /* SLIDER */
  const slides=document.querySelectorAll('.slide'),dots=document.querySelectorAll('.dot');
  let cur=0,tmr;
  function goTo(n){if(!slides.length)return;slides[cur].classList.remove('active');dots[cur]?.classList.remove('active');cur=(n+slides.length)%slides.length;slides[cur].classList.add('active');dots[cur]?.classList.add('active');}
  function go(){tmr=setInterval(()=>goTo(cur+1),5000);}
  function rst(){clearInterval(tmr);go();}
  if(slides.length){go();document.querySelector('.sarr.next')?.addEventListener('click',()=>{goTo(cur+1);rst();});document.querySelector('.sarr.prev')?.addEventListener('click',()=>{goTo(cur-1);rst();});dots.forEach((d,i)=>d.addEventListener('click',()=>{goTo(i);rst();}));}
  /* NAV TOGGLE */
  const tog=document.getElementById('nav-toggle'),nav=document.querySelector('.main-nav');
  tog?.addEventListener('click',()=>nav?.classList.toggle('open'));
  document.addEventListener('click',e=>{if(!e.target.closest('.main-nav')&&!e.target.closest('#nav-toggle'))nav?.classList.remove('open');});
  /* TABS */
  document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click',()=>{
    const t=b.dataset.tab,a=b.closest('.tab-area');
    a.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));
    a.querySelectorAll('.tab-pane').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');document.getElementById(t)?.classList.add('active');
  }));
  /* TESTIMONIALS */
  const ts=document.querySelectorAll('.testi');let tc=0;
  if(ts.length)setInterval(()=>{ts[tc].classList.remove('active');tc=(tc+1)%ts.length;ts[tc].classList.add('active');},6000);
  /* SCROLL ANIMATIONS */
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.style.animationDelay=(el.dataset.delay||0)+'s';el.classList.add('appeared');obs.unobserve(el);}}),{threshold:.12});
  document.querySelectorAll('[data-animate]').forEach(el=>obs.observe(el));
  /* STICKY HEADER */
  const hdr=document.querySelector('.site-header');
  window.addEventListener('scroll',()=>hdr?.classList.toggle('scrolled',window.scrollY>5),{passive:true});
  /* CONTACT FORM */
  document.getElementById('contact-form')?.addEventListener('submit',e=>{
    e.preventDefault();const b=e.target.querySelector('[type=submit]');
    b.textContent='Envoi en cours…';b.disabled=true;
    setTimeout(()=>{b.textContent='✓ Message envoyé !';b.style.background='#27ae60';e.target.reset();},1500);
  });
  /* NEWSLETTER */
  document.getElementById('nl-form')?.addEventListener('submit',e=>{
    e.preventDefault();const m=document.getElementById('nl-msg');
    if(m){m.style.display='block';m.textContent='✓ Inscription confirmée !';}
  });
  /* PRODUCT SEARCH */
  document.querySelectorAll('.search-btn').forEach(b=>b.addEventListener('click',e=>{
    e.preventDefault();
    const v=[...b.closest('.tab-form').querySelectorAll('input,select')].map(i=>i.value).filter(Boolean);
    if(v.length)alert('Recherche : '+v.join(' × '));
  }));
  /* BACK TO TOP */
  const btt=document.getElementById('back-top');
  window.addEventListener('scroll',()=>{if(!btt)return;const s=window.scrollY>400;btt.style.opacity=s?'1':'0';btt.style.pointerEvents=s?'all':'none';},{passive:true});
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  /* PRODUCT FILTER */
  document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
    const cat=b.dataset.cat;
    b.closest('.filters').querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    b.closest('section,div').querySelectorAll('.prod-card').forEach(c=>{
      c.style.display=(!cat||c.dataset.cat===cat)?'flex':'none';
    });
  }));
})();

/* ==========================================
   SEARCH DATA
   ========================================== */
var SEARCH_DATA=[
  {t:'Banderoleuses',c:'Machines',i:'fa-circle-notch',h:'pages/machines/banderoleuses/index.html'},
  {t:'Lignes automatiques',c:'Machines',i:'fa-cogs',h:'pages/machines/lignes-automatiques.html'},
  {t:'Systèmes Hot Melt Graco',c:'Machines',i:'fa-fire',h:'pages/machines/hot-melt.html'},
  {t:'Humecteurs papier gommé',c:'Machines',i:'fa-tint',h:'pages/machines/humecteurs.html'},
  {t:'Formeuses de cartons',c:'Machines',i:'fa-cube',h:'pages/machines/formeuses.html'},
  {t:'Fermeuses de cartons',c:'Machines',i:'fa-box',h:'pages/machines/fermeuses.html'},
  {t:'Thermofilmeuses',c:'Machines',i:'fa-film',h:'pages/machines/thermofilmeuses/index.html'},
  {t:'Ensacheuses',c:'Machines',i:'fa-shopping-bag',h:'pages/machines/ensacheuses/index.html'},
  {t:'Remplissage coussins d\'air SPK',c:'Machines',i:'fa-wind',h:'pages/machines/remplissage/index.html'},
  {t:'Broyeurs de cartons HSM',c:'Machines',i:'fa-recycle',h:'pages/machines/broyeurs/index.html'},
  {t:'Cercleuses SPK',c:'Machines',i:'fa-ring',h:'pages/machines/cercleuses/index.html'},
  {t:'Presses à balles',c:'Machines',i:'fa-compress-arrows-alt',h:'pages/machines/presses/index.html'},
  {t:'Film et palettisation',c:'Matériaux',i:'fa-layer-group',h:'pages/materiel/film-palettisation/index.html'},
  {t:'Rubans adhésifs',c:'Matériaux',i:'fa-tape',h:'pages/materiel/rubans/index.html'},
  {t:'Feuillard et accessoires',c:'Matériaux',i:'fa-link',h:'pages/materiel/feuillard/index.html'},
  {t:'Films rétractables',c:'Matériaux',i:'fa-fire-alt',h:'pages/materiel/film-retractable/index.html'},
  {t:'Emballages anticorrosion VCI',c:'Matériaux',i:'fa-shield-alt',h:'pages/materiel/anticorrosion/index.html'},
  {t:'Calage et protection',c:'Matériaux',i:'fa-box-open',h:'pages/materiel/calage/index.html'},
  {t:'Boîtes en carton',c:'Matériaux',i:'fa-cube',h:'pages/materiel/cartons/index.html'},
  {t:'Étiquettes / porte-documents',c:'Matériaux',i:'fa-tag',h:'pages/materiel/etiquettes/index.html'},
  {t:'Sacs en plastique',c:'Matériaux',i:'fa-shopping-bag',h:'pages/materiel/sacs/index.html'},
  {t:'Manutention et logistique',c:'Matériaux',i:'fa-truck',h:'pages/materiel/manutention/index.html'},
  {t:'Qui Sommes-Nous',c:'Pages',i:'fa-building',h:'pages/qui-sommes-nous.html'},
  {t:'Applications d\'emballage',c:'Pages',i:'fa-industry',h:'pages/applications.html'},
  {t:'Blog',c:'Pages',i:'fa-newspaper',h:'pages/blog/index.html'},
  {t:'Contact & Devis',c:'Pages',i:'fa-envelope',h:'pages/contact.html'},
];

/* ==========================================
   SEARCH + CART
   ========================================== */
(function(){
  var FREE_SHIP=100;
  var cart=JSON.parse(localStorage.getItem('viapack_cart')||'[]');

  /* ---- CART HELPERS ---- */
  function saveCart(){localStorage.setItem('viapack_cart',JSON.stringify(cart));}
  function cartQty(){return cart.reduce(function(s,i){return s+i.qty;},0);}
  function cartTotal(){return cart.reduce(function(s,i){return s+(i.price*i.qty);},0);}

  function updateBadge(){
    var n=cartQty();
    var el=document.getElementById('cart-count');
    if(el)el.textContent=n;
  }

  function renderCart(){
    var body=document.getElementById('cart-body');
    var foot=document.getElementById('cart-foot');
    if(!body||!foot)return;
    var n=cartQty();
    var badge=document.querySelector('.ch-badge');
    if(badge)badge.textContent=n>0?n+' article'+(n>1?'s':''):'';

    if(!cart.length){
      body.innerHTML='<div class="cart-empty"><i class="fa fa-shopping-cart"></i><p>Votre panier est vide.</p><a href="pages/materiel/index.html" class="btn btn-red" style="font-size:13px;padding:10px 20px;">Voir les produits</a></div>';
      foot.innerHTML='';
      return;
    }

    body.innerHTML=cart.map(function(item){
      return '<div class="cart-item" data-id="'+item.id+'">'
        +'<div class="ci-img"><img src="'+item.img+'" alt="'+item.name+'" loading="lazy"/></div>'
        +'<div class="ci-info">'
        +'<div class="ci-name">'+item.name+'</div>'
        +'<div class="ci-brand">'+item.brand+'</div>'
        +'<div class="ci-row">'
        +'<div class="ci-qty"><button class="ci-minus" data-id="'+item.id+'">−</button><div class="qv">'+item.qty+'</div><button class="ci-plus" data-id="'+item.id+'">+</button></div>'
        +'<span class="ci-price">'+(item.price*item.qty).toFixed(2).replace('.',',')+' € HT</span>'
        +'</div></div>'
        +'<button class="ci-remove" data-id="'+item.id+'" aria-label="Supprimer"><i class="fa fa-trash-alt"></i></button>'
        +'</div>';
    }).join('');

    var total=cartTotal();
    var rem=Math.max(0,FREE_SHIP-total);
    var pct=Math.min(100,(total/FREE_SHIP)*100);
    foot.innerHTML='<div class="ship-bar">'
      +(rem>0
        ?'<p>Plus que <strong>'+rem.toFixed(2).replace('.',',')+'&nbsp;€ HT</strong> pour la livraison gratuite !</p>'
        :'<p class="ok">✓ Livraison gratuite incluse !</p>')
      +'<div class="ship-track"><div class="ship-fill" style="width:'+pct+'%"></div></div></div>'
      +'<div class="cart-sub">'
      +'<div class="cart-row"><span>Sous-total HT</span><span>'+total.toFixed(2).replace('.',',')+'&nbsp;€</span></div>'
      +'<div class="cart-row"><span>Livraison</span><span>'+(total>=FREE_SHIP?'<span class="free-lbl">Gratuite</span>':'Calculée à l\'étape suivante')+'</span></div>'
      +'<div class="cart-row total"><span>Total HT</span><span>'+total.toFixed(2).replace('.',',')+'&nbsp;€</span></div>'
      +'</div>'
      +'<button class="btn-checkout">Commander →</button>'
      +'<button class="btn-continue" id="cart-cont-btn">Continuer mes achats</button>';

    body.querySelectorAll('.ci-minus').forEach(function(b){b.addEventListener('click',function(){changeQty(b.dataset.id,-1);});});
    body.querySelectorAll('.ci-plus').forEach(function(b){b.addEventListener('click',function(){changeQty(b.dataset.id,1);});});
    body.querySelectorAll('.ci-remove').forEach(function(b){b.addEventListener('click',function(){removeItem(b.dataset.id);});});
    var contBtn=document.getElementById('cart-cont-btn');
    if(contBtn)contBtn.addEventListener('click',closeCart);
  }

  function changeQty(id,delta){
    var idx=cart.findIndex(function(i){return i.id===id;});
    if(idx<0)return;
    cart[idx].qty=Math.max(1,cart[idx].qty+delta);
    saveCart();updateBadge();renderCart();
  }
  function removeItem(id){
    cart=cart.filter(function(i){return i.id!==id;});
    saveCart();updateBadge();renderCart();
  }

  window.addToCart=function(product){
    var idx=cart.findIndex(function(i){return i.id===product.id;});
    if(idx>-1){cart[idx].qty++;}
    else{cart.push(Object.assign({},product,{qty:1}));}
    saveCart();updateBadge();renderCart();openCart();
  };

  function openCart(){
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function closeCart(){
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  document.getElementById('cart-open')&&document.getElementById('cart-open').addEventListener('click',openCart);
  document.getElementById('cart-close')&&document.getElementById('cart-close').addEventListener('click',closeCart);
  document.getElementById('cart-overlay')&&document.getElementById('cart-overlay').addEventListener('click',closeCart);

  document.querySelectorAll('.btn-cart-add').forEach(function(btn){
    btn.addEventListener('click',function(){
      addToCart({id:this.dataset.id,name:this.dataset.name,brand:this.dataset.brand,price:parseFloat(this.dataset.price),img:this.dataset.img});
    });
  });

  /* ---- SEARCH ---- */
  var overlay=document.getElementById('search-overlay');
  var inp=document.getElementById('search-input');
  var results=document.getElementById('search-results');

  function openSearch(){
    overlay&&overlay.classList.add('open');
    document.body.classList.add('no-scroll');
    setTimeout(function(){inp&&inp.focus();},80);
  }
  function closeSearch(){
    overlay&&overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if(inp)inp.value='';
    if(results)results.innerHTML='';
  }

  document.getElementById('search-open')&&document.getElementById('search-open').addEventListener('click',openSearch);
  document.getElementById('search-close')&&document.getElementById('search-close').addEventListener('click',closeSearch);
  overlay&&overlay.addEventListener('click',function(e){if(e.target===overlay)closeSearch();});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){closeSearch();closeCart();}
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch();}
  });

  inp&&inp.addEventListener('input',function(){
    var q=this.value.trim().toLowerCase();
    if(!q||q.length<2){results.innerHTML='';return;}
    var matches=SEARCH_DATA.filter(function(p){return p.t.toLowerCase().includes(q)||p.c.toLowerCase().includes(q);}).slice(0,8);
    if(!matches.length){results.innerHTML='<p class="search-hint-txt">Aucun résultat pour "'+inp.value+'"</p>';return;}
    results.innerHTML=matches.map(function(p){
      return '<a href="'+p.h+'" class="sr-item"><div class="sr-icon"><i class="fa '+p.i+'"></i></div><div class="sr-info"><strong>'+p.t+'</strong><span>'+p.c+'</span></div><span class="sr-badge">'+p.c+'</span></a>';
    }).join('');
  });

  /* ---- DISCOUNT NOTIF ---- */
  document.getElementById('disc-notif-close')&&document.getElementById('disc-notif-close').addEventListener('click',function(){
    var el=document.getElementById('disc-notif');
    if(el){el.style.maxHeight=el.offsetHeight+'px';el.style.transition='max-height .3s,padding .3s,opacity .3s';el.style.opacity='0';el.style.maxHeight='0';el.style.padding='0';setTimeout(function(){el.remove();},320);}
  });

  updateBadge();
  renderCart();
})();
