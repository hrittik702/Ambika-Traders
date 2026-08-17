import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToTarget } from '@/lib/lenis';

/**
 * Ambika Traders — Back to Top Accessible Button with Lenis Smooth Scroll
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    scrollToTarget(0, { duration: 1.2 });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top of page"
      className={cn(
        'fixed bottom-6 right-6 z-sticky p-3 rounded-xs bg-mono-950 text-mono-0 border border-mono-800 shadow-floating transition-all duration-300 focus-visible:ring-2 focus-visible:ring-mono-950 focus-visible:outline-none hover:bg-mono-800',
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
