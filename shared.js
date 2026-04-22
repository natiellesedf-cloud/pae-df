// ============================================================
// PAE-DF · NAV + PAGE INTERACTIONS
// ============================================================

// Progress bar
(function progressBar() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Nav dropdowns
(function navDropdowns() {
  const groups = document.querySelectorAll('.nav-group');
  groups.forEach(g => {
    const btn = g.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = g.classList.contains('open');
      groups.forEach(x => x.classList.remove('open'));
      if (!isOpen) g.classList.add('open');
    });
  });
  document.addEventListener('click', () => {
    groups.forEach(g => g.classList.remove('open'));
  });
})();

// Mobile menu
(function mobileMenu() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  if (!nav || !burger) return;
  burger.addEventListener('click', () => nav.classList.toggle('mobile-open'));
})();

// Reveal on scroll
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(e => io.observe(e));
})();

// Timeline interactive (Marco Legal)
(function timeline() {
  const btns = document.querySelectorAll('.tl-years button');
  const panels = document.querySelectorAll('.tl-panel-content');
  if (!btns.length) return;
  btns.forEach(b => {
    b.addEventListener('click', () => {
      const id = b.dataset.year;
      btns.forEach(x => x.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      b.classList.add('active');
      const panel = document.querySelector(`.tl-panel-content[data-year="${id}"]`);
      if (panel) panel.classList.add('active');
    });
  });
})();

// Page-fade navigation (soft transition)
(function pageFade() {
  const links = document.querySelectorAll('a[href$=".html"], a[href="./"], a[href="index.html"]');
  links.forEach(a => {
    const href = a.getAttribute('href');
    // Skip externals, anchors, mailto, etc.
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
    a.addEventListener('click', (e) => {
      // Let cmd/ctrl clicks through
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      document.body.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(-4px)';
      setTimeout(() => { window.location.href = href; }, 180);
    });
  });
})();
