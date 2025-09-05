(function() {
  'use strict';

  // Basic helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Sticky CTA visibility: hide on desktop
  const sticky = $('.cta-sticky');
  const onResize = () => {
    if (!sticky) return;
    const isDesktop = window.matchMedia('(min-width: 740px)').matches;
    sticky.style.display = isDesktop ? 'none' : 'inline-flex';
  };
  window.addEventListener('resize', onResize);
  onResize();

  // Carousel controls
  const track = $('.testimonials .track');
  if (track) {
    const prev = $('.testimonials .prev');
    const next = $('.testimonials .next');
    const cardWidth = () => track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 12 : 320;
    prev?.addEventListener('click', () => track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: cardWidth(), behavior: 'smooth' }));
  }

  // Lazy-load: convert PNG/JPG to WebP when supported (progressive enhancement)
  // Note: keep hero eager. Others are lazy by HTML attribute already.

  // Analytics placeholders
  const GA_ID = window.GA_MEASUREMENT_ID;
  const FB_ID = window.FB_PIXEL_ID;

  // GA4 basic loader (if ID provided)
  if (GA_ID && GA_ID !== '[GA_MEASUREMENT_ID]') {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.googletagmanager.com/gtag/js?id='+GA_ID,'ga_tmp');
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
    gtag('event', 'view_content');
    // Scroll depth
    let sent = {25:false,50:false,75:false};
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = ((h.scrollTop + h.clientHeight) / h.scrollHeight) * 100;
      [25,50,75].forEach(p => {
        if (!sent[p] && scrolled >= p) { gtag('event', 'scroll_depth', { percent: p }); sent[p] = true; }
      });
    });
    // CTA tracking
    $$('[data-analytics]').forEach(el => {
      el.addEventListener('click', () => {
        const name = el.getAttribute('data-analytics');
        gtag('event', name);
      });
    });
  }

  // Meta Pixel basic loader (if ID provided)
  if (FB_ID && FB_ID !== '[FB_PIXEL_ID]') {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', FB_ID);
    window.fbq('track', 'ViewContent');
    $$('[data-analytics="initiate_checkout"]').forEach(el => el.addEventListener('click', () => fbq('track', 'InitiateCheckout')));
    $$('[data-analytics="purchase"]').forEach(el => el.addEventListener('click', () => fbq('track', 'Purchase')));
  }

  // Cookie consent (simple, no dark patterns)
  const banner = $('.cookie-banner');
  const CONSENT_KEY = 'cookie_consent_v1';
  const saved = localStorage.getItem(CONSENT_KEY);
  if (!saved) {
    banner?.removeAttribute('hidden');
  }
  const setConsent = (val) => {
    localStorage.setItem(CONSENT_KEY, val);
    banner?.setAttribute('hidden', '');
  };
  $$('[data-cookie="accept"]').forEach(b => b.addEventListener('click', () => setConsent('accepted')));
  $$('[data-cookie="reject"]').forEach(b => b.addEventListener('click', () => setConsent('rejected')));
  $$('[data-cookie="prefs"]').forEach(b => b.addEventListener('click', () => setConsent('preferences')));

})();

