import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Project Card Component
 */
export function ProjectCard({ project, index, className }) {
  if (!project) return null;

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-mono-0 border border-mono-200 transition-all duration-300 hover:border-mono-950 overflow-hidden',
        className
      )}
    >
      {/* Project Image Container */}
      <div className="relative aspect-[16/10] w-full bg-mono-100 overflow-hidden border-b border-mono-200">
        <div className="absolute inset-0 flex items-center justify-center text-mono-400 bg-mono-100 font-mono text-xs uppercase tracking-wider p-4 text-center">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          <span className="select-none">{project.title}</span>
        </div>

        <div className="absolute top-4 left-4 z-10">
          <Badge variant="dark">
            {project.category}
          </Badge>
        </div>

        {index && (
          <div className="absolute bottom-4 right-4 z-10 bg-mono-950/80 backdrop-blur-sm text-mono-0 font-mono text-xs px-2.5 py-1 rounded-xs">
            {`[0${index}]`}
          </div>
        )}
      </div>

      {/* Project Meta */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-mono-500 block mb-1">
            {project.scope}
          </span>
          <h3 className="text-heading-4 font-semibold text-mono-950 group-hover:text-mono-800">
            <Link
              to={`/projects/${project.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 after:absolute after:inset-0"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-body-sm text-mono-600 line-clamp-2">
            {project.hinglishHeadline || project.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-mono-100 flex items-center justify-between text-xs text-mono-500 font-medium">
          <span className="uppercase tracking-wider">Case Study</span>
          <span className="inline-flex items-center gap-1 text-mono-950 font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
            View Project
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
