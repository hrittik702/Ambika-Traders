import React from 'react';
import { cn } from '@/lib/utils';
import Badge from './Badge';

/**
 * Ambika Traders — Global Section Heading Component (Stage 02)
 * High-contrast architectural layout with numbered indexes, eyebrow badges, and Hinglish descriptions.
 */
export function SectionHeading({
  index,
  tag,
  eyebrow,
  title,
  subtitle,
  description,
  action,
  align = 'left', // 'left' | 'center' | 'split'
  theme = 'light', // 'light' | 'dark'
  className,
}) {
  const isDark = theme === 'dark';
  const labelText = eyebrow || tag;
  const bodyText = description || subtitle;

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

        {/* Section Main Title */}
        <h2
          data-heading-title
          className={cn(
            'text-heading-xl md:text-display-lg font-bold tracking-tight',
            isDark ? 'text-mono-0' : 'text-mono-950'
          )}
        >
          {title}
        </h2>
      </div>

      {/* Description and optional right action */}
      <div className={cn(
        align === 'split' ? 'max-w-md flex flex-col items-start md:items-end gap-4' : 'mt-4 max-w-2xl'
      )}>
        {bodyText && (
          <p
            data-heading-subtitle
            className={cn(
              'text-body md:text-body-lg font-normal leading-relaxed prose-editorial',
              isDark ? 'text-mono-300' : 'text-mono-600'
            )}
          >
            {bodyText}
          </p>
        )}

        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionHeading;
