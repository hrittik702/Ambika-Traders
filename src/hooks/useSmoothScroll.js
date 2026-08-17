import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from '@/lib/lenis';

/**
 * Hook to initialize smooth scrolling for the application
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      destroySmoothScroll();
    };
  }, []);
}

export default useSmoothScroll;
