import React, { useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — Projects Portfolio Page with GSAP Animation
 */
export function Projects() {
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

    // Animate project cards
    const cards = containerRef.current?.querySelectorAll('[data-project-card]');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: GSAP_EASING.editorial }
      );
    }
  }, [], containerRef);

  return (
    <PageContainer>
      <div ref={containerRef} className="content-container">
        <SectionHeading
          index="PORTFOLIO"
          tag="PRIORITY 03"
          title="Executed Projects & Visual Proof"
          subtitle="Residential architecture, corporate workplaces aur interior installations ka verified record."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {projects.map((project, idx) => (
            <div data-project-card key={project.id}>
              <ProjectCard project={project} index={idx + 1} />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default Projects;
