import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Service Card Component (Stage 02)
 */
export function ServiceCard({ service, index, className }) {
  if (!service) return null;

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between p-8 bg-mono-0 border border-mono-300 transition-all duration-300 hover:border-mono-950 hover:shadow-card rounded-xs',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-end mb-6">
          <div className="text-mono-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        <h3 className="text-heading-md font-semibold text-mono-950 mb-3 group-hover:text-mono-800 tracking-tight">
          <Link
            to={`/services/${service.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 after:absolute after:inset-0"
          >
            {service.title}
          </Link>
        </h3>

        <p className="text-body-sm text-mono-600 mb-6 leading-relaxed prose-editorial">
          {service.hinglishHeadline || service.shortDescription}
        </p>

        {service.scopeOfWork && service.scopeOfWork.length > 0 && (
          <ul className="space-y-2 pt-4 border-t border-mono-200">
            {service.scopeOfWork.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-mono-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-mono-950 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-mono-200 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-mono-500">
        <span>Execution & Fitout</span>
        <span className="text-mono-950 font-semibold font-intern">Service Details</span>
      </div>
    </article>
  );
}

export default ServiceCard;
