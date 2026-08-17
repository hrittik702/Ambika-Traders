import React from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/cards/ServiceCard';
import { services } from '@/data/services';

/**
 * Ambika Traders — Section 07: Services Preview (Stage 03)
 * Second business priority. Dark contrast section focusing on craftsmanship, measurement, and installation.
 */
export function ServicesPreview() {
  const featuredServices = services.filter((s) => s.featured).slice(0, 3);

  return (
    <Section variant="dark" spacing="lg" container={false}>
      <div className="content-container">
        <SectionHeading
          index="03"
          eyebrow="SERVICES & EXECUTION"
          theme="dark"
          title="Product ke saath pura solution."
          description="Site measurement, precision fabrication, proper sealing aur professional on-site installation — sab kuch supervised workmanship ke saath."
          align="split"
          action={
            <Button
              as="link"
              to="/services"
              variant="inverseOutline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sabhi Services Explore Karein
            </Button>
          }
        />

        <div data-services-grid className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {featuredServices.map((service, idx) => (
            <div data-service-card key={service.id}>
              <ServiceCard
                service={service}
                index={idx + 1}
              />
            </div>
          ))}
        </div>

        {/* Mobile Action Button */}
        <div className="mt-10 text-center md:hidden">
          <Button
            as="link"
            to="/services"
            variant="inverseOutline"
            size="lg"
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sabhi Services Explore Karein
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default ServicesPreview;
