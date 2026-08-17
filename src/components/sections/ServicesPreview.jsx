import React, { useState, useEffect } from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/cards/ServiceCard';
import { fetchServices } from '@/lib/firebase/servicesService';

/**
 * Ambika Traders — Section 07: Services Preview (Dynamic from Firestore)
 * Second business priority. Dark contrast section focusing on craftsmanship, measurement, and installation.
 */
export function ServicesPreview() {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServicesList(data);
      } catch (e) {
        console.error('Failed to load services preview:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const featuredServices = servicesList.filter((s) => s.featured);
  const displayServices = (featuredServices.length > 0 ? featuredServices : servicesList).slice(0, 3);

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

        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading services...
          </div>
        ) : displayServices.length === 0 ? (
          <div className="mt-10 p-12 text-center bg-mono-900 border border-mono-800 rounded-xs space-y-3 max-w-xl mx-auto shadow-subtle text-mono-0">
            <div className="w-10 h-10 rounded-xs bg-mono-800 text-mono-300 flex items-center justify-center mx-auto">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-body font-semibold text-mono-0">
              Services Scope Update Ho Raha Hai
            </h3>
            <p className="text-xs text-mono-400">
              Admin panel se verified fabrication services add ki ja rahi hain.
            </p>
            <Button as="link" to="/contact" variant="inverse" size="sm">
              Custom Requirement Submit Karein
            </Button>
          </div>
        ) : (
          <div data-services-grid className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {displayServices.map((service, idx) => (
              <div data-service-card key={service.id}>
                <ServiceCard
                  service={service}
                  index={idx + 1}
                />
              </div>
            ))}
          </div>
        )}

        {/* Mobile Action Button */}
        {displayServices.length > 0 && (
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
        )}
      </div>
    </Section>
  );
}

export default ServicesPreview;
