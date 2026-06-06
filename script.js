/* ══════════════════════════════════════════════════════
   SHREYAS NANDI — PORTFOLIO v2
   Advanced animations & interactions
══════════════════════════════════════════════════════ */

// ── Cursor glow follow ──
const glow = document.getElementById('cursorGlow');
if (glow && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  lastScroll = y;
});

// ── Mobile menu ──
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ── Counter animation ──
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ── Scroll reveal with stagger ──
function setupReveal() {
  // Auto-classify elements
  const revealMap = [
    { sel: '.about-left', cls: 'reveal-left' },
    { sel: '.terminal-card', cls: 'reveal-right' },
    { sel: '.contact-left', cls: 'reveal-left' },
    { sel: '.contact-right', cls: 'reveal-right' },
    { sel: '.project-showcase', cls: 'reveal-scale' },
    { sel: '.arch-diagram', cls: 'reveal' },
    { sel: '.section-title', cls: 'reveal' },
    { sel: '.section-desc', cls: 'reveal' },
  ];

  revealMap.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale')) {
        el.classList.add(cls);
      }
    });
  });

  // Stagger grids
  document.querySelectorAll('.tech-grid, .features-grid, .skills-columns, .arch-services').forEach(grid => {
    grid.classList.add('reveal', 'stagger-children');
    Array.from(grid.children).forEach(child => child.classList.add('reveal'));
  });

  // Contact rows
  document.querySelectorAll('.contact-row').forEach(el => el.classList.add('reveal'));

  // Observe
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger counters when hero metrics appear
        if (entry.target.closest && entry.target.closest('.hero-metrics')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));

  // Also observe hero-metrics
  const metrics = document.querySelector('.hero-metrics');
  if (metrics) {
    metrics.classList.add('reveal');
    observer.observe(metrics);
  }
}

setupReveal();

// ── Trigger counter on first paint for hero ──
const heroMetricsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(animateCounters, 1300); // after hero animations
      heroMetricsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const hm = document.querySelector('.hero-metrics');
if (hm) heroMetricsObs.observe(hm);

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Tilt effect on project showcases ──
if (window.innerWidth > 768) {
  document.querySelectorAll('.project-showcase, .terminal-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Magnetic effect on buttons ──
if (window.innerWidth > 768) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '#4ECDC4';
      } else {
        link.style.color = '';
      }
    }
  });
});
