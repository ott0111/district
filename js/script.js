/**
 * District — Premium Creator Ecosystem
 * Main JavaScript
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     DOM References
     -------------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const navLinks = document.querySelectorAll('.nav__link');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  const reveals = document.querySelectorAll('.reveal');
  const statNumbers = document.querySelectorAll('.stats__number');
  const magneticButtons = document.querySelectorAll('[data-magnetic]');
  const contactForm = document.querySelector('.contact__form');
  const heroContent = document.querySelector('.hero__content');
  const canvas = document.getElementById('particles');

  /* --------------------------------------------------------------------------
     Loading Animation
     -------------------------------------------------------------------------- */
  function initLoader() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        initReveals();
      }, 1200);
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal (Fade Up + Blur)
     -------------------------------------------------------------------------- */
  function initReveals() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     Navbar — Blur on Scroll + Active Section
     -------------------------------------------------------------------------- */
  function initNavbar() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      nav.classList.toggle('scrolled', scrollY > 50);

      lastScroll = scrollY;
    }, { passive: true });

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.dataset.section === id);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    function toggleMenu(open) {
      const isOpen = open ?? !navToggle.classList.contains('active');
      navToggle.classList.toggle('active', isOpen);
      navMobile.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      navMobile.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    navToggle.addEventListener('click', () => toggleMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  /* --------------------------------------------------------------------------
     Animated Counters
     -------------------------------------------------------------------------- */
  function initCounters() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const textValue = el.dataset.text;
    if (textValue) {
      typeText(el, textValue);
      return;
    }

    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function typeText(el, text) {
    let i = 0;
    el.textContent = '';

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }

    type();
  }

  /* --------------------------------------------------------------------------
     Magnetic Buttons
     -------------------------------------------------------------------------- */
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
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

  /* --------------------------------------------------------------------------
     Hero Parallax
     -------------------------------------------------------------------------- */
  function initParallax() {
    if (!heroContent || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero')?.offsetHeight || 800;

      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - progress * 0.6;
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     Particle System
     -------------------------------------------------------------------------- */
  function initParticles() {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let width, height;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles(count) {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      /* Draw subtle connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 140, 255, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      const count = Math.min(60, Math.floor((width * height) / 15000));
      createParticles(count);
      draw();
    }

    resize();
    start();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationId);
        start();
      }, 200);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        draw();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Smooth Scroll for Anchor Links
     -------------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;

        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth',
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     Contact Form
     -------------------------------------------------------------------------- */
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.querySelector('span').textContent;

      btn.querySelector('span').textContent = 'Sent!';
      btn.disabled = true;

      setTimeout(() => {
        btn.querySelector('span').textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2500);
    });
  }

  /* --------------------------------------------------------------------------
     Card Hover Glow (Cursor Tracking)
     -------------------------------------------------------------------------- */
  function initCardGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.card, .creator-card, .vision__card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.background = `
          radial-gradient(circle at ${x}% ${y}%, rgba(79, 140, 255, 0.06) 0%, transparent 60%),
          var(--bg-card)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     Initialize
     -------------------------------------------------------------------------- */
  function init() {
    initLoader();
    initNavbar();
    initMobileNav();
    initCounters();
    initMagneticButtons();
    initParallax();
    initParticles();
    initSmoothScroll();
    initContactForm();
    initCardGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
