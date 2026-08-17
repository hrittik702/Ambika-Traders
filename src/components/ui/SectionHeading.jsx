import React from 'react';
import { cn } from '@/lib/utils';
import Badge from './Badge';

/**
 * Ambika Traders — Editorial Section Heading Component
 * High-contrast architectural layout with numbered indexes and Hinglish subtitles.
 * Equipped with data-attributes for GSAP ScrollTrigger targeting.
 */
export function SectionHeading({
  index,
  tag,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className,
}) {
  const isDark = theme === 'dark';

  return (
    <div
      data-heading-container
      className={cn(
        'w-full mb-10 md:mb-14',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        align === 'split' && 'flex flex-col md:flex-row md:items-end md:justify-between gap-6',
        className
      )}
    >
      <div className={cn(align === 'split' ? 'max-w-2xl' : 'w-full')}>
        <div data-heading-tag className="flex items-center gap-3 mb-3">
          {index && (
            <span className={cn(
              'font-mono text-xs tracking-widest uppercase font-semibold',
              isDark ? 'text-mono-400' : 'text-mono-500'
            )}>
              [{index}]
            </span>
          )}
          {tag && (
            <Badge variant={isDark ? 'outlineDark' : 'outline'}>
              {tag}
            </Badge>
          )}
        </div>

        <h2
          data-heading-title
          className={cn(
            'text-heading-1 md:text-display-lg font-semibold tracking-tight',
            isDark ? 'text-mono-0' : 'text-mono-950'
          )}
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <p
          data-heading-subtitle
          className={cn(
            'text-body md:text-body-lg font-normal leading-relaxed',
            align === 'split' ? 'max-w-md' : 'mt-4 max-w-2xl',
            isDark ? 'text-mono-300' : 'text-mono-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
