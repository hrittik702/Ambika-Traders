import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Global Link Component (Stage 02)
 * Consistent link variants across the website.
 */
export const Link = React.forwardRef(({
  children,
  to,
  href,
  variant = 'text', // 'nav' | 'text' | 'arrow' | 'external' | 'subtle'
  className,
  active = false,
  target,
  rel,
  ...props
}, ref) => {
  const isExternal = Boolean(href || target === '_blank' || (typeof to === 'string' && to.startsWith('http')));

  const variants = {
    // Nav link: clean, medium weight, subtle underline active state
    nav: cn(
      'text-nav font-medium py-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 rounded-xs',
      active
        ? 'text-mono-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mono-950'
        : 'text-mono-600 hover:text-mono-950'
    ),

    // Text link: inline with hover underline
    text: 'text-mono-950 font-medium hover:text-mono-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950',

    // Arrow link: with inline animated Lucide ArrowRight
    arrow: 'inline-flex items-center gap-1.5 text-nav font-semibold text-mono-950 uppercase tracking-wider group hover:text-mono-700 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950',

    // External link: with upper-right arrow
    external: 'inline-flex items-center gap-1 text-nav font-medium text-mono-950 hover:text-mono-700 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950',

    // Subtle: for footer and secondary meta
    subtle: 'text-xs text-mono-500 hover:text-mono-950 transition-colors focus-visible:outline-none focus-visible:underline',
  };

  const content = (
    <>
      <span>{children}</span>
      {variant === 'arrow' && (
        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      )}
      {variant === 'external' && (
        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      )}
    </>
  );

  const combinedClass = cn(variants[variant], className);

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href || to}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={combinedClass}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <RouterLink
      ref={ref}
      to={to || href || '#'}
      className={combinedClass}
      {...props}
    >
      {content}
    </RouterLink>
  );
});

Link.displayName = 'Link';
export default Link;
