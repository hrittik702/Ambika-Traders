import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { contactData } from '@/data/contact';

/**
 * Ambika Traders — Section 11: Conversion CTA (Stage 03)
 * Full-width dark closing editorial statement driving direct lead enquiries.
 */
export function CTASection() {
  return (
    <Section data-cta-section variant="dark" spacing="xl" container={false} className="relative overflow-hidden">
      {/* Background Subtle Grid Accent */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none"
      />

      <div className="content-container relative z-content">
        <div data-cta-content className="max-w-3xl">


          <h2 className="text-display-lg md:text-display-xl font-bold tracking-tighter text-mono-0 leading-[1.06]">
            Aapko product chahiye ya pura solution?
          </h2>

          <p className="mt-6 text-body-lg md:text-xl text-mono-300 leading-relaxed prose-editorial">
            Chahe individual window profiles, sanitary fixtures purchase karni ho ya complete custom interior execution karwana ho — humse direct baat karein.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              as="link"
              to="/contact"
              variant="inverse"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Enquiry Karein
            </Button>

            <Button
              as="a"
              href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="inverseOutline"
              size="lg"
              leftIcon={<MessageCircle className="w-4 h-4" aria-hidden="true" />}
            >
              WhatsApp Par Chat Karein
            </Button>

            <Button
              as="a"
              href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
              variant="ghost"
              size="lg"
              className="text-mono-300 hover:text-mono-0 hover:bg-mono-900 border-mono-800"
              leftIcon={<Phone className="w-4 h-4 text-mono-400" aria-hidden="true" />}
            >
              {contactData.phone}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default CTASection;
