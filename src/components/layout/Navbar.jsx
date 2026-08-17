import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, ArrowRight } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Global Header & Navigation (Stage 02)
 * Features:
 * - Utility Bar with showroom hours and direct phone line
 * - Editorial Logo with Brand Sub-Tagline
 * - Nav links with subtle underline active indicators
 * - Accessible mobile menu with Escape key listener & body scroll locking
 * - Scrolled state with compact elevation and backdrop blur
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="relative w-full font-intern z-navbar">
      {/* 1. Utility Top Bar (In document flow — scrolls away naturally on desktop) */}
      <div className="hidden lg:block bg-mono-950 text-mono-300 border-b border-mono-800 text-xs py-2 w-full">
        <div className="content-container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-normal text-mono-200">
              {navigationData.utilityBar.tagline}
            </span>
          </div>

          <div className="flex items-center gap-6 text-mono-400 font-mono text-[0.72rem]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-mono-300" aria-hidden="true" />
              <span>{navigationData.utilityBar.hours}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-mono-300" aria-hidden="true" />
              <a
                href={`tel:${navigationData.utilityBar.phone.replace(/\s+/g, '')}`}
                className="hover:text-mono-0 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-0"
              >
                {navigationData.utilityBar.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar (Sticky at top-0 with 100% solid white background to eliminate bleed-through) */}
      <nav
        aria-label="Main Navigation"
        className={cn(
          'sticky top-0 z-navbar w-full bg-mono-0 transition-all duration-200 border-b',
          isScrolled
            ? 'border-mono-300 shadow-card'
            : 'border-mono-200'
        )}
      >
        <div
          className="content-container flex items-center justify-between h-20"
        >
          {/* Brand Identity */}
          <Link
            to="/"
            className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 rounded-xs group"
          >
            <span className="font-intern font-bold text-xl md:text-2xl tracking-tighter text-mono-950 group-hover:text-mono-800 uppercase">
              {navigationData.brand.name}
            </span>
            <span className="text-[0.65rem] font-mono tracking-widest text-mono-500 uppercase">
              {navigationData.brand.tagline}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navigationData.primaryNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'text-nav font-medium py-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 rounded-xs',
                    isActive
                      ? 'text-mono-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mono-950'
                      : 'text-mono-600 hover:text-mono-950'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                as="link"
                to={navigationData.primaryCta.path}
                variant="secondary"
                size="md"
                className="border-mono-950 text-mono-950 hover:bg-mono-950 hover:text-mono-0 font-semibold shadow-sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {navigationData.primaryCta.label}
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-mono-950 rounded-xs border border-mono-200 hover:bg-mono-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Navigation Overlay & Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-20 z-mobile-menu bg-mono-950/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-mono-0 w-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-mono-300 p-6 flex flex-col justify-between shadow-floating"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4">
              <span className="text-eyebrow font-mono text-mono-400 uppercase">
                [NAVIGATION MENU]
              </span>
              <div className="flex flex-col space-y-1.5">
                {navigationData.primaryNav.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'text-body-lg font-medium py-2.5 px-3 rounded-xs transition-colors',
                        isActive
                          ? 'bg-mono-950 text-mono-0 font-semibold'
                          : 'text-mono-800 hover:bg-mono-100'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-mono-200 flex flex-col gap-4">
              <Button
                as="link"
                to={navigationData.primaryCta.path}
                variant="secondary"
                size="lg"
                className="w-full border-mono-950 text-mono-950 hover:bg-mono-950 hover:text-mono-0 font-semibold shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {navigationData.primaryCta.label}
              </Button>

              <div className="text-xs text-mono-500 font-mono space-y-1.5 text-center pt-2">
                <div className="flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-mono-950" aria-hidden="true" />
                  <a href={`tel:${navigationData.utilityBar.phone.replace(/\s+/g, '')}`} className="hover:underline">
                    {navigationData.utilityBar.phone}
                  </a>
                </div>
                <p>{navigationData.utilityBar.hours}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
