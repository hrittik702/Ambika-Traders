import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/animations/gsap';

// Use useLayoutEffect in browser, useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom hook to safely use GSAP contexts in React components.
 * Automatically cleans up animations on unmount and respects reduced-motion.
 */
export function useGsap(animationCallback, dependencies = [], scopeRef = null) {
  const defaultScope = useRef(null);
  const targetScope = scopeRef || defaultScope;

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const scopeElement = targetScope.current;
    const ctx = gsap.context(() => {
      animationCallback(gsap, scopeElement);
    }, scopeElement || undefined);

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return targetScope;
}

export default useGsap;
