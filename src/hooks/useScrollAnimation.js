import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/animations/gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Hook for setting up ScrollTrigger animations on a container with automatic cleanup
 */
export function useScrollAnimation(triggerCallback, dependencies = [], scopeRef = null) {
  const defaultScope = useRef(null);
  const targetScope = scopeRef || defaultScope;

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const scopeElement = targetScope.current;
    if (!scopeElement) return;

    const ctx = gsap.context(() => {
      triggerCallback(scopeElement, gsap, ScrollTrigger);
    }, scopeElement);

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return targetScope;
}

export default useScrollAnimation;
