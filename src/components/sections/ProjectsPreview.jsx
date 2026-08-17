import React from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';

/**
 * Ambika Traders — Section 08: Featured Projects Preview (Stage 03)
 * Supporting visual proof of executed sites, balcony jali windows, and architectural fitouts.
 */
export function ProjectsPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <Section variant="light" spacing="lg" container={false}>
      <div className="content-container">
        <SectionHeading
          index="04"
          eyebrow="PORTFOLIO & SITES"
          title="Jo kaam dikhai deta hai, wahi sabse bada proof hai."
          description="Residential villas, commercial offices aur interior fitouts mein actual execution aur finish quality ka visual proof."
          align="split"
          action={
            <Button
              as="link"
              to="/projects"
              variant="secondary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              All Projects Portfolio
            </Button>
          }
        />

        <div data-projects-grid className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {featuredProjects.map((project, idx) => (
            <div data-project-card key={project.id}>
              <ProjectCard
                project={project}
                index={idx + 1}
              />
            </div>
          ))}
        </div>

        {/* Mobile Action Button */}
        <div className="mt-10 text-center md:hidden">
          <Button
            as="link"
            to="/projects"
            variant="primary"
            size="lg"
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            All Projects Portfolio
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default ProjectsPreview;
