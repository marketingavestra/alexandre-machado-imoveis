// Nav scroll behavior
const nav = document.getElementById('nav');
if (nav) {
  const solidPages = ['imoveis.html', 'sobre.html', 'contato.html', 'imovel.html'];
  const isSolidPage = solidPages.some(p => window.location.pathname.includes(p));
  if (isSolidPage) nav.classList.add('solid');

  window.addEventListener('scroll', () => {
    if (!isSolidPage) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
  });
}

// Gallery thumbnails (property detail page)
const galleryMain = document.querySelector('.gallery-main img');
const thumbs = document.querySelectorAll('.gallery-thumb');
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    if (galleryMain) galleryMain.src = thumb.querySelector('img').src;
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

// Contact form — redirect to WhatsApp
const contactFormEl = document.getElementById('contact-form');
if (contactFormEl) {
  contactFormEl.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactFormEl.querySelector('[name="nome"]')?.value || '';
    const phone = contactFormEl.querySelector('[name="telefone"]')?.value || '';
    const interest = contactFormEl.querySelector('[name="interesse"]')?.value || '';
    const msg = encodeURIComponent(`Olá Alexandre! Meu nome é ${name}${phone ? ', meu telefone é ' + phone : ''}. Tenho interesse em: ${interest || 'imóveis de alto padrão'}.`);
    window.open(`https://wa.me/5521970327148?text=${msg}`, '_blank');
  });
}

// GSAP Animations (elements start visible in CSS — no opacity:0 in CSS)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero
  const heroLabel = document.querySelector('.hero-label');
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-sub');
  const heroCta = document.querySelector('.hero-cta');
  if (heroLabel) gsap.from(heroLabel, { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 });
  if (heroTitle) gsap.from(heroTitle, { y: 30, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.5 });
  if (heroSub) gsap.from(heroSub, { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 });
  if (heroCta) gsap.from(heroCta, { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 1.0 });

  // Scroll-triggered sections
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  gsap.utils.toArray('.property-card').forEach((card, i) => {
    gsap.from(card, { y: 40, opacity: 0, duration: 0.65, ease: 'power2.out', delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });

  gsap.utils.toArray('.region-card').forEach((card, i) => {
    gsap.from(card, { y: 35, opacity: 0, duration: 0.65, ease: 'power2.out', delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });

  const aboutContent = document.querySelector('.about-content, .about-page-content');
  if (aboutContent) {
    gsap.from(aboutContent.children, { y: 25, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08,
      scrollTrigger: { trigger: aboutContent, start: 'top 82%', once: true } });
  }

  const ctaContent = document.querySelector('.cta-banner-content');
  if (ctaContent) {
    gsap.from(ctaContent.children, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: ctaContent, start: 'top 78%', once: true } });
  }

  const detailMain = document.querySelector('.detail-main > *');
  if (detailMain) {
    gsap.from('.detail-main > *', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 });
    gsap.from('.detail-sidebar', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 });
  }
});
