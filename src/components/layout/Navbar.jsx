import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { contactData } from '@/data/contact';

/**
 * Ambika Traders — Global Header & Navigation
 * High-contrast, responsive architectural navigation with flawless mobile touch support.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCount, openCart } = useCart();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
      {/* 1. Utility Top Bar (Desktop Only) */}
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

      {/* 2. Main Navbar (Sticky Header) */}
      <nav
        aria-label="Main Navigation"
        className={cn(
          'sticky top-0 z-navbar w-full bg-mono-0 transition-all duration-200 border-b',
          isScrolled
            ? 'border-mono-300 shadow-card'
            : 'border-mono-200'
        )}
      >
        <div className="content-container flex items-center justify-between h-20">
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
                      ? 'text-mono-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mono-950'
                      : 'text-mono-700 hover:text-mono-950 font-medium'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quote Cart Button (Desktop & Mobile) */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 sm:px-3 sm:py-2.5 rounded-xs border-2 border-mono-950 bg-mono-0 text-mono-950 hover:bg-mono-950 hover:text-mono-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 flex items-center gap-2 cursor-pointer shadow-subtle"
              aria-label={`Open Quotation Cart with ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-wider">
                Quote Cart
              </span>
              {totalCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-mono-950 text-mono-0 font-mono text-[0.7rem] font-bold rounded-full border border-mono-0">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Primary Desktop CTA */}
            <div className="hidden sm:block">
              <Button
                as="link"
                to={navigationData.primaryCta.path}
                variant="secondary"
                size="md"
                className="font-bold border-2 border-mono-950 text-mono-950 hover:bg-mono-950 hover:text-mono-0 shadow-subtle"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {navigationData.primaryCta.label}
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-mono-950 rounded-xs border-2 border-mono-950 bg-mono-0 hover:bg-mono-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 flex items-center justify-center cursor-pointer shadow-subtle"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Fullscreen Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-[999] bg-mono-950/70 backdrop-blur-md md:hidden animate-fade-in flex flex-col justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-mono-0 w-full h-[90vh] rounded-t-lg border-t-2 border-mono-950 p-6 flex flex-col justify-between shadow-floating overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-mono-200">
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tighter text-mono-950 uppercase">
                  {navigationData.brand.name}
                </span>
                <span className="text-[0.62rem] font-mono tracking-widest text-mono-500 uppercase">
                  [NAVIGATION & SERVICES]
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xs border border-mono-300 text-mono-950 hover:bg-mono-100 transition-colors cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 space-y-2 flex-1">
              {navigationData.primaryNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between text-lg font-semibold py-3.5 px-4 rounded-xs transition-colors',
                      isActive
                        ? 'bg-mono-950 text-mono-0 font-bold'
                        : 'text-mono-900 hover:bg-mono-100 border border-mono-200'
                    )
                  }
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-mono-400" />
                </NavLink>
              ))}

              {/* Direct Quote Cart Link in Mobile Menu */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full flex items-center justify-between text-base font-semibold py-3 px-4 rounded-xs border-2 border-mono-950 bg-mono-50 text-mono-950 hover:bg-mono-100 transition-colors mt-2"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Quotation Cart</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-mono-950 text-mono-0 rounded-full">
                  {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
                </span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-mono-200 space-y-3">
              <Button
                as="link"
                to={navigationData.primaryCta.path}
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-md"
                onClick={() => setMobileMenuOpen(false)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {navigationData.primaryCta.label}
              </Button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-mono-300 rounded-xs text-xs font-mono text-mono-900 hover:bg-mono-100"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-mono-950 text-mono-0 rounded-xs text-xs font-mono font-medium hover:bg-mono-800"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
