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
  const WEB3FORMS_ACCESS_KEY='YOUR_ACCESS_KEY_HERE';
  document.getElementById('contact-form')?.addEventListener('submit',async e=>{
    e.preventDefault();const form=e.target,b=form.querySelector('[type=submit]');
    const originalLabel=b.textContent,originalBg=b.style.background;
    b.textContent='Envoi en cours…';b.disabled=true;
    const data=new FormData(form);
    data.append('access_key',WEB3FORMS_ACCESS_KEY);
    data.append('subject','Nouveau message depuis le site Viapack');
    try{
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Accept':'application/json'},body:data});
      const json=await res.json();
      if(json.success){
        b.textContent='✓ Message envoyé !';b.style.background='#27ae60';form.reset();
      }else{throw new Error(json.message||'Échec de l\'envoi');}
    }catch(err){
      b.textContent='✗ Échec, réessayez';b.style.background='#c0392b';
      console.error('Contact form error:',err);
    }finally{
      setTimeout(()=>{b.textContent=originalLabel;b.style.background=originalBg;b.disabled=false;},3000);
    }
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
  /* PRODUCTS */
  {t:"Applicateur manuel film étirable 45 cm",c:"Film et palettisation",i:'fa-box',h:'pages/produits/applicateur-manuel-film-etirable-45cm/index.html'},
  {t:"Applicateur manuel film étirable 50 cm",c:"Film et palettisation",i:'fa-box',h:'pages/produits/applicateur-manuel-film-etirable-50cm/index.html'},
  {t:"BetterPack 333ePlus — Humecteur de papier gommé électrique",c:"Humecteurs de papier gommé",i:'fa-box',h:'pages/produits/betterpack-333eplus/index.html'},
  {t:"BetterPack 555e — Humecteur électrique haute cadence",c:"Humecteurs de papier gommé",i:'fa-box',h:'pages/produits/betterpack-555e/index.html'},
  {t:"Boîte américaine 300x300x300mm",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-americaine-300x300x300/index.html'},
  {t:"Boîte carton 200x150x100mm",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-carton-200x150x100/index.html'},
  {t:"Boîte carton 300x200x200mm",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-carton-300x200x200/index.html'},
  {t:"Boîte carton 400x300x300mm",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-carton-400x300x300/index.html'},
  {t:"Boîte carton double cannelure",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-carton-double-cannelure/index.html'},
  {t:"Boîte carton kraft premium",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-carton-kraft-premium/index.html'},
  {t:"Boîte carton personnalisée",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/boite-carton-personnalisee/index.html'},
  {t:"Boucles métalliques 13mm",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/boucles-metalliques-13mm/index.html'},
  {t:"Caisse palette carton 800x1200mm",c:"Boîtes en carton",i:'fa-box',h:'pages/produits/caisse-palette-carton/index.html'},
  {t:"Calage nid d'abeille kraft",c:"Calage et protection",i:'fa-box',h:'pages/produits/calage-nid-abeille-kraft/index.html'},
  {t:"Chariot dispenser film étirable",c:"Film et palettisation",i:'fa-box',h:'pages/produits/chariot-dispenser-film-etirable/index.html'},
  {t:"Chariot de manutention 600kg",c:"Manutention et logistique",i:'fa-box',h:'pages/produits/chariot-manutention-600kg/index.html'},
  {t:"Chips de calage polystyrène",c:"Calage et protection",i:'fa-box',h:'pages/produits/chips-calage-polystyrene/index.html'},
  {t:"Coussins d'air 200x100mm",c:"Calage et protection",i:'fa-box',h:'pages/produits/coussin-air-200x100mm/index.html'},
  {t:"Coussins d'air 200x300mm",c:"Calage et protection",i:'fa-box',h:'pages/produits/coussin-air-200x300mm/index.html'},
  {t:"Dévidoir ergonomique film étirable",c:"Film et palettisation",i:'fa-box',h:'pages/produits/devidoir-ergonomique/index.html'},
  {t:"Etiqueteuse manuelle palette",c:"Manutention et logistique",i:'fa-box',h:'pages/produits/etiqueteuse-manuelle-palette/index.html'},
  {t:"Etiquette blanche 105x148mm",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/etiquette-blanche-105x148/index.html'},
  {t:"Etiquette personnalisée",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/etiquette-personnalisee/index.html'},
  {t:"Etiquette thermique 100x150mm",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/etiquette-thermique-100x150/index.html'},
  {t:"Etiquette transparente 105x148mm",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/etiquette-transparente-105x148/index.html'},
  {t:"Feuillard acier 16mm",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/feuillard-acier-16mm/index.html'},
  {t:"Feuillard PET polyester 13mm",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/feuillard-pet-13mm/index.html'},
  {t:"Feuillard PP polypropylène 12mm",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/feuillard-pp-12mm/index.html'},
  {t:"Feuillard PP polypropylène 16mm",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/feuillard-pp-16mm/index.html'},
  {t:"Feuillard PP polypropylène 9mm",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/feuillard-pp-9mm/index.html'},
  {t:"Film étirable biodégradable PLA",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-biodegradable-pla/index.html'},
  {t:"Film étirable imprimé personnalisé",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-imprime-personnalise/index.html'},
  {t:"Film étirable machine 17 µm",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-machine-17my/index.html'},
  {t:"Film machine Power Stretch",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-machine-power-stretch/index.html'},
  {t:"Film étirable noir opaque 23 µm",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-noir-23my/index.html'},
  {t:"Film étirable pré-étiré 8µ",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-pre-etire-8my/index.html'},
  {t:"Film étirable renforcé 30 µm",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-renforce-30my/index.html'},
  {t:"Film étirable standard 23 µm",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-standard-23my/index.html'},
  {t:"Film étirable anti-UV",c:"Film et palettisation",i:'fa-box',h:'pages/produits/film-etirable-uv-protection/index.html'},
  {t:"Film mousse polyéthylène",c:"Calage et protection",i:'fa-box',h:'pages/produits/film-mousse-polyethylene/index.html'},
  {t:"Film POF polyoléfine alimentaire",c:"Films rétractables",i:'fa-box',h:'pages/produits/film-retractable-pof-polyolefine/index.html'},
  {t:"Film PE rétractable prédécoupé",c:"Films rétractables",i:'fa-box',h:'pages/produits/film-retractable-pre-decoupe/index.html'},
  {t:"Film PVC rétractable 300mm",c:"Films rétractables",i:'fa-box',h:'pages/produits/film-retractable-pvc-300mm/index.html'},
  {t:"Film VCI Controlox 100m",c:"Films VCI anticorrosion",i:'fa-box',h:'pages/produits/film-vci-controlox-100m/index.html'},
  {t:"Film VCI Controlox 200m",c:"Films VCI anticorrosion",i:'fa-box',h:'pages/produits/film-vci-controlox-200m/index.html'},
  {t:"Film VCI noir opaque 100m",c:"Films VCI anticorrosion",i:'fa-box',h:'pages/produits/film-vci-noir-100m/index.html'},
  {t:"Gaine PE rétractable 100mm",c:"Films rétractables",i:'fa-box',h:'pages/produits/gaine-retractable-pe-100mm/index.html'},
  {t:"Gaine PE rétractable 200mm",c:"Films rétractables",i:'fa-box',h:'pages/produits/gaine-retractable-pe-200mm/index.html'},
  {t:"Gaine VCI 200mm anticorrosion",c:"Films VCI anticorrosion",i:'fa-box',h:'pages/produits/gaine-vci-200mm/index.html'},
  {t:"Graco InvisiPac HM25C — Système hot melt 25cc",c:"Systèmes Hot Melt",i:'fa-box',h:'pages/produits/graco-invisipac-hm25c/index.html'},
  {t:"Graco InvisiPac HM50C — Système hot melt 50cc",c:"Systèmes Hot Melt",i:'fa-box',h:'pages/produits/graco-invisipac-hm50c/index.html'},
  {t:"HSM Compacteur C200 — Compacteur de déchets",c:"Presses à balles",i:'fa-box',h:'pages/produits/hsm-compacteur-c200/index.html'},
  {t:"HSM Compacteur C500 — Compacteur industriel haute capacité",c:"Presses à balles",i:'fa-box',h:'pages/produits/hsm-compacteur-c500/index.html'},
  {t:"HSM H-Press 200 — Presse horizontale automatique",c:"Presses à balles",i:'fa-box',h:'pages/produits/hsm-h-press-200/index.html'},
  {t:"HSM ProfiPack C400 — Broyeur carton",c:"Broyeurs de cartons",i:'fa-box',h:'pages/produits/hsm-profipack-c400/index.html'},
  {t:"HSM ProfiPack P425 — Broyeur professionnel",c:"Broyeurs de cartons",i:'fa-box',h:'pages/produits/hsm-profipack-p425/index.html'},
  {t:"HSM V-Press 1160 — Presse à balles verticale industrielle",c:"Presses à balles",i:'fa-box',h:'pages/produits/hsm-v-press-1160/index.html'},
  {t:"HSM V-Press 504 — Presse à balles verticale compacte",c:"Presses à balles",i:'fa-box',h:'pages/produits/hsm-v-press-504/index.html'},
  {t:"Manchon PE rétractable",c:"Films rétractables",i:'fa-box',h:'pages/produits/manchon-retractable-pe/index.html'},
  {t:"Marsh TD2100 — Humecteur manuel entrée de gamme",c:"Humecteurs de papier gommé",i:'fa-box',h:'pages/produits/marsh-td2100/index.html'},
  {t:"Marsh TD2200 — Humecteur semi-automatique",c:"Humecteurs de papier gommé",i:'fa-box',h:'pages/produits/marsh-td2200/index.html'},
  {t:"Mousse PE 2mm feuille",c:"Calage et protection",i:'fa-box',h:'pages/produits/mousse-polyethylene-2mm/index.html'},
  {t:"Film à bulles 50cm",c:"Calage et protection",i:'fa-box',h:'pages/produits/papier-bulle-50cm/index.html'},
  {t:"Papier kraft calage 70g",c:"Calage et protection",i:'fa-box',h:'pages/produits/papier-kraft-calage-70g/index.html'},
  {t:"Papier kraft VCI anticorrosion 90g",c:"Films VCI anticorrosion",i:'fa-box',h:'pages/produits/papier-kraft-vci-90g/index.html'},
  {t:"Pince de cerclage manuelle PP",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/pince-cerclage-manuelle/index.html'},
  {t:"Plateau tournant manuel pour banderolage",c:"Film et palettisation",i:'fa-box',h:'pages/produits/plateau-tournant-manuel/index.html'},
  {t:"Pochette matelassée B5",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/pochette-matelassee-b5/index.html'},
  {t:"Pochette porte-documents C4 adhésive",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/porte-documents-adhesif-c4/index.html'},
  {t:"Pochette porte-documents C5 adhésive",c:"Etiquettes / porte-documents",i:'fa-box',h:'pages/produits/porte-documents-adhesif-c5/index.html'},
  {t:"Rolls plateau roulant 400kg",c:"Manutention et logistique",i:'fa-box',h:'pages/produits/rolls-plateau-roulant/index.html'},
  {t:"Ruban double face 50mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-double-face-50mm/index.html'},
  {t:"Ruban kraft gommé 70mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-kraft-gomme-70mm/index.html'},
  {t:"Ruban kraft papier personnalisé",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-kraft-papier-personnalise/index.html'},
  {t:"Ruban adhésif large 75mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-large-75mm/index.html'},
  {t:"Ruban PP acrylique 48mm beige",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-pp-acrylique-48mm-beige/index.html'},
  {t:"Ruban PP acrylique 48mm transparent",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-pp-acrylique-48mm-transparent/index.html'},
  {t:"Ruban PP hot melt 48mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-pp-hot-melt-48mm/index.html'},
  {t:"Ruban PP solvant 48mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-pp-solvant-48mm/index.html'},
  {t:"Ruban PVC premium 50mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-pvc-premium-50mm/index.html'},
  {t:"Ruban de signalisation 50mm",c:"Rubans adhésifs",i:'fa-box',h:'pages/produits/ruban-signalisation-50mm/index.html'},
  {t:"Sac kraft papier SOS",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sac-kraft-sos/index.html'},
  {t:"Sac PE gaine en rouleau",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sac-pe-gaine-rouleau/index.html'},
  {t:"Sac PE noir opaque",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sac-pe-noir-opaque/index.html'},
  {t:"Sac PE renforcé 100µ",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sac-pe-renforce-100my/index.html'},
  {t:"Sac PE transparent 50µ",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sac-pe-transparent-50my/index.html'},
  {t:"Sac zip PE refermable",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sac-zipper-pe/index.html'},
  {t:"Sachet à bulles 145x215mm",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sachet-bulle-145x215/index.html'},
  {t:"Sachet zip VCI 200x300mm",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sachet-zip-vci-200x300/index.html'},
  {t:"Sachet zip VCI 400x600mm",c:"Sacs en plastique",i:'fa-box',h:'pages/produits/sachet-zip-vci-400x600/index.html'},
  {t:"SPK 1600 — Cercleuse de table",c:"Cercleuses",i:'fa-box',h:'pages/produits/spk-1600-cercleuse-de-table/index.html'},
  {t:"SPK 1650 — Cercleuse de table semi-automatique",c:"Cercleuses de table",i:'fa-box',h:'pages/produits/spk-1650/index.html'},
  {t:"SPK 1700 Air — Cercleuse de table pneumatique",c:"Cercleuses de table",i:'fa-box',h:'pages/produits/spk-1700-air/index.html'},
  {t:"SPK 1800 Pro — Cercleuse de table professionnelle renforcée",c:"Cercleuses de table",i:'fa-box',h:'pages/produits/spk-1800-pro/index.html'},
  {t:"SPK 2200 — Cercleuse semi-automatique",c:"Cercleuses",i:'fa-box',h:'pages/produits/spk-2200-cercleuse-semi-automatique/index.html'},
  {t:"SPK 3600 — Cercleuse automatique",c:"Cercleuses",i:'fa-box',h:'pages/produits/spk-3600-cercleuse-automatique/index.html'},
  {t:"SPK 7005 — Machine de remplissage coussins d'air",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-7005/index.html'},
  {t:"SPK 7010 Plus — Machine remplissage air grande capacité",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-7010-plus/index.html'},
  {t:"SPK A-3000 — Cercleuse automatique en ligne",c:"Cercleuses automatiques",i:'fa-box',h:'pages/produits/spk-a-3000/index.html'},
  {t:"SPK A-5000 — Cercleuse automatique haute cadence",c:"Cercleuses automatiques",i:'fa-box',h:'pages/produits/spk-a-5000/index.html'},
  {t:"SPK A-6000 PET — Cercleuse automatique PET industrielle",c:"Cercleuses automatiques",i:'fa-box',h:'pages/produits/spk-a-6000-pet/index.html'},
  {t:"SPK Acier M200 — Cercleuse manuelle feuillard acier",c:"Cercleuses manuelles à batterie",i:'fa-box',h:'pages/produits/spk-acier-m200/index.html'},
  {t:"SPK ARM — Banderoleuse bras tournant",c:"Banderoleuses",i:'fa-box',h:'pages/produits/spk-arm-banderoleuse-bras-tournant/index.html'},
  {t:"SPK BS-100 — Ensacheuse de sacs plats semi-auto",c:"Ensacheuses",i:'fa-box',h:'pages/produits/spk-bs-100/index.html'},
  {t:"SPK Combi 2 — Cerclage double tête automatique",c:"Cercleuses automatiques",i:'fa-box',h:'pages/produits/spk-combi-2/index.html'},
  {t:"SPK Compact 100 — Mini banderoleuse compacte",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-compact-100/index.html'},
  {t:"SPK eCover — Système de couverture de palettes",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-ecover/index.html'},
  {t:"SPK EVO+ — Cercleuse manuelle à batterie renforcée",c:"Cercleuses manuelles à batterie",i:'fa-box',h:'pages/produits/spk-evo/index.html'},
  {t:"SPK EVO — Cercleuse batterie lithium",c:"Cercleuses",i:'fa-box',h:'pages/produits/spk-evo-cercleuse-batterie-lithium/index.html'},
  {t:"SPK Fanfold — Système calage papier fanfold",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-fanfold/index.html'},
  {t:"SPK FC-200 — Formeuse de cartons semi-automatique",c:"Formeuses de cartons",i:'fa-box',h:'pages/produits/spk-fc-200/index.html'},
  {t:"SPK FC-350 Auto — Formeuse de cartons automatique",c:"Formeuses de cartons",i:'fa-box',h:'pages/produits/spk-fc-350-auto/index.html'},
  {t:"SPK FC-500 — Formeuse haute cadence",c:"Formeuses de cartons",i:'fa-box',h:'pages/produits/spk-fc-500/index.html'},
  {t:"SPK FE-150 Manuel — Fermeuse manuelle à ruban",c:"Fermeuses de cartons",i:'fa-box',h:'pages/produits/spk-fe-150-manuel/index.html'},
  {t:"SPK FE-200 — Fermeuse de cartons scotcheuse",c:"Fermeuses de cartons",i:'fa-box',h:'pages/produits/spk-fe-200/index.html'},
  {t:"SPK FE-220 Gommé — Fermeuse papier gommé humecté",c:"Fermeuses de cartons",i:'fa-box',h:'pages/produits/spk-fe-220-gomme/index.html'},
  {t:"SPK FE-300 HM — Fermeuse hot melt automatique",c:"Fermeuses de cartons",i:'fa-box',h:'pages/produits/spk-fe-300-hm/index.html'},
  {t:"SPK FE-400 Combi — Fermeuse combinée ruban + hot melt",c:"Fermeuses de cartons",i:'fa-box',h:'pages/produits/spk-fe-400-combi/index.html'},
  {t:"SPK Flowpack 500 — Ensacheuse flowpack automatique",c:"Ensacheuses",i:'fa-box',h:'pages/produits/spk-flowpack-500/index.html'},
  {t:"SPK Foam-200 — Machine découpe mousse PE",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-foam-200/index.html'},
  {t:"SPK H-150 Compact — Banderoleuse horizontale compacte",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-h-150-compact/index.html'},
  {t:"SPK H-200 — Banderoleuse horizontale semi-automatique",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-h-200/index.html'},
  {t:"SPK H-250 Baggage — Banderoleuse de bagages",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-h-250-baggage/index.html'},
  {t:"SPK H-350 — Banderoleuse horizontale automatique",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-h-350/index.html'},
  {t:"SPK H-500 — Banderoleuse horizontale haute capacité",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-h-500/index.html'},
  {t:"SPK H-800 Industrial — Banderoleuse horizontale industrielle",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-h-800-industrial/index.html'},
  {t:"SPK Horizontal — Banderoleuse horizontale",c:"Banderoleuses",i:'fa-box',h:'pages/produits/spk-horizontal-banderoleuse/index.html'},
  {t:"SPK HS-300 — Ensacheuse horizontale HFFS",c:"Ensacheuses",i:'fa-box',h:'pages/produits/spk-hs-300/index.html'},
  {t:"SPK Macroplat — Système de fabrication film macroperforé",c:"Banderoleuses horizontales",i:'fa-box',h:'pages/produits/spk-macroplat/index.html'},
  {t:"SPK Orbital 400 — Banderoleuse à bras tournant semi-automatique",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-orbital-400/index.html'},
  {t:"SPK Orbital 600 — Banderoleuse à bras tournant automatique",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-orbital-600/index.html'},
  {t:"SPK Palettiseur 1 — Palettiseur automatique de cartons",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-palettiseur-1/index.html'},
  {t:"SPK Palettiseur 2 — Robot palettiseur 6 axes",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-palettiseur-2/index.html'},
  {t:"SPK Paper Fill — Machine de remplissage papier kraft",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-paper-fill/index.html'},
  {t:"SPK Pneumatique P100 — Cercleuse manuelle pneumatique",c:"Cercleuses manuelles à batterie",i:'fa-box',h:'pages/produits/spk-pneumatique-p100/index.html'},
  {t:"SPK R-310 — Banderoleuse semi-automatique à plateau tournant",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-r-310/index.html'},
  {t:"SPK R-320 — Banderoleuse semi-automatique plateau tournant renforcée",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-r-320/index.html'},
  {t:"SPK R-500 Auto — Banderoleuse automatique plateau tournant",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-r-500-auto/index.html'},
  {t:"SPK R-700 Auto — Banderoleuse automatique haute cadence",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-r-700-auto/index.html'},
  {t:"SPK Ring 2000 — Banderoleuse anneau tournant horizontale-verticale",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-ring-2000/index.html'},
  {t:"SPK Robot Cercleuse — Robot de cerclage mobile",c:"Cercleuses automatiques",i:'fa-box',h:'pages/produits/spk-robot-cercleuse/index.html'},
  {t:"SPK Robot Connect — Robot banderoleuse connecté SPK Connect",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-robot-connect/index.html'},
  {t:"SPK Robot EVO — Robot banderoleuse de palettes manuel",c:"Banderoleuses de palettes",i:'fa-box',h:'pages/produits/spk-robot-evo/index.html'},
  {t:"SPK Rotate — Banderoleuse plateau tournant",c:"Banderoleuses",i:'fa-box',h:'pages/produits/spk-rotate-banderoleuse-plateau-tournant/index.html'},
  {t:"SPK TF-150 Compact — Thermofilmeuse compacte de table",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-150-compact/index.html'},
  {t:"SPK TF-200 I-bar — Thermofilmeuse I-bar manuelle",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-200-i-bar/index.html'},
  {t:"SPK TF-300 L — Thermofilmeuse L-bar semi-automatique",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-300-l/index.html'},
  {t:"SPK TF-350 Side-Seal — Thermofilmeuse latérale automatique",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-350-side-seal/index.html'},
  {t:"SPK TF-400 L — Thermofilmeuse L-bar professionnelle",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-400-l/index.html'},
  {t:"SPK TF-500 Auto — Thermofilmeuse automatique",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-500-auto/index.html'},
  {t:"SPK TF-600 Flow — Thermofilmeuse flowpack horizontal",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-600-flow/index.html'},
  {t:"SPK TF-700 Auto — Thermofilmeuse automatique haute cadence",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-700-auto/index.html'},
  {t:"SPK TF-800 Tunnel — Tunnel de rétraction seul",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-800-tunnel/index.html'},
  {t:"SPK TF-900 Coex — Thermofilmeuse film coextrudé alimentaire",c:"Thermofilmeuses",i:'fa-box',h:'pages/produits/spk-tf-900-coex/index.html'},
  {t:"SPK Tray-100 — Formeuse de plateaux",c:"Formeuses de cartons",i:'fa-box',h:'pages/produits/spk-tray-100/index.html'},
  {t:"SPK Void-Fill — Machine remplissage vide-d'air continu",c:"Remplissage et protection",i:'fa-box',h:'pages/produits/spk-void-fill/index.html'},
  {t:"SPK VS-200 — Ensacheuse verticale VFFS semi-automatique",c:"Ensacheuses",i:'fa-box',h:'pages/produits/spk-vs-200/index.html'},
  {t:"SPK VS-400 Auto — Ensacheuse verticale automatique",c:"Ensacheuses",i:'fa-box',h:'pages/produits/spk-vs-400-auto/index.html'},
  {t:"SPK Zip-200 — Ensacheuse sacs ZIP refermables",c:"Ensacheuses",i:'fa-box',h:'pages/produits/spk-zip-200/index.html'},
  {t:"Table élévatrice 500kg",c:"Manutention et logistique",i:'fa-box',h:'pages/produits/table-elevatrice-500kg/index.html'},
  {t:"Tendeur feuillard manuel",c:"Feuillard et accessoires",i:'fa-box',h:'pages/produits/tendeur-feuillard-manuel/index.html'},
  {t:"Transpalette manuel 2500kg",c:"Manutention et logistique",i:'fa-box',h:'pages/produits/transpalette-manuel-2500kg/index.html'},
  {t:"Transpalette peseur 2500kg",c:"Manutention et logistique",i:'fa-box',h:'pages/produits/transpalette-peseur-2500kg/index.html'},
  {t:"Viapack Line 100 — Ligne d'emballage complète e-commerce",c:"Lignes automatiques",i:'fa-box',h:'pages/produits/viapack-line-100/index.html'},
  {t:"Viapack Line 200 — Ligne automatique industrielle",c:"Lignes automatiques",i:'fa-box',h:'pages/produits/viapack-line-200/index.html'},

];

/* ==========================================
   SEARCH
   ========================================== */
(function(){
  /* ---- ROOT PREFIX (works at any folder depth) ---- */
  var cssLink=document.querySelector('link[href$="css/style.css"]');
  var ROOT_PREFIX=cssLink?cssLink.getAttribute('href').replace(/css\/style\.css$/,''):'';

  /* ---- SEARCH ---- */
  var overlay=document.getElementById('search-overlay');
  var inp=document.getElementById('search-input');
  var results=document.getElementById('search-results');
  var popTags=document.getElementById('search-pop-tags');

  var POPULAR=['pages/machines/cercleuses/index.html','pages/machines/banderoleuses/index.html','pages/materiel/film-palettisation/index.html','pages/materiel/anticorrosion/index.html','pages/materiel/rubans/index.html','pages/machines/hot-melt.html'];
  if(popTags){
    popTags.innerHTML=POPULAR.map(function(h){
      var p=SEARCH_DATA.find(function(d){return d.h===h;});
      return p?'<a href="'+ROOT_PREFIX+p.h+'">'+p.t+'</a>':'';
    }).join('');
  }

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
    if(e.key==='Escape'){closeSearch();}
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch();}
  });

  inp&&inp.addEventListener('input',function(){
    var q=this.value.trim().toLowerCase();
    if(!q||q.length<2){results.innerHTML='';return;}
    var matches=SEARCH_DATA.filter(function(p){return p.t.toLowerCase().includes(q)||p.c.toLowerCase().includes(q);}).slice(0,8);
    if(!matches.length){results.innerHTML='<p class="search-hint-txt">Aucun résultat pour "'+inp.value+'"</p>';return;}
    results.innerHTML=matches.map(function(p){
      return '<a href="'+ROOT_PREFIX+p.h+'" class="sr-item"><div class="sr-icon"><i class="fa '+p.i+'"></i></div><div class="sr-info"><strong>'+p.t+'</strong><span>'+p.c+'</span></div><span class="sr-badge">'+p.c+'</span></a>';
    }).join('');
  });

})();
