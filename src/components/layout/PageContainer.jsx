import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Standard Accessible Page Container Shell
 */
export function PageContainer({
  children,
  className,
  showNavbar = true,
  showFooter = true,
  noPadding = false,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {showNavbar && <Navbar />}
      
      <main
        id="main-content"
        tabIndex="-1"
        className={cn(
          'flex-1 focus:outline-none',
          !noPadding && 'py-8 md:py-14',
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
