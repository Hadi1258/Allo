
(() => {
  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const down = y > lastY && y > 24;
    header && header.classList.toggle('is-hidden', down);
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if(!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, {passive:true});

  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'light' || saved === 'dark'){ root.setAttribute('data-theme', saved); }
  const btn = document.querySelector('[data-theme-toggle]');
  btn && btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const menuBtn = document.querySelector('[data-menu]');
  const nav = document.querySelector('.navlinks');
  menuBtn && menuBtn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
})();


// Floating WhatsApp button
(function(){
  const waNumber = localStorage.getItem('wa_number') || '000000000';
  const waMsg = encodeURIComponent('Hi I have a quick question');
  const waBtn = document.createElement('a');
  waBtn.href = `https://wa.me/${waNumber}?text=${waMsg}`;
  waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  waBtn.className = 'wa-float';
  waBtn.innerHTML = '<span class="wa-bubble">WA</span>';
  document.body.appendChild(waBtn);

  let prev = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    waBtn.style.opacity = (y > prev && y > 24) ? '0' : '1';
    prev = y;
  }, {passive:true});
})();


// init theme fix
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'light' || saved === 'dark'){
    root.setAttribute('data-theme', saved);
  }else{
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  const btn = document.querySelector('[data-theme-toggle]');
  if(btn){
    btn.style.display = 'inline-flex';
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
})();
