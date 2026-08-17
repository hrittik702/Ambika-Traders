import React from 'react';
import { ShieldCheck, Hammer, Layers, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

/**
 * Ambika Traders — Section 09: Why Ambika Traders (Stage 03)
 * Heritage, material standards, and multi-solution capabilities under one roof.
 */
export function WhyAmbika() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Heavy-Duty Material Standard',
      description: 'Aluminium gauge, wall thickness aur glass safety standards par koi compromise nahi. Har profile certified durability ke saath install hoti hai.',
    },
    {
      icon: Hammer,
      title: 'Experienced In-House Craftsmen',
      description: 'Trained fabrication specialists jo corner joints, silicone sealing aur hardware alignment ko perfection aur neatness ke saath execute karte hain.',
    },
    {
      icon: Layers,
      title: 'End-to-End Multi Solution',
      description: 'Aluminium windows, sliding partitions, modular kitchens aur sanitary fittings — multiple vendors ki zaroorat nahi, ek hi showroom par sab solution.',
    },
  ];

  return (
    <Section variant="secondary" spacing="lg" container={false}>
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Value Proposition */}
          <div data-heading-container className="lg:col-span-5 space-y-6">

            <h2 data-heading-title className="text-heading-xl md:text-display-md font-bold tracking-tight text-mono-950">
              Kyun Chunein Ambika Traders?
            </h2>
            <p data-heading-subtitle className="text-body-lg text-mono-600 leading-relaxed prose-editorial">
              90+ saalon ka established business standard. Hum sirf material deliver nahi karte — site ke hisaab se sahi product aur neat workmanship guarantee karte hain.
            </p>

            <div className="pt-2">
              <Button
                as="link"
                to="/about"
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Humare Baare Mein Janein
              </Button>
            </div>
          </div>

          {/* Right Column: Feature Pillar Cards */}
          <div data-features-grid className="lg:col-span-7 grid grid-cols-1 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  data-feature-card
                  className="p-8 bg-mono-0 border border-mono-300 rounded-xs shadow-subtle flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 hover:border-mono-950"
                >
                  <div className="w-12 h-12 rounded-xs bg-mono-50 border border-mono-200 flex items-center justify-center text-mono-950 shrink-0">
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-heading-md font-semibold text-mono-950 mb-2 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-body-sm text-mono-600 leading-relaxed prose-editorial">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default WhyAmbika;
