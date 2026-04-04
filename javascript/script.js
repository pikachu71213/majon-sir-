// ─── NAVBAR SCROLL ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── NAV MOBILE MENU ───
function syncBodyScroll() {
  const enrollOpen = document.getElementById('enrollPopup')?.classList.contains('show');
  const menuOpen = document.getElementById('navLinks')?.classList.contains('open');
  document.body.style.overflow = enrollOpen || menuOpen ? 'hidden' : '';
  document.body.classList.toggle('nav-menu-open', !!menuOpen);
  const overlay = document.getElementById('navOverlay');
  if (overlay) overlay.setAttribute('aria-hidden', menuOpen ? 'false' : 'true');
  const hb = document.getElementById('hamburger');
  if (hb) {
    hb.classList.toggle('is-open', !!menuOpen);
    hb.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    hb.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
  }
}
function toggleMenu() {
  const ul = document.getElementById('navLinks');
  if (!ul) return;
  ul.classList.toggle('open');
  syncBodyScroll();
}
function closeMenu() {
  const ul = document.getElementById('navLinks');
  if (!ul || !ul.classList.contains('open')) return;
  ul.classList.remove('open');
  syncBodyScroll();
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

// ─── COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const inc = target / 60;
    const timer = setInterval(() => {
      count += inc;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = Math.floor(count) + (el.textContent.includes('+') || target > 10 ? '+' : '');
    }, 30);
  });
}
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
  }, { threshold: 0.5 });
  statsObs.observe(statsBar);
}

// ─── TILT EFFECT ───
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.tilt').forEach(card => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 1.5) {
      card.style.transform = `perspective(800px) rotateY(${dx*5}deg) rotateX(${-dy*5}deg) translateZ(4px)`;
    } else {
      card.style.transform = '';
    }
  });
});

// ─── WHATSAPP ───
function openWhatsApp() {
  const msg = encodeURIComponent("Hi, I am interested in your course at HIAT Institute Bhiwani.");
  window.open(`https://wa.me/919034883741?text=${msg}`, '_blank');
}

// ─── WA POPUP ───
setTimeout(() => {
  const popup = document.getElementById('waPopup');
  if (popup) popup.classList.add('show');
}, 6000);

// ─── ENROLL POPUP ───
function openEnroll() {
  document.getElementById('enrollPopup').classList.add('show');
  syncBodyScroll();
}
function closeEnroll() {
  document.getElementById('enrollPopup').classList.remove('show');
  syncBodyScroll();
}
document.addEventListener('DOMContentLoaded', () => {
  const ep = document.getElementById('enrollPopup');
  if (ep) {
    ep.addEventListener('click', function(e) {
      if (e.target === this) closeEnroll();
    });
  }
  document.getElementById('navOverlay')?.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => closeMenu());
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('enrollPopup')?.classList.contains('show')) closeEnroll();
    else closeMenu();
  });
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900) closeMenu();
    }, 120);
  });
});

// ─── FORM SUBMIT ───
function submitEnroll() {
  const name = document.getElementById('ep-name').value.trim();
  const phone = document.getElementById('ep-phone').value.trim();
  if (!name || !phone) { showToast('⚠️ Please fill in name and phone'); return; }
  closeEnroll();
  showToast('✅ Enrollment received! We\'ll call you soon.');
  const msg = encodeURIComponent(`Hi, I want to enroll at HIAT. Name: ${name}, Phone: ${phone}`);
  setTimeout(() => window.open(`https://wa.me/919034883741?text=${msg}`, '_blank'), 500);
}
function submitContactForm() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { showToast('⚠️ Please fill in name and phone'); return; }
  showToast('✅ Inquiry sent! We\'ll contact you shortly.');
  const course = document.getElementById('cf-course').value;
  const msg = document.getElementById('cf-msg').value;
  const wa = encodeURIComponent(`Hi HIAT, I'm ${name} (${phone}). Course: ${course}. ${msg}`);
  setTimeout(() => window.open(`https://wa.me/919034883741?text=${wa}`, '_blank'), 500);
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── FAQ ───
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const allQ = document.querySelectorAll('.faq-q');
  const allA = document.querySelectorAll('.faq-a');
  allQ.forEach(q => { if (q !== el) q.classList.remove('open'); });
  allA.forEach(a => { if (a !== answer) a.classList.remove('open'); });
  el.classList.toggle('open');
  answer.classList.toggle('open');
}

// ─── SET ACTIVE NAV LINK ───
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
});
