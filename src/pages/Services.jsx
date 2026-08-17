import React, { useState, useEffect, useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/cards/ServiceCard';
import Button from '@/components/ui/Button';
import { fetchServices } from '@/lib/firebase/servicesService';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';
import { Wrench, MessageCircle } from 'lucide-react';
import { contactData } from '@/data/contact';

/**
 * Ambika Traders — Services Listing Page (Dynamic from Firestore)
 */
export function Services() {
  const containerRef = useRef(null);
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServicesList(data);
      } catch (e) {
        console.error('Failed to fetch services:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
  }, [servicesList], containerRef);

  return (
    <PageContainer>
      <div ref={containerRef} className="content-container">
        <SectionHeading
          index="SERVICES"
          tag="PRIORITY 02"
          title="Fabrication, Installation & Fitout Services"
          subtitle="Precision aluminium cutting, structural glass fitting, modular kitchens aur complete turn-key craftsmanship."
        />

        {loading ? (
          <div className="py-24 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading services catalog...
          </div>
        ) : servicesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {servicesList.map((service, idx) => (
              <div data-service-card key={service.id}>
                <ServiceCard service={service} index={idx + 1} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 md:p-16 text-center bg-mono-50 border border-mono-200 rounded-xs space-y-4 max-w-2xl mx-auto mt-10">
            <div className="w-12 h-12 rounded-xs bg-mono-200 text-mono-700 flex items-center justify-center mx-auto">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-heading-sm font-semibold text-mono-950">
                Services Scope Update Ho Raha Hai
              </h3>
              <p className="text-body-sm text-mono-600">
                Admin panel se verified fabrication aur installation services add ki ja rahi hain. Immediate fabrication query ke liye team se connect karein.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent('Namaste Ambika Traders, mujhe fabrication/installation service ke liye enquiry karni hai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-mono-950 text-mono-0 font-medium text-xs rounded-xs hover:bg-mono-850 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Par Service Enquire Karein</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default Services;
