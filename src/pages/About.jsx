import React, { useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Wrench, Eye } from 'lucide-react';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — About Page Shell with GSAP Animation
 */
export function About() {
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

    const sections = containerRef.current?.querySelectorAll('[data-fade-section]');
    if (sections && sections.length > 0) {
      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.2, ease: GSAP_EASING.editorial }
      );
    }
  }, [], containerRef);

  return (
    <PageContainer>
      <div ref={containerRef} className="content-container">
        {/* Page Header */}
        <SectionHeading
          index="HERITAGE"
          tag="PRIORITY 04 — ABOUT"
          title="About Ambika Traders"
          subtitle="Precision fabrication, high-grade architectural aluminium aur dependable interior craftsmanship."
        />

        {/* Narrative Grid */}
        <div data-fade-section className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-b border-mono-200">
          <div className="lg:col-span-6 space-y-6 text-body-lg text-mono-700">
            <p className="font-medium text-mono-950">
              Ambika Traders ka core focus architectural aluminium systems, doors, windows, partitions, sanitaryware aur interior execution par hai.
            </p>
            <p>
              Hum residential aur commercial spaces ke liye durable materials aur expert craftsmanship provide karte hain. Hamari approach simple hai: site measurement se lekar installation tak har stage par precision maintain karna.
            </p>
            <p>
              Architects, contractors aur homeowners ko ek hi platform par genuine products aur skilled execution team milti hai, jisse unhe multiple vendors manage nahi karne padte.
            </p>
          </div>

          <div className="lg:col-span-6 bg-mono-50 p-8 border border-mono-200 rounded-xs space-y-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-mono-950">
              [CORE BUSINESS PILLARS]
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-mono-950 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-mono-950">Guaranteed Material Standards</h4>
                  <p className="text-xs text-mono-600">Heavy-gauge aluminium profiles aur certified hardware components.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-mono-950 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-mono-950">In-House Skilled Workforce</h4>
                  <p className="text-xs text-mono-600">Experienced technicians jo clean alignment aur weather-proofing deliver karte hain.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-mono-950 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-mono-950">Transparent Consultation</h4>
                  <p className="text-xs text-mono-600">Requirement ke hisaab se sahi section aur budget recommendation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Contact */}
        <div data-fade-section className="py-16 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-heading-lg md:text-heading-xl font-bold text-mono-950">
            Showroom Mein Samples Dekhein
          </h2>
          <p className="text-body text-mono-600">
            Aluminium sections, sliding track demo units aur surface finishes live check karne ke liye showroom visit karein.
          </p>
          <Button
            as="link"
            to="/contact"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Showroom Address Aur Timings Dekhein
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default About;
