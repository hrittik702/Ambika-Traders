import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';

/**
 * Ambika Traders — Section 03: Hero (Stage 03)
 * Full-width image-led editorial composition with high-contrast typography and subtle dark overlay.
 */
export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-mono-950 text-mono-0 flex items-center border-b border-mono-800 overflow-hidden">
      {/* Background Architectural Image with subtle dark overlay */}
      <div data-hero-image className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-architectural-showroom.jpg"
          alt="Ambika Traders Architectural Aluminium & Interior Showroom"
          aspect="auto"
          borderless
          className="w-full h-full object-cover scale-105"
          containerClassName="w-full h-full"
          fallbackLabel="Ambika Traders Showroom"
          loading="eager"
        />
        {/* Editorial gradient overlay to guarantee WCAG 2.2 AA text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-mono-950 via-mono-950/85 to-mono-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-mono-950 via-transparent to-mono-950/40" />
      </div>

      {/* Subtle Architectural Grid Pattern */}
      <div
        data-hero-pattern
        className="absolute inset-0 z-base bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
      />

      {/* Content Container */}
      <div className="content-container relative z-content py-20 md:py-28 lg:py-36">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div data-hero-badge className="inline-flex items-center gap-2 px-3 py-1.5 bg-mono-900/90 border border-mono-800 rounded-xs mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-mono-0 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-eyebrow text-mono-300 uppercase tracking-widest">
              [SANITARYWARE • ALUMINIUM • INTERIORS]
            </span>
          </div>

          {/* Main Headline */}
          <h1
            data-hero-title
            className="text-display-xl md:text-display-2xl font-bold tracking-tighter text-mono-0 leading-[1.04]"
          >
            Aapke space ke liye sahi product aur practical solution.
          </h1>

          {/* Supporting Copy */}
          <p
            data-hero-subtitle
            className="mt-6 md:mt-8 text-body-lg md:text-xl text-mono-300 max-w-2xl leading-relaxed prose-editorial"
          >
            Aluminium, sanitaryware, kitchen aur interior solutions ke liye practical products aur professional workmanship — ek hi reliable standard ke saath.
          </p>

          {/* CTAs */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div data-hero-cta>
              <Button
                as="link"
                to="/products"
                variant="inverse"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Products Dekhein
              </Button>
            </div>
            <div data-hero-cta>
              <Button
                as="link"
                to="/services"
                variant="inverseOutline"
                size="lg"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Services Explore Karein
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
