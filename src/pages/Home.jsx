import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, Hammer, Layers } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/cards/ProductCard';
import ProductCategoryCard from '@/components/cards/ProductCategoryCard';
import ServiceCard from '@/components/cards/ServiceCard';
import ProjectCard from '@/components/cards/ProjectCard';
import { products } from '@/data/products';
import { productCategories } from '@/data/productCategories';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { contactData } from '@/data/contact';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — Home Page with GSAP & ScrollTrigger Animations
 */
export function Home() {
  const containerRef = useRef(null);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const featuredServices = services.filter((s) => s.featured).slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  // GSAP Context Hook for animations
  useGsap((gsap) => {
    // 1. Hero Animation on load
    const heroTl = gsap.timeline({ defaults: { ease: GSAP_EASING.editorial } });
    heroTl
      .fromTo('[data-hero-badge]', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo('[data-hero-title]', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.4')
      .fromTo('[data-hero-subtitle]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo('[data-hero-cta]', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.5')
      .fromTo('[data-hero-pattern]', { opacity: 0 }, { opacity: 0.25, duration: 1.5 }, '-=0.8');

    // 2. Stats Section Animation
    gsap.fromTo(
      '[data-stat-card]',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-stats-section]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

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
      { opacity: 0, y: 40 },
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

    // 5. Categories Grid Stagger
    gsap.fromTo(
      '[data-category-card]',
      { opacity: 0, y: 35 },
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
      { opacity: 0, y: 40 },
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
      { opacity: 0, y: 40 },
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

    // 8. Why Ambika & Process Cards
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

    gsap.fromTo(
      '[data-process-card]',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-process-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 9. CTA Section Reveal
    gsap.fromTo(
      '[data-cta-content]',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: GSAP_EASING.editorial,
        scrollTrigger: {
          trigger: '[data-cta-section]',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  }, [], containerRef);

  return (
    <PageContainer noPadding>
      <div ref={containerRef}>
        {/* =========================================================================
            03. Hero Section
            ========================================================================= */}
        <section className="relative bg-mono-950 text-mono-0 pt-20 pb-24 md:pt-28 md:pb-36 border-b border-mono-800 overflow-hidden">
          <div className="content-container relative z-10">
            <div className="max-w-4xl">
              <div data-hero-badge className="inline-flex items-center gap-2 px-3 py-1 bg-mono-900 border border-mono-800 rounded-xs mb-6">
                <span className="w-2 h-2 rounded-full bg-mono-0 animate-pulse" />
                <span className="font-mono text-xs text-mono-300 uppercase tracking-widest">
                  [ARCHITECTURAL FABRICATION & INTERIOR CRAFTSMANSHIP]
                </span>
              </div>

              <h1 data-hero-title className="text-display-xl md:text-display-2xl font-bold tracking-tighter text-mono-0 leading-none">
                Aluminium systems aur modern interior solutions.
              </h1>

              <p data-hero-subtitle className="mt-6 text-body-lg md:text-xl text-mono-300 max-w-2xl leading-relaxed">
                Heavy-duty aluminium windows, sliding partitions, sanitaryware, modular kitchens aur complete interior execution — ek hi reliable standard ke saath.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div data-hero-cta>
                  <Button
                    as="link"
                    to="/products"
                    variant="inverse"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Products Catalog Dekhein
                  </Button>
                </div>
                <div data-hero-cta>
                  <Button
                    as="link"
                    to="/contact"
                    variant="inverseOutline"
                    size="lg"
                  >
                    Direct Enquiry Karein
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle architectural grid pattern */}
          <div
            data-hero-pattern
            className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
          />
        </section>

        {/* =========================================================================
            04. Trust / Statistics Section
            ========================================================================= */}
        <section data-stats-section className="bg-mono-0 py-12 border-b border-mono-200">
          <div className="content-container grid grid-cols-2 md:grid-cols-4 gap-8">
            <div data-stat-card>
              <span className="text-display-lg font-bold text-mono-950 block tracking-tight">
                100%
              </span>
              <span className="text-xs uppercase tracking-wider text-mono-500 font-mono block mt-1">
                Engineered Aluminium Profiles
              </span>
            </div>
            <div data-stat-card>
              <span className="text-display-lg font-bold text-mono-950 block tracking-tight">
                Turnkey
              </span>
              <span className="text-xs uppercase tracking-wider text-mono-500 font-mono block mt-1">
                Site Measurement & Installation
              </span>
            </div>
            <div data-stat-card>
              <span className="text-display-lg font-bold text-mono-950 block tracking-tight">
                Custom
              </span>
              <span className="text-xs uppercase tracking-wider text-mono-500 font-mono block mt-1">
                Architectural Specifications
              </span>
            </div>
            <div data-stat-card>
              <span className="text-display-lg font-bold text-mono-950 block tracking-tight">
                Verified
              </span>
              <span className="text-xs uppercase tracking-wider text-mono-500 font-mono block mt-1">
                Hardware & Fitting Standard
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05. Featured Products Section (Priority 01)
            ========================================================================= */}
        <section className="section-padding-y bg-mono-50 border-b border-mono-200">
          <div className="content-container">
            <SectionHeading
              index="01"
              tag="PRIORITY 01 — PRODUCTS"
              title="Featured Aluminium & Interior Products"
              subtitle="Architectural specifications ke mutabiq crafted high-performance windows, doors aur wardrobe systems."
              align="split"
            />

            <div data-products-grid className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div data-product-card key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                as="link"
                to="/products"
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sabhi Products Dekhein
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            06. Product Categories Section
            ========================================================================= */}
        <section className="section-padding-y bg-mono-0 border-b border-mono-200">
          <div className="content-container">
            <SectionHeading
              index="02"
              tag="CATEGORIES"
              title="Complete Product Range"
              subtitle="Aluminium fenestration se lekar sanitaryware aur false ceiling tak, category ke hisaab se choose karein."
            />

            <div data-categories-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.slice(0, 6).map((category, idx) => (
                <div data-category-card key={category.id}>
                  <ProductCategoryCard
                    category={category}
                    index={idx + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            07. Services Section (Priority 02)
            ========================================================================= */}
        <section className="section-padding-y bg-mono-950 text-mono-0 border-b border-mono-800">
          <div className="content-container">
            <SectionHeading
              index="03"
              tag="PRIORITY 02 — SERVICES"
              theme="dark"
              title="Fabrication & Installation Services"
              subtitle="Site measurement se lekar precision alignment tak, dedicated craftsmen aur technical team ki supervision."
              align="split"
            />

            <div data-services-grid className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service, idx) => (
                <div data-service-card key={service.id}>
                  <ServiceCard
                    service={service}
                    index={idx + 1}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                as="link"
                to="/services"
                variant="inverseOutline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sabhi Services Explore Karein
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            08. Featured Projects Section (Priority 03)
            ========================================================================= */}
        <section className="section-padding-y bg-mono-0 border-b border-mono-200">
          <div className="content-container">
            <SectionHeading
              index="04"
              tag="PRIORITY 03 — PROJECTS"
              title="Executed Sites & Case Studies"
              subtitle="Residential villas aur commercial spaces mein actual execution aur finish quality ka visual proof."
              align="split"
            />

            <div data-projects-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, idx) => (
                <div data-project-card key={project.id}>
                  <ProjectCard
                    project={project}
                    index={idx + 1}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                as="link"
                to="/projects"
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                All Projects Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09. Why Ambika Traders Section
            ========================================================================= */}
        <section className="section-padding-y bg-mono-50 border-b border-mono-200">
          <div className="content-container">
            <SectionHeading
              index="05"
              tag="HERITAGE & TRUST"
              title="Kyun Chunein Ambika Traders?"
              subtitle="Quality materials, transparent consultation aur dependable timeline commitments."
            />

            <div data-features-grid className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div data-feature-card className="p-8 bg-mono-0 border border-mono-200">
                <ShieldCheck className="w-8 h-8 text-mono-950 mb-4" />
                <h3 className="text-heading-4 font-semibold text-mono-950 mb-2">
                  Heavy-Duty Material Standard
                </h3>
                <p className="text-body-sm text-mono-600">
                  Aluminium gauge aur glass safety standards par koi compromise nahi. Har profile certified durability ke saath aati hai.
                </p>
              </div>

              <div data-feature-card className="p-8 bg-mono-0 border border-mono-200">
                <Hammer className="w-8 h-8 text-mono-950 mb-4" />
                <h3 className="text-heading-4 font-semibold text-mono-950 mb-2">
                  Experienced In-House Craftsmen
                </h3>
                <p className="text-body-sm text-mono-600">
                  Trained fabrication specialists jo corner joints, silicone sealing aur hardware alignment ko perfection ke saath install karte hain.
                </p>
              </div>

              <div data-feature-card className="p-8 bg-mono-0 border border-mono-200">
                <Layers className="w-8 h-8 text-mono-950 mb-4" />
                <h3 className="text-heading-4 font-semibold text-mono-950 mb-2">
                  End-to-End Execution
                </h3>
                <p className="text-body-sm text-mono-600">
                  Windows, doors, partitions, kitchen aur sanitary fittings — multiple vendors ki zaroorat nahi, ek hi jagah sab solution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. How We Work (Process) Section
            ========================================================================= */}
        <section className="section-padding-y bg-mono-0 border-b border-mono-200">
          <div className="content-container">
            <SectionHeading
              index="06"
              tag="PROCESS"
              title="Kaise Kaam Karta Hai Hamara Process"
              subtitle="Step-by-step transparent execution structure."
            />

            <div data-process-grid className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div data-process-card className="border-t-2 border-mono-950 pt-4">
                <span className="font-mono text-xs text-mono-500 font-semibold uppercase tracking-widest">[STEP 01]</span>
                <h4 className="text-heading-5 font-semibold text-mono-950 mt-2 mb-1">Requirement & Discussion</h4>
                <p className="text-xs text-mono-600">Showroom visit ya call par project scope samajhna.</p>
              </div>

              <div data-process-card className="border-t-2 border-mono-950 pt-4">
                <span className="font-mono text-xs text-mono-500 font-semibold uppercase tracking-widest">[STEP 02]</span>
                <h4 className="text-heading-5 font-semibold text-mono-950 mt-2 mb-1">Site Laser Measurement</h4>
                <p className="text-xs text-mono-600">Site visit aur accurate structural dimensions record karna.</p>
              </div>

              <div data-process-card className="border-t-2 border-mono-950 pt-4">
                <span className="font-mono text-xs text-mono-500 font-semibold uppercase tracking-widest">[STEP 03]</span>
                <h4 className="text-heading-5 font-semibold text-mono-950 mt-2 mb-1">Precision Fabrication</h4>
                <p className="text-xs text-mono-600">Workshop mein custom cutting, crimping aur finishing.</p>
              </div>

              <div data-process-card className="border-t-2 border-mono-950 pt-4">
                <span className="font-mono text-xs text-mono-950 font-semibold uppercase tracking-widest">[STEP 04]</span>
                <h4 className="text-heading-5 font-semibold text-mono-950 mt-2 mb-1">On-Site Installation</h4>
                <p className="text-xs text-mono-600">Final fitting, leveling aur quality signoff.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11 & 12. Conversion CTA & Location Section
            ========================================================================= */}
        <section data-cta-section className="section-padding-y bg-mono-950 text-mono-0">
          <div data-cta-content className="content-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block mb-3">
                [CONVERSION CTA & SHOWROOM]
              </span>
              <h2 className="text-heading-1 md:text-display-lg font-bold tracking-tight text-mono-0">
                Apne project ke liye humse baat karein.
              </h2>
              <p className="mt-4 text-body text-mono-300 max-w-lg">
                Showroom visit karke actual samples inspect karein ya site visit arrange karne ke liye direct contact karein.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  as="link"
                  to="/contact"
                  variant="inverse"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Showroom Visit Plan Karein
                </Button>
              </div>
            </div>

            <div className="bg-mono-900 border border-mono-800 p-8 rounded-xs space-y-6">
              <h3 className="text-heading-4 font-semibold text-mono-0">
                Ambika Traders Showroom & Workshop
              </h3>
              <p className="text-body-sm text-mono-300">
                {contactData.address.fullAddress}
              </p>
              <div className="pt-4 border-t border-mono-800 font-mono text-xs text-mono-400 space-y-2">
                <p>Phone: {contactData.phone}</p>
                <p>Timings: {contactData.timings.weekdays}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default Home;
