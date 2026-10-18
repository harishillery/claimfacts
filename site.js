/* ============================================================
   ClaimFacts — shared behavior
   ============================================================ */

(function(){
  var CFG    = window.CLAIMFACTS || {};
  var STRIPE = CFG.stripe || {};
  var $      = function(id){ return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function money(n){ return '$' + Math.round(n).toLocaleString('en-US'); }

  /* active nav link */
  (function(){
    var page = document.body.dataset.page;
    if(!page) return;
    document.querySelectorAll('.navlinks a.txt').forEach(function(a){
      if(a.dataset.nav === page) a.setAttribute('aria-current','page');
    });
  })();

  /* photo fallback to initials if the image is missing */
  document.querySelectorAll('[data-photo]').forEach(function(img){
    img.addEventListener('error', function(){
      img.style.display = 'none';
      var fb = img.nextElementSibling;
      if(fb && fb.classList.contains('avatar-fallback')) fb.style.display = 'flex';
      if(fb && fb.classList.contains('portrait-fallback')) fb.style.display = 'flex';
    });
  });

  /* hero specimen */
  (function(){
    var tagWrap = $('tags');
    if(!tagWrap) return;
    var flags = [].slice.call(document.querySelectorAll('.flag'));
    var count = 0, label = $('speccount');

    flags.forEach(function(f){
      var t = document.createElement('span');
      t.className = 'tag' + (f.dataset.lvl === 'major' ? ' lvl-major' : '');
      t.textContent = f.dataset.tag;
      tagWrap.appendChild(t);
      f._tag = t;
    });

    function light(i){
      var f = flags[i]; if(!f) return;
      f.classList.add('is-on');
      if(f.dataset.lvl === 'major') f.classList.add('lvl-major');
      f._tag.classList.add('is-on');
      count++;
      if(label) label.textContent = count + (count === 1 ? ' problem found' : ' problems found');
    }

    if(reduce){ flags.forEach(function(_,i){ light(i); }); }
    else { flags.forEach(function(_,i){ setTimeout(function(){ light(i); }, 600 + i*520); }); }
  })();

  /* hero capture -> contact page */
  (function(){
    var go = $('capgo'), field = $('capurl');
    if(!go || !field) return;
    function send(){
      var u = field.value.trim();
      window.location.href = 'contact.html' + (u ? '?url=' + encodeURIComponent(u) : '');
    }
    go.addEventListener('click', send);
    field.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){ e.preventDefault(); send(); }
    });
  })();

  /* ad-spend calculator */
  (function(){
    var spend = $('spend'), range = $('spendrange');
    if(!spend || !range) return;

    var TIERS = [
      {key:'standing',  name:'Standing Review', monthly:2000,  max:1500},
      {key:'scale',     name:'Scale',           monthly:7000,  max:6000},
      {key:'portfolio', name:'Portfolio',       monthly:10000, max:Infinity}
    ];

    function calc(){
      var v = Math.max(0, Number(spend.value) || 0);
      var tier = TIERS[TIERS.length - 1];
      for(var i = 0; i < TIERS.length; i++){
        if(v <= TIERS[i].max){ tier = TIERS[i]; break; }
      }

      if($('v-loss'))     $('v-loss').textContent     = money(v * 14);
      if($('v-tiername')) $('v-tiername').textContent = tier.name;
      if($('v-month'))    $('v-month').textContent    = money(tier.monthly);
      if($('v-days'))     $('v-days').textContent     = v > 0 ? (Math.round(tier.monthly / v * 10) / 10) : '—';

      document.querySelectorAll('[data-tier]').forEach(function(card){
        var on = card.dataset.tier === tier.key;
        card.classList.toggle('rec', on);
        var existing = card.querySelector('.recbadge');
        if(on && !existing){
          var b = document.createElement('span');
          b.className = 'badge recbadge';
          b.textContent = 'Fits your spend';
          card.appendChild(b);
        } else if(!on && existing){ existing.remove(); }
      });
    }

    spend.addEventListener('input', function(){
      range.value = Math.min(15000, Math.max(100, this.value || 100));
      calc();
    });
    range.addEventListener('input', function(){ spend.value = this.value; calc(); });
    calc();
  })();

  /* stripe buttons */
  document.querySelectorAll('[data-buy]').forEach(function(a){
    var link = STRIPE[a.dataset.buy];
    if(link){ a.href = link; a.target = '_blank'; a.rel = 'noopener'; }
  });

  /* newsletter signup buttons -> Kit landing page */
  (function(){
    var url = String(CFG.kitLandingPage || '').trim();
    var fallback = 'mailto:' + (CFG.email || '') + '?subject=' +
      encodeURIComponent('Subscribe me to The Substantiation File');
    document.querySelectorAll('[data-signup]').forEach(function(a){
      if(url){ a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
      else { a.href = fallback; }
    });
  })();

  /* inline newsletter form (posts to Kit) */
  (function(){
    var form = $('nlform');
    if(!form) return;
    var note = $('nlnote'), base = note ? note.textContent : '';
    form.addEventListener('submit', function(e){
      var email = form.email_address.value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        e.preventDefault();
        note.textContent = 'That email address does not look complete.';
        form.email_address.focus();
        return;
      }
      if(!window.fetch) return;            /* old browser: plain form post */
      e.preventDefault();
      var btn = form.querySelector('button');
      btn.disabled = true;
      note.textContent = 'Subscribing\u2026';
      fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} })
        .then(function(r){ if(!r.ok) throw new Error(); })
        .then(function(){
          form.reset();
          note.textContent = 'Almost done. Check your inbox to confirm, and Monday\u2019s issue is yours.';
        })
        .catch(function(){ form.submit(); })   /* fall back to Kit's own confirmation page */
        .then(function(){ btn.disabled = false; });
    });
  })();

  /* footer social icons (icons from the Simple Icons library) */
  (function(){
    var box = $('social'), links = CFG.social || {};
    if(!box) return;
    var NAMES = {instagram:'Instagram', tiktok:'TikTok', threads:'Threads', x:'X', bluesky:'Bluesky', substack:'Substack', linkedin:'LinkedIn'};
    Object.keys(NAMES).forEach(function(k){
      var url = String(links[k] || '').trim();
      if(!url) return;
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', 'ClaimFacts on ' + NAMES[k]);
      var img = document.createElement('img');
      img.src = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/' + k + '.svg';
      img.alt = ''; img.width = 20; img.height = 20;
      a.appendChild(img);
      box.appendChild(a);
    });
    if(!box.children.length) box.style.display = 'none';
  })();

  /* footer email */
  (function(){
    var fm = $('footmail');
    if(fm && CFG.email){ fm.href = 'mailto:' + CFG.email; fm.textContent = CFG.email; }
  })();

  /* booking form */
  (function(){
    var form = $('bookform');
    if(!form) return;
    var note = $('formnote');

    var params = new URLSearchParams(window.location.search);
    if(params.get('url'))  form.url.value = params.get('url');
    if(params.get('tier')){
      var want = params.get('tier');
      [].slice.call(form.tier.options).forEach(function(o){
        if(o.value.toLowerCase().indexOf(want.toLowerCase()) === 0) form.tier.value = o.value;
      });
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var d = {
        name:    form.name.value.trim(),
        email:   form.email.value.trim(),
        brand:   form.brand.value.trim(),
        url:     form.url.value.trim(),
        tier:    form.tier.value,
        message: form.message.value.trim()
      };

      if(CFG.formEndpoint){
        note.textContent = 'Sending…';
        fetch(CFG.formEndpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify(d)
        }).then(function(r){
          if(!r.ok) throw new Error();
          form.reset();
          note.textContent = 'Got it. We will get back to you within two business days.';
        }).catch(function(){
          note.textContent = 'That did not send. Email ' + CFG.email + ' directly and we will pick it up.';
        });
        return;
      }

      var body = 'Name: ' + d.name + '\nBrand: ' + d.brand + '\nPage: ' + d.url +
                 '\nInterested in: ' + d.tier + '\n\n' + d.message;
      window.location.href = 'mailto:' + (CFG.email || '') +
        '?subject=' + encodeURIComponent('Claim review request — ' + d.brand) +
        '&body=' + encodeURIComponent(body);
      note.textContent = 'Your email app should be opening. If it did not, write to ' + CFG.email + '.';
    });
  })();

})();
