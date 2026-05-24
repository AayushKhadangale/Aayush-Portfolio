/* ═══════════════════════════════════════════════════════════════
   AAYUSH KHADANGALE – PORTFOLIO · main.js  (Enhanced v2)
   Theme Toggle · Scroll Progress · Typed Effect · All Animations
═══════════════════════════════════════════════════════════════ */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── Page Load Fade ─────────────────────────────────────────── */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  window.addEventListener('load', () => {
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
  });
})();

/* ─── 1. Theme Toggle ────────────────────────────────────────── */
(function initTheme() {
  const btn  = $('#themeToggle');
  const root = document.documentElement;

  // Detect system preference, then check localStorage
  const systemPref  = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const storedTheme = localStorage.getItem('ak-theme');
  const initial     = storedTheme || systemPref;

  root.setAttribute('data-theme', initial);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ak-theme', theme);
    // Update canvas bg based on theme
    document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  btn && btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Listen for OS-level theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('ak-theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
})();

/* ─── 2. Scroll Progress Bar ─────────────────────────────────── */
(function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const docH   = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ─── 3. Custom Cursor ───────────────────────────────────────── */
(function initCursor() {
  const cursor   = $('#cursor');
  const follower = $('#cursorFollower');
  if (!cursor || !follower || window.matchMedia('(hover: none)').matches) return;

  let mx = -200, my = -200;
  let fx = -200, fy = -200;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animFollower() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    rafId = requestAnimationFrame(animFollower);
  }
  animFollower();

  $$('a, button, .project-card, .skill-category, .cert-card, .contact-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width  = '54px';
      follower.style.height = '54px';
      follower.style.borderColor = 'rgba(201,169,110,0.8)';
      cursor.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width  = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(201,169,110,0.5)';
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
})();

/* ─── 4. Navbar ──────────────────────────────────────────────── */
(function initNavbar() {
  const nav       = $('#navbar');
  const hamburger = $('#hamburger');
  const menu      = $('#mobileMenu');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger && hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    menu && menu.classList.toggle('open', open);
  });

  $$('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      menu && menu.classList.remove('open');
    });
  });

  // Active nav on scroll
  const sections = $$('section[id]');
  const navLinks  = $$('.nav-links a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
})();

/* ─── 5. Scroll Reveal ───────────────────────────────────────── */
(function initReveal() {
  const els = $$('.reveal-up, .reveal-right');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));

  window.addEventListener('load', () => {
    setTimeout(() => {
      $$('#hero .reveal-up, #hero .reveal-right').forEach(el => el.classList.add('visible'));
    }, 150);
  });
})();

/* ─── 6. Typed Text Effect (Hero Name) ──────────────────────── */
(function initTyped() {
  const el = $('.typed-text');
  if (!el) return;

  const text  = el.getAttribute('data-text') || el.textContent;
  el.textContent = '';
  let i = 0;
  let started = false;

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, 80 + Math.random() * 40);
    } else {
      el.classList.add('done'); // hide cursor
    }
  }

  // Start after page loads + short delay
  window.addEventListener('load', () => {
    setTimeout(() => { type(); }, 600);
  });
})();

/* ─── 7. Ambient Canvas Background ──────────────────────────── */
(function initCanvas() {
  const canvas = $('#bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const rings = [
    { x: 0.82, y: 0.12, r: 310, speed: 0.0003, phase: 0   },
    { x: 0.1,  y: 0.72, r: 250, speed: 0.0004, phase: 1.5 },
    { x: 0.6,  y: 0.88, r: 195, speed: 0.0005, phase: 3   },
    { x: 0.95, y: 0.45, r: 175, speed: 0.0002, phase: 4.5 },
    { x: 0.05, y: 0.22, r: 135, speed: 0.0006, phase: 0.8 },
  ];

  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.00012,
    vy: (Math.random() - 0.5) * 0.00012,
    a: Math.random() * 0.3 + 0.05,
  }));

  let t = 0;
  let isLight = document.documentElement.getAttribute('data-theme') === 'light';

  document.addEventListener('themechange', e => { isLight = e.detail === 'light'; });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;

    const ringAlpha = isLight ? '0.06' : '0.04';
    const particleAlpha = isLight ? 0.18 : 0.32;

    rings.forEach(ring => {
      const x = ring.x * W;
      const y = ring.y * H;
      const angle = ring.phase + t * ring.speed;
      const rx = x + Math.cos(angle) * 25;
      const ry = y + Math.sin(angle) * 25;

      ctx.beginPath();
      ctx.arc(rx, ry, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,169,110,${ringAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rx, ry, ring.r * 0.62, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,169,110,${parseFloat(ringAlpha) * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,169,110,${p.a * particleAlpha / 0.3})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── 8. Smooth Scroll ───────────────────────────────────────── */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ─── 9. Profile Image Fallback ──────────────────────────────── */
(function initProfileImage() {
  const img = $('#profileImg');
  if (!img) return;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const fallback = img.nextElementSibling;
    if (fallback) fallback.style.display = 'flex';
  });
  // Try to load from multiple paths
  const paths = ['assets/AayushIMG.png', 'AayushIMG.png', 'profile.jpg', 'assets/profile.jpg'];
  let pathIndex = 0;

  function tryNext() {
    if (pathIndex < paths.length) {
      img.src = paths[pathIndex++];
    }
  }
  img.addEventListener('error', tryNext);
  tryNext();
})();

/* ─── 10. 3D Card Tilt ───────────────────────────────────────── */
(function initTilt() {
  const cards = $$('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    card.addEventListener('touchstart', () => {}, { passive: true }); // prevent delay on mobile
  });
})();

/* ─── 11. Counter Animation ──────────────────────────────────── */
(function initCounters() {
  const stats = $$('.stat-number');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;
      io.unobserve(el);

      let start = 0;
      const duration = 1400;
      const step = ts => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const val  = num * easeOut(prog);
        el.textContent = (Number.isInteger(num) ? Math.round(val) : val.toFixed(1)) + suffix;
        if (prog < 1) requestAnimationFrame(step);
        else el.textContent = raw; // ensure exact final value
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => io.observe(s));
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
})();

/* ─── 12. Stagger Skill Tags on Hover ────────────────────────── */
(function initTagStagger() {
  $$('.skill-category').forEach(cat => {
    const tags = $$('.tag', cat);
    cat.addEventListener('mouseenter', () => {
      tags.forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 30}ms`;
      });
    });
    cat.addEventListener('mouseleave', () => {
      tags.forEach(tag => { tag.style.transitionDelay = '0ms'; });
    });
  });
})();