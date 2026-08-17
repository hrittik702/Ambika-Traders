import React, { useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Hero from '@/components/sections/Hero';
import ProductsPreview from '@/components/sections/ProductsPreview';
import ProductCategories from '@/components/sections/ProductCategories';
import ServicesPreview from '@/components/sections/ServicesPreview';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import WhyAmbika from '@/components/sections/WhyAmbika';
import Process from '@/components/sections/Process';

import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — Complete Homepage (Stage 03)
 * Full sequential narrative:
 * 01/02. Utility Bar & Navbar (Global)
 * 03. Hero
 * 04. Trust / Statistics
 * 05. Featured Products (Priority 01)
 * 06. Product Categories
 * 07. Services (Priority 02)
 * 08. Featured Projects (Proof)
 * 09. Why Ambika Traders (Trust)
 * 10. How We Work (Process)
 * 11. Conversion CTA
 * 12. Footer (Global)
 */
export function Home() {
  const containerRef = useRef(null);

  // GSAP Context Hook for smooth lifecycle-safe animations
  useGsap((gsap) => {
    // 1. Hero Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: GSAP_EASING.editorial } });
    heroTl
      .fromTo('[data-hero-image]', { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .fromTo('[data-hero-badge]', { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
      .fromTo('[data-hero-title]', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.0 }, 0.4)
      .fromTo('[data-hero-subtitle]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
      .fromTo('[data-hero-cta]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 0.8)
      .fromTo('[data-hero-pattern]', { opacity: 0 }, { opacity: 0.2, duration: 1.5 }, 0.5);



    // 3. Section Headings ScrollTrigger
    const headings = gsap.utils.toArray('[data-heading-container]');
    headings.forEach((heading) => {
      const tag = heading.querySelector('[data-heading-tag]');
      const title = heading.querySelector('[data-heading-title]');
      const subtitle = heading.querySelector('[data-heading-subtitle]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      if (tag) tl.fromTo(tag, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
      if (title) tl.fromTo(title, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: GSAP_EASING.editorial }, '-=0.3');
      if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
    });

    // 4. Products Grid Stagger
    gsap.fromTo(
      '[data-product-card]',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-products-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 5. Product Categories Grid Stagger
    gsap.fromTo(
      '[data-category-card]',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-categories-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 6. Services Grid Stagger
    gsap.fromTo(
      '[data-service-card]',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-services-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 7. Projects Grid Stagger
    gsap.fromTo(
      '[data-project-card]',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-projects-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 8. Why Ambika Features Stagger
    gsap.fromTo(
      '[data-feature-card]',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-features-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 9. Process Step Cards Progression
    gsap.fromTo(
      '[data-process-card]',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-process-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );


  }, [], containerRef);

  return (
    <PageContainer noPadding>
      <div ref={containerRef} className="w-full">
        {/* 03. Hero Section */}
        <Hero />



        {/* 05. Featured Products Section (Priority 01) */}
        <ProductsPreview />

        {/* 06. Product Categories Section */}
        <ProductCategories />

        {/* 07. Services Section (Priority 02) */}
        <ServicesPreview />

        {/* 08. Featured Projects Section (Proof) */}
        <ProjectsPreview />

        {/* 09. Why Ambika Traders (Heritage & Trust) */}
        <WhyAmbika />

        {/* 10. How We Work (4-Step Process) */}
        <Process />


      </div>
    </PageContainer>
  );
}

export default Home;
