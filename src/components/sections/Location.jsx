import React from 'react';
import { MapPin, Phone, Clock, Mail, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { contactData } from '@/data/contact';

/**
 * Ambika Traders — Section 12: Location & Showroom Visit (Stage 03)
 * Split layout with showroom details, working timings, and Google Maps direction anchor.
 */
export function Location() {
  return (
    <Section data-location-section variant="light" spacing="lg" container={false}>
      <div className="content-container">
        <div data-location-content className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Showroom Visit Info */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-eyebrow text-mono-500 uppercase tracking-widest block">
              [SHOWROOM & WORKSHOP — 07]
            </span>

            <h2 className="text-heading-xl md:text-display-md font-bold tracking-tight text-mono-950">
              Showroom Visit Karein
            </h2>

            <p className="text-body-lg text-mono-600 leading-relaxed prose-editorial">
              Actual aluminium profile samples, glass thicknesses, sliding rollers aur sanitary fittings ko physical inspect karein. Technical team site requirements par face-to-face guide karegi.
            </p>

            <div className="space-y-4 pt-4 border-t border-mono-200 text-body-sm text-mono-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mono-950 shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic">
                  <span className="font-semibold text-mono-950 block">{contactData.businessName}</span>
                  <span>{contactData.address.fullAddress}</span>
                </address>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-mono-950 shrink-0" aria-hidden="true" />
                <span>{contactData.timings.weekdays}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-mono-950 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-mono-950 font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950"
                >
                  {contactData.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-mono-950 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-mono text-mono-950 font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                as="a"
                href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent('Namaste Ambika Traders, main showroom visit schedule karna chahta hoon.')}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
                className="border-mono-950 text-mono-950 hover:bg-mono-950 hover:text-mono-0 font-semibold shadow-sm"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Showroom Visit Schedule Karein
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Map & Navigation Card */}
          <div className="lg:col-span-6">
            <div className="p-8 bg-mono-50 border border-mono-300 rounded-xs space-y-6 shadow-subtle">
              <div className="flex items-center justify-between border-b border-mono-200 pb-4">
                <div>
                  <h3 className="text-heading-sm font-semibold text-mono-950">
                    Location Navigation
                  </h3>
                  <span className="text-xs font-mono text-mono-500">
                    {contactData.address.landmark}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-mono-200 text-mono-800 font-mono text-xs rounded-xs">
                  Active Showroom
                </span>
              </div>

              {/* Architectural Map Box */}
              <div className="relative aspect-[16/10] bg-mono-200 border border-mono-300 rounded-xs overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-mono-0 border border-mono-300 flex items-center justify-center mb-3 shadow-subtle">
                  <MapPin className="w-6 h-6 text-mono-950" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs text-mono-700 font-semibold uppercase block">
                  Ambika Traders Showroom & Fabrication Unit
                </span>
                <span className="text-xs text-mono-500 mt-1 max-w-xs">
                  {contactData.address.fullAddress}
                </span>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(contactData.businessName + ' ' + contactData.address.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-mono-950 text-mono-0 font-medium text-xs rounded-xs hover:bg-mono-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950"
                >
                  <span>Google Maps Par Direction Dekhein</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="text-xs font-mono text-mono-500 flex items-center justify-between pt-2">
                <span>Parking Available: Yes</span>
                <span>Site Consultations: Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Location;
