import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './animations/gsap';

let lenisInstance = null;
let tickerFunction = null;

/**
 * Initialize Lenis Smooth Scroll and sync tightly with GSAP ScrollTrigger
 */
export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return null;

  // Respect user reduced-motion preference
  if (prefersReducedMotion()) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  // Create Lenis instance with optimal settings
  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.6,
    infinite: false,
  });

  // 1. Tell ScrollTrigger to update every time Lenis scrolls
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // 2. Synchronize GSAP ticker with Lenis raf loop (avoids duplicate RAF and frame jitter)
  tickerFunction = (time) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFunction);

  // 3. Disable lag smoothing in GSAP to prevent scroll jumping on heavy CPU load
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

/**
 * Get current Lenis instance
 */
export const getLenis = () => lenisInstance;

/**
 * Smooth or instant scroll to target (number, selector, or element)
 */
export const scrollToTarget = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: options.duration || 1.1,
      immediate: options.immediate || false,
      offset: options.offset || 0,
      ...options,
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: options.immediate ? 'instant' : 'smooth',
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({
          behavior: options.immediate ? 'instant' : 'smooth',
          block: 'start',
        });
      }
    }
  }
};

/**
 * Cleanup Lenis instance and GSAP ticker listener
 */
export const destroySmoothScroll = () => {
  if (tickerFunction) {
    gsap.ticker.remove(tickerFunction);
    tickerFunction = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
