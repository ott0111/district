/**
 * District — Shared Components
 * Injects navigation, footer, and reusable page elements.
 */

(function () {
  'use strict';

  const LOGO_SVG = `<svg class="nav__logo-mark" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="10" height="10" rx="3" fill="currentColor" opacity="0.9"/>
    <rect x="16" y="2" width="10" height="10" rx="3" fill="currentColor" opacity="0.5"/>
    <rect x="2" y="16" width="10" height="10" rx="3" fill="currentColor" opacity="0.5"/>
    <rect x="16" y="16" width="10" height="10" rx="3" fill="currentColor" opacity="0.9"/>
  </svg>`;

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'talent', label: 'Talent', href: 'talent.html' },
    { id: 'community', label: 'Community', href: 'community.html' },
    { id: 'divisions', label: 'Divisions', href: 'divisions.html' },
    { id: 'resources', label: 'Resources', href: 'resources.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  const FOOTER_NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Talent', href: 'talent.html' },
    { label: 'Community', href: 'community.html' },
    { label: 'Divisions', href: 'divisions.html' },
    { label: 'Resources', href: 'resources.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  const FOOTER_DIVISIONS = [
    { label: 'District Talent', href: 'talent.html' },
    { label: 'District Community', href: 'community.html' },
    { label: 'District Software', href: 'software.html' },
    { label: 'District Apparel', href: 'apparel.html' },
    { label: 'District Events', href: 'events.html' },
    { label: 'District Programs', href: 'programs.html' },
    { label: 'District Partnerships', href: 'partnerships.html' },
  ];

  function getActivePage() {
    return document.body.dataset.page || 'home';
  }

  function renderNav(active) {
    const isHome = active === 'home';
    const navClass = isHome ? 'nav' : 'nav scrolled';

    const links = NAV_ITEMS.map(
      (item) =>
        `<li><a href="${item.href}" class="nav__link${active === item.id ? ' active' : ''}">${item.label}</a></li>`
    ).join('');

    const mobileLinks = NAV_ITEMS.map(
      (item) => `<li><a href="${item.href}" class="nav__mobile-link">${item.label}</a></li>`
    ).join('');

    return `
      <header class="${navClass}" id="nav" role="banner">
        <nav class="nav__container" aria-label="Main navigation">
          <a href="index.html" class="nav__logo" aria-label="District home">
            ${LOGO_SVG}
            <span>District</span>
          </a>
          <ul class="nav__links" role="list">${links}</ul>
          <div class="nav__actions">
            <a href="contact.html#apply" class="btn btn--primary btn--sm magnetic" data-magnetic>
              <span>Join District</span>
            </a>
            <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
              <span></span><span></span>
            </button>
          </div>
        </nav>
        <div class="nav__mobile" id="navMobile" aria-hidden="true">
          <ul role="list">
            ${mobileLinks}
            <li><a href="contact.html#apply" class="btn btn--primary btn--full">Join District</a></li>
          </ul>
        </div>
      </header>`;
  }

  function renderFooter() {
    const mainNav = FOOTER_NAV.map((l) => `<a href="${l.href}">${l.label}</a>`).join('');
    const divisions = FOOTER_DIVISIONS.map((l) => `<a href="${l.href}">${l.label}</a>`).join('');

    return `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <a href="index.html" class="footer__logo" aria-label="District home">
                ${LOGO_SVG.replace('width="28" height="28"', 'width="24" height="24"')}
                <span>District</span>
              </a>
              <p class="footer__tagline">Building the next generation of creators.</p>
              <div class="footer__socials">
                <a href="#" class="footer__social" aria-label="Twitter / X">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 2h2.2L9.9 7.1 15 14h-3.4l-2.7-3.5L5.6 14H3.4l4.1-4.7L2.5 2h3.5l2.4 3.2L12.6 2zm-.8 10.8h1.2L5.2 3.2H3.9l8 9.6z"/></svg>
                </a>
                <a href="#" class="footer__social" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5c2.1 0 2.4 0 3.2.1.8 0 1.3.2 1.7.3.4.2.8.4 1.1.8.4.3.6.7.8 1.1.1.4.3.9.3 1.7.1.8.1 1.1.1 3.2s0 2.4-.1 3.2c0 .8-.2 1.3-.3 1.7-.2.4-.4.8-.8 1.1-.3.4-.7.6-1.1.8-.4.1-.9.3-1.7.3-.8.1-1.1.1-3.2.1s-2.4 0-3.2-.1c-.8 0-1.3-.2-1.7-.3-.4-.2-.8-.4-1.1-.8-.4-.3-.6-.7-.8-1.1-.1-.4-.3-.9-.3-1.7-.1-.8-.1-1.1-.1-3.2s0-2.4.1-3.2c0-.8.2-1.3.3-1.7.2-.4.4-.8.8-1.1.3-.4.7-.6 1.1-.8.4-.1.9-.3 1.7-.3.8-.1 1.1-.1 3.2-.1zM8 4a4 4 0 100 8 4 4 0 000-8zm0 6.6a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2zm4.1-6.8a1 1 0 100-2 1 1 0 000 2z"/></svg>
                </a>
                <a href="#" class="footer__social" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 2C2.7 2 2 2.7 2 3.5v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-9c0-.8-.7-1.5-1.5-1.5h-9zM5.5 6.5h1.5v5H5.5v-5zm.75-2.5a1 1 0 110 2 1 1 0 010-2zM11 11.5h-1.5V9.5c0-.6-.1-1.3-.8-1.3-.8 0-.9.6-.9 1.2v2.1H6.3V6.5h1.4v.6c.2-.4.7-1 1.7-1 1.8 0 2.1 1.2 2.1 2.7v2.7z"/></svg>
                </a>
                <a href="#" class="footer__social" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M15.3 4.5s-.2-1.4-.8-2C13.8 1.6 12.9 1.6 12.5 1.5 10.5 1.3 8 1.3 8 1.3s-2.5 0-4.5.2c-.4.1-1.3.1-2 1-.6.6-.8 2-.8 2S.5 6.2.5 8s.2 3.5.2 3.5.2 1.4.8 2c.7.9 1.7.9 2.1 1 1.5.1 6.4.2 6.4.2s2.5 0 4.5-.2c.4-.1 1.3-.1 2-1 .6-.6.8-2 .8-2s.2-1.5.2-3.5-.2-3.5zM6.5 10.5V5.5L10.5 8l-4 2.5z"/></svg>
                </a>
              </div>
            </div>
            <div class="footer__col">
              <h4 class="footer__col-title">Navigation</h4>
              <nav class="footer__col-links" aria-label="Footer navigation">${mainNav}</nav>
            </div>
            <div class="footer__col">
              <h4 class="footer__col-title">Divisions</h4>
              <nav class="footer__col-links" aria-label="Footer divisions">${divisions}</nav>
            </div>
            <div class="footer__col">
              <h4 class="footer__col-title">Company</h4>
              <nav class="footer__col-links" aria-label="Footer company">
                <a href="careers.html">Careers</a>
                <a href="press.html">Press</a>
                <a href="brand.html">Brand Guidelines</a>
                <a href="faq.html">FAQ</a>
                <a href="blog.html">Blog</a>
              </nav>
            </div>
          </div>
          <div class="footer__bottom">
            <p class="footer__copy">&copy; 2026 District. All rights reserved.</p>
            <div class="footer__legal">
              <a href="privacy.html">Privacy</a>
              <a href="terms.html">Terms</a>
              <a href="cookies.html">Cookies</a>
              <a href="sitemap.html">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>`;
  }

  function renderLoader() {
    return `
      <div class="loader" id="loader" aria-hidden="true">
        <div class="loader__inner">
          <div class="loader__logo">District</div>
          <div class="loader__bar"><div class="loader__progress"></div></div>
        </div>
      </div>`;
  }

  function renderPageHero({ badge, title, subtitle, large }) {
    return `
      <section class="page-hero${large ? ' page-hero--large' : ''}" aria-labelledby="page-hero-title">
        <div class="page-hero__bg" aria-hidden="true">
          <div class="page-hero__gradient"></div>
          <div class="page-hero__grid"></div>
        </div>
        <div class="container page-hero__content">
          ${badge ? `<span class="page-hero__badge reveal">${badge}</span>` : ''}
          <h1 class="page-hero__title reveal" id="page-hero-title">${title}</h1>
          ${subtitle ? `<p class="page-hero__subtitle reveal">${subtitle}</p>` : ''}
        </div>
      </section>`;
  }

  function renderCTA(title, desc, btnText, btnHref) {
    return `
      <section class="cta" aria-label="Call to action">
        <div class="cta__glow" aria-hidden="true"></div>
        <div class="container cta__content">
          <h2 class="cta__title reveal">${title}</h2>
          <p class="cta__desc reveal">${desc}</p>
          <a href="${btnHref}" class="btn btn--primary btn--xl magnetic reveal" data-magnetic>
            <span>${btnText}</span>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </section>`;
  }

  function inject() {
    const active = getActivePage();
    const loaderEl = document.getElementById('site-loader');
    const navEl = document.getElementById('site-nav');
    const footerEl = document.getElementById('site-footer');

    if (loaderEl) loaderEl.innerHTML = renderLoader();
    if (navEl) navEl.innerHTML = renderNav(active);
    if (footerEl) footerEl.innerHTML = renderFooter();
  }

  window.District = {
    renderPageHero,
    renderCTA,
    inject,
  };

  inject();
})();
