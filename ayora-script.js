// ─── CURSOR ───────────────────────────────────────────────────────────────────
const cur = document.getElementById('cur'), crng = document.getElementById('crng');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  rx += (mx - rx) * .11; ry += (my - ry) * .11;
  crng.style.left = rx + 'px'; crng.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.fb,.pc-btn,.file-lbl,.pc,.tn-btn,.td').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width = '18px'; cur.style.height = '18px'; crng.style.width = '54px'; crng.style.height = '54px'; crng.style.opacity = '.28'; });
  el.addEventListener('mouseleave', () => { cur.style.width = '9px'; cur.style.height = '9px'; crng.style.width = '34px'; crng.style.height = '34px'; crng.style.opacity = '.5'; });
});

// ─── NAV ──────────────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('s', scrollY > 60));

// ─── PARTICLES ────────────────────────────────────────────────────────────────
const p = document.getElementById('pts');
for (let i = 0; i < 26; i++) {
  const d = document.createElement('div');
  d.className = 'pt';
  d.style.left = Math.random() * 100 + '%';
  d.style.setProperty('--d', (4 + Math.random() * 8) + 's');
  d.style.setProperty('--dl', (Math.random() * 7) + 's');
  p.appendChild(d);
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }), { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// ─── COLLECTION FILTER ────────────────────────────────────────────────────────
document.querySelectorAll('.fb').forEach(btn => btn.addEventListener('click', function () {
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
  this.classList.add('on');
  const f = this.dataset.f;
  document.querySelectorAll('.pc').forEach(c => {
    const show = f === 'all' || c.dataset.cat === f;
    c.style.cssText = 'opacity:' + (show ? '1' : '.2') + ';transform:' + (show ? 'scale(1)' : 'scale(.97)') + ';transition:opacity .45s,transform .45s';
  });
}));

// ─── ORDER FORM → WHATSAPP ────────────────────────────────────────────────────
document.getElementById('oForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name     = this.querySelector('input[type="text"]').value.trim();
  const phone    = this.querySelector('input[type="tel"]').value.trim();
  const email    = this.querySelector('input[type="email"]').value.trim();
  const outfit   = this.querySelector('select').value;
  const details  = this.querySelector('textarea').value.trim();

  let msg = `Hello AYORA Elegance style! 👋\n\nI would like to book an Eid outfit.\n\n`;
  msg += `*Name:* ${name}\n`;
  msg += `*Phone:* ${phone}\n`;
  if (email) msg += `*Email:* ${email}\n`;
  msg += `*Outfit Type:* ${outfit}\n`;
  if (details) msg += `*Details:* ${details}\n`;
  msg += `\nKindly get back to me. Thank you! 🌙✨`;

  const waNumber = '2347011439982';
  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  // Show success message then open WhatsApp
  this.style.display = 'none';
  document.getElementById('fok').style.display = 'block';
  setTimeout(() => window.open(waURL, '_blank'), 600);
});

// ─── FILE LABEL ───────────────────────────────────────────────────────────────
document.getElementById('fi').addEventListener('change', function () {
  if (this.files[0]) {
    const lbl = this.closest('.fg').querySelector('.file-lbl');
    lbl.childNodes[0].textContent = 'Selected: ' + this.files[0].name + ' ';
  }
});

// ─── TESTIMONIALS SLIDER ─────────────────────────────────────────────────────
(function () {
  const track  = document.getElementById('testiTrack');
  const dots   = document.querySelectorAll('.td');
  const cards  = document.querySelectorAll('.tc');
  let current  = 0;
  let perView  = window.innerWidth <= 920 ? 1 : 3;
  const total  = cards.length;
  const maxIdx = Math.max(0, total - perView);

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx));
    const cardW = cards[0].offsetWidth + 24; // gap = 1.5rem ≈ 24px
    track.style.transform = `translateX(-${current * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('on', i === current));
  }

  document.getElementById('tnPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('tnNext').addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  window.addEventListener('resize', () => {
    perView = window.innerWidth <= 920 ? 1 : 3;
    goTo(current);
  });

  // Auto-advance every 5s
  setInterval(() => goTo(current < maxIdx ? current + 1 : 0), 5000);

  goTo(0);
})();