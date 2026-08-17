import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Global Page Container Shell (Stage 02)
 * Handles global width boundaries, fluid responsive horizontal gutters, and WCAG AA skip target.
 */
export function PageContainer({
  children,
  className,
  showNavbar = true,
  showFooter = true,
  noPadding = false,
  narrow = false,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary overflow-x-clip">
      {showNavbar && <Navbar />}
      
      <main
        id="main-content"
        tabIndex="-1"
        className={cn(
          'flex-1 focus:outline-none w-full',
          !noPadding && 'section-pad-sm md:section-pad-md',
          narrow && 'max-w-narrow mx-auto w-full px-4 md:px-8',
          className
        )}
      >
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default PageContainer;
