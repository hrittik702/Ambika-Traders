import React, { useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/cards/ServiceCard';
import { services } from '@/data/services';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — Services Listing Page with GSAP Animation
 */
export function Services() {
  const containerRef = useRef(null);

  useGsap((gsap) => {
    // Animate heading
    const heading = containerRef.current?.querySelector('[data-heading-container]');
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: GSAP_EASING.editorial }
      );
    }

    // Animate services cards
    const cards = containerRef.current?.querySelectorAll('[data-service-card]');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: GSAP_EASING.editorial }
      );
    }
  }, [], containerRef);

  return (
    <PageContainer>
      <div ref={containerRef} className="content-container">
        <SectionHeading
          index="SERVICES"
          tag="PRIORITY 02"
          title="Fabrication, Installation & Fitout Services"
          subtitle="Precision aluminium cutting, structural glass fitting, modular kitchens aur complete turn-key craftsmanship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {services.map((service, idx) => (
            <div data-service-card key={service.id}>
              <ServiceCard service={service} index={idx + 1} />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default Services;
