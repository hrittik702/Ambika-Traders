import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if the user has requested reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Luxury Architectural Easing Constants
 */
export const GSAP_EASING = {
  luxury: 'power3.out',
  smooth: 'power2.out',
  editorial: 'power3.out',
  expo: 'expo.out',
};

/**
 * Global GSAP Default Config
 */
export const configureGsapDefaults = () => {
  gsap.defaults({
    duration: 0.9,
    ease: GSAP_EASING.luxury,
  });
};

// Initialize defaults
configureGsapDefaults();

export { gsap, ScrollTrigger };
