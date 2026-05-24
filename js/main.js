/* ════════════════════════════════════════════
   PORTFOLIO — main.js
   ════════════════════════════════════════════
   Sections:
   1.  Loader
   2.  Custom Cursor
   3.  Particles Canvas
   4.  Navbar Scroll + Active Link
   5.  Mobile Menu
   6.  Theme Toggle
   7.  Typed Text Animation
   8.  Skill Bar Animation (IntersectionObserver)
   9.  Stats Counter Animation
  10.  VanillaTilt 3D Cards
  11.  AOS Init
  12.  Contact Form
  13.  Footer Year
════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. LOADER
  ══════════════════════════════════════ */
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    // Wait for the CSS animation to finish, then hide
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1600);
  });


  /* ══════════════════════════════════════
     2. CUSTOM CURSOR
     Only active on devices with a real pointer (non-touch)
  ══════════════════════════════════════ */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  // Track mouse position; dot follows instantly, ring lags slightly
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  const ringSpeed = 0.12;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot: instant
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Smooth ring following via requestAnimationFrame
  function animateCursor() {
    ringX += (mouseX - ringX) * ringSpeed;
    ringY += (mouseY - ringY) * ringSpeed;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Glow on interactive elements
  document.querySelectorAll('a, button, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform  = 'translate(-50%,-50%) scale(2)';
      cursorRing.style.width     = '52px';
      cursorRing.style.height    = '52px';
      cursorRing.style.borderColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform  = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.width     = '36px';
      cursorRing.style.height    = '36px';
      cursorRing.style.borderColor = 'rgba(122,162,247,0.5)';
    });
  });


  /* ══════════════════════════════════════
     3. PARTICLES CANVAS
     Subtle floating dots in the hero background
  ══════════════════════════════════════ */
  const canvas = document.getElementById('particlesCanvas');
  const ctx    = canvas.getContext('2d');

  let particles = [];
  const PARTICLE_COUNT = 80;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create a particle
  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 1.5 + 0.3,
      speedX:  (Math.random() - 0.5) * 0.35,
      speedY:  (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.4 + 0.08,
      // Colour: pick randomly from accent palette
      hue:     [217, 265, 195][Math.floor(Math.random() * 3)],
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.opacity})`;
      ctx.fill();

      // Move
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(drawParticles);
  }
  drawParticles();


  /* ══════════════════════════════════════
     4. NAVBAR: scroll glass effect + active section highlight
  ══════════════════════════════════════ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    // Glass effect when scrolled
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active nav link based on scroll position
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
      const sTop = section.offsetTop - 130;
      if (window.scrollY >= sTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  });


  /* ══════════════════════════════════════
     5. MOBILE MENU
  ══════════════════════════════════════ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Prevent body scroll while menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ══════════════════════════════════════
     6. THEME TOGGLE (dark ↔ light)
  ══════════════════════════════════════ */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = themeToggle.querySelector('.theme-toggle__icon');
  const html        = document.documentElement;

  // Persist preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀' : '🌙';

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeIcon.textContent = next === 'dark' ? '☀' : '🌙';
    localStorage.setItem('portfolio-theme', next);
  });


  /* ══════════════════════════════════════
     7. TYPED TEXT ANIMATION
     Simulates Typed.js without a library dependency
  ══════════════════════════════════════ */
  const typedEl = document.getElementById('typedText');
  // ▸ EDIT THIS ARRAY to change the typed phrases
  const phrases = [
    'Full Stack Developer',
    'Java Engineer',
    'Spring Boot Specialist',
    'Problem Solver',
    'Clean Code Advocate',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typeTimeout;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 45 : 90;

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase before deleting
      clearTimeout(typeTimeout);
      typeTimeout = setTimeout(() => {
        isDeleting = true;
        type();
      }, 1800);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    typeTimeout = setTimeout(type, speed);
  }

  // Start typing after a short delay
  setTimeout(type, 1000);


  /* ══════════════════════════════════════
     8. SKILL BAR ANIMATION
     Fills bars when they scroll into view
  ══════════════════════════════════════ */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar__fill');
        fills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-width') + '%';
          // Slight delay creates a stagger effect
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(card => {
    skillObserver.observe(card);
  });


  /* ══════════════════════════════════════
     9. STATS COUNTER ANIMATION
  ══════════════════════════════════════ */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600; // ms
    const step     = target / (duration / 16); // 60fps approx
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => {
    counterObserver.observe(el);
  });


  /* ══════════════════════════════════════
     10. VANILLA TILT — 3D CARD HOVER
  ══════════════════════════════════════ */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max:         8,       // max tilt in degrees
      speed:       600,     // speed of enter/exit animation (ms)
      glare:       true,
      'max-glare': 0.1,     // subtle glare
      scale:       1.02,    // slight scale up
      perspective: 1200,
    });
  }


  /* ══════════════════════════════════════
     11. AOS — SCROLL REVEAL
  ══════════════════════════════════════ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration:  800,
      easing:    'ease-out-cubic',
      once:      true,
      offset:    80,
    });
  }


  /* ══════════════════════════════════════
     12. CONTACT FORM
     Wires up basic feedback; swap for Formspree for real emails
  ══════════════════════════════════════ */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn     = form.querySelector('button[type="submit"]');
      const btnSpan = btn.querySelector('span');

      btnSpan.textContent = 'Sending…';
      btn.disabled = true;

      /* ─── HOW TO ACTIVATE REAL EMAILS ──────────────────────
         1. Go to https://formspree.io and create a free account
         2. Create a new form and copy your endpoint URL
         3. Replace the line below:
            const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
         4. Uncomment the fetch block and delete the setTimeout block
      ──────────────────────────────────────────────────────── */

      // Simulated success (remove when using Formspree)
      setTimeout(() => {
        btnSpan.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #43a047, #66bb6a)';
        form.reset();
        setTimeout(() => {
          btnSpan.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1200);

      /* ─── FORMSPREE FETCH (uncomment to activate) ──────────
      const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });
        if (res.ok) {
          btnSpan.textContent = '✓ Message Sent!';
          form.reset();
        } else {
          btnSpan.textContent = 'Error — try again';
        }
      } catch {
        btnSpan.textContent = 'Error — try again';
      } finally {
        btn.disabled = false;
        setTimeout(() => { btnSpan.textContent = 'Send Message'; }, 3000);
      }
      ─────────────────────────────────────────────────────── */
    });
  }


  /* ══════════════════════════════════════
     13. FOOTER YEAR — auto-update
  ══════════════════════════════════════ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

}); // end DOMContentLoaded
