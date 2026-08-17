import { gsap, ScrollTrigger, prefersReducedMotion, GSAP_EASING } from './gsap';

/**
 * Animate Hero section elements on initial load
 */
export function animateHero(container) {
  if (prefersReducedMotion() || !container) return null;

  const tl = gsap.timeline({
    defaults: {
      ease: GSAP_EASING.editorial,
      duration: 1.0,
    },
  });

  const badge = container.querySelector('[data-hero-badge]');
  const title = container.querySelector('[data-hero-title]');
  const subtitle = container.querySelector('[data-hero-subtitle]');
  const ctas = container.querySelectorAll('[data-hero-cta]');
  const pattern = container.querySelector('[data-hero-pattern]');

  if (badge) {
    tl.fromTo(badge, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.7 });
  }

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1 },
      '-=0.5'
    );
  }

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.7'
    );
  }

  if (ctas && ctas.length > 0) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
      '-=0.6'
    );
  }

  if (pattern) {
    tl.fromTo(pattern, { opacity: 0 }, { opacity: 0.25, duration: 1.4 }, '-=1.0');
  }

  return tl;
}

/**
 * Staggered ScrollTrigger reveal for cards grid
 */
export function animateCardsGrid(container, itemSelector = '[data-card-item]', triggerOptions = {}) {
  if (prefersReducedMotion() || !container) return null;

  const items = container.querySelectorAll(itemSelector);
  if (!items || items.length === 0) return null;

  return gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: GSAP_EASING.editorial,
      stagger: 0.12,
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
        ...triggerOptions,
      },
    }
  );
}

/**
 * ScrollTrigger reveal for section headings
 */
export function animateHeading(headingContainer, triggerOptions = {}) {
  if (prefersReducedMotion() || !headingContainer) return null;

  const tag = headingContainer.querySelector('[data-heading-tag]');
  const title = headingContainer.querySelector('[data-heading-title]');
  const subtitle = headingContainer.querySelector('[data-heading-subtitle]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headingContainer,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true,
      ...triggerOptions,
    },
  });

  if (tag) {
    tl.fromTo(tag, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }
  if (title) {
    tl.fromTo(title, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: GSAP_EASING.editorial }, '-=0.3');
  }
  if (subtitle) {
    tl.fromTo(subtitle, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5');
  }

  return tl;
}

/**
 * Animate Stats numbers and descriptions on scroll
 */
export function animateStats(container, triggerOptions = {}) {
  if (prefersReducedMotion() || !container) return null;

  const statItems = container.querySelectorAll('[data-stat-item]');
  if (!statItems || statItems.length === 0) return null;

  return gsap.fromTo(
    statItems,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: GSAP_EASING.editorial,
      stagger: 0.12,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
        ...triggerOptions,
      },
    }
  );
}
