import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { contactData } from '@/data/contact';
import BackToTop from '@/components/ui/BackToTop';

/**
 * Ambika Traders — Global Architectural Footer
 * High-contrast dark monochrome theme with Hinglish messaging and categorized navigation.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mono-950 text-mono-0 border-t border-mono-800 font-intern pt-16 pb-12">
      <div className="content-container">
        {/* Top Brand Statement / High-Impact Hinglish Callout */}
        <div className="pb-16 border-b border-mono-800 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block mb-3">
              [AMBIKA TRADERS — ARCHITECTURAL & INTERIOR EXCELLENCE]
            </span>
            <h2 className="text-display-lg md:text-display-xl font-bold tracking-tighter text-mono-0">
              Aapki zaroorat ke hisaab se sahi solution.
            </h2>
            <p className="mt-4 text-body text-mono-400 max-w-xl">
              Heavy aluminium windows, sliding partitions, modular kitchens aur turnkey interior craftsmanship — ek hi showroom mein authentic quality aur execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-mono-0 text-mono-950 font-medium text-sm rounded-xs hover:bg-mono-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-0"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp Par Baat Karein</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-mono-700 text-mono-0 font-medium text-sm rounded-xs hover:border-mono-0 hover:bg-mono-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-0"
            >
              <span>Showroom Location Dekhein</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-mono-800">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg tracking-tight uppercase text-mono-0">
                {navigationData.brand.name}
              </h3>
              <p className="text-xs font-mono text-mono-400 tracking-wider uppercase mt-1">
                {navigationData.brand.tagline}
              </p>
            </div>

            <address className="not-italic text-sm text-mono-400 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mono-300 shrink-0 mt-1" aria-hidden="true" />
                <span>{contactData.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-mono-300 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                  className="hover:text-mono-0 transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  {contactData.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-mono-300 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${contactData.email}`}
                  className="hover:text-mono-0 transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  {contactData.email}
                </a>
              </div>
            </address>

            <div className="pt-2 text-xs text-mono-500 font-mono">
              <p>{contactData.timings.weekdays}</p>
              <p>{contactData.timings.sunday}</p>
            </div>
          </div>

          {/* Column 2: Products Categories */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-mono-300 mb-6 font-mono">
              [PRODUCTS]
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationData.footerNav.productCategories.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-mono-400 hover:text-mono-0 transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-mono-300 mb-6 font-mono">
              [SERVICES & CRAFTSMANSHIP]
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationData.footerNav.servicesList.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-mono-400 hover:text-mono-0 transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Heritage */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-mono-300 mb-6 font-mono">
              [EXPLORE]
            </h4>
            <ul className="space-y-3 text-sm">
              {navigationData.footerNav.quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-mono-400 hover:text-mono-0 transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-mono-850">
              <span className="text-xs font-mono text-mono-500 uppercase block mb-1">
                Quality Commitment
              </span>
              <p className="text-xs text-mono-400 leading-relaxed">
                Har structure mein precision fabrication aur certified materials ka guaranteed standard.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mono-500 font-mono">
          <p>© {currentYear} Ambika Traders. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Standard: WCAG 2.2 AA Compliant</span>
            <span>Language: Hinglish (Roman)</span>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

export default Footer;
