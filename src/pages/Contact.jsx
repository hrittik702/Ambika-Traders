import React, { useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { contactData } from '@/data/contact';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — Contact & Showroom Page Shell with GSAP Animation
 */
export function Contact() {
  const containerRef = useRef(null);

  useGsap((gsap) => {
    const heading = containerRef.current?.querySelector('[data-heading-container]');
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: GSAP_EASING.editorial }
      );
    }

    const cols = containerRef.current?.querySelectorAll('[data-contact-col]');
    if (cols && cols.length > 0) {
      gsap.fromTo(
        cols,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: GSAP_EASING.editorial }
      );
    }
  }, [], containerRef);

  return (
    <PageContainer>
      <div ref={containerRef} className="content-container">
        {/* Page Header */}
        <SectionHeading
          index="CONNECT"
          tag="PRIORITY 05 — CONTACT"
          title="Contact & Showroom Location"
          subtitle="Direct enquiry submit karein ya showroom visit karke technical team se direct project discuss karein."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Contact Details & Showroom Info */}
          <div data-contact-col className="lg:col-span-5 space-y-8">
            <div className="bg-mono-950 text-mono-0 p-8 rounded-xs space-y-6">
              <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
                [SHOWROOM & WORKSHOP FACILITY]
              </span>
              <h2 className="text-heading-3 font-semibold text-mono-0">
                {contactData.businessName}
              </h2>
              <address className="not-italic text-sm text-mono-300 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-mono-0 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{contactData.address.fullAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-mono-0 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-0"
                  >
                    {contactData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-mono-0 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${contactData.email}`}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-0"
                  >
                    {contactData.email}
                  </a>
                </div>
              </address>

              <div className="pt-6 border-t border-mono-800 space-y-2 font-mono text-xs text-mono-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mono-300" aria-hidden="true" />
                  <span>{contactData.timings.weekdays}</span>
                </div>
                <p className="pl-6 text-mono-500">{contactData.timings.sunday}</p>
              </div>

              <div className="pt-4">
                <a
                  href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-mono-0 text-mono-950 font-medium text-sm rounded-xs hover:bg-mono-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-0"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Par Direct Chat Karein</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-mono-50 border border-mono-200 rounded-xs">
              <span className="font-mono text-xs text-mono-500 uppercase tracking-wider block mb-2">
                [Hinglish Guidance]
              </span>
              <p className="text-body-sm text-mono-700">
                {contactData.hinglishContactPrompt}
              </p>
            </div>
          </div>

          {/* Form */}
          <div data-contact-col className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Contact;
