import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Project Card Component (Stage 02)
 */
export function ProjectCard({ project, index, className }) {
  if (!project) return null;

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-mono-0 border border-mono-300 transition-all duration-300 hover:border-mono-950 rounded-xs overflow-hidden shadow-subtle',
        className
      )}
    >
      {/* Project Image Container */}
      <div className="relative aspect-[16/10] w-full bg-mono-100 overflow-hidden border-b border-mono-200">
        <Image
          src={project.image}
          alt={project.title}
          aspect="auto"
          hoverZoom
          fallbackLabel={project.title}
          className="w-full h-full"
        />

        <div className="absolute top-4 left-4 z-content">
          <Badge variant="dark" className="bg-mono-950/90 backdrop-blur-sm">
            {project.category}
          </Badge>
        </div>


      </div>

      {/* Project Meta */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <span className="text-eyebrow font-mono uppercase tracking-wider text-mono-500 block mb-1">
            {project.scope}
          </span>
          <h3 className="text-heading-md font-semibold text-mono-950 group-hover:text-mono-800 tracking-tight">
            <Link
              to={`/projects/${project.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 after:absolute after:inset-0"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-body-sm text-mono-600 line-clamp-2 leading-relaxed prose-editorial">
            {project.hinglishHeadline || project.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-mono-200 flex items-center justify-between text-xs text-mono-500 font-mono">
          <span className="uppercase tracking-wider">Case Study</span>
          <span className="inline-flex items-center gap-1 text-mono-950 font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform font-intern">
            View Project
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
