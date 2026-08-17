import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Reusable Section Component (Stage 02)
 * Supports alternating dark/light/muted themes, semantic section spacing, and container wrapping.
 */
export const Section = React.forwardRef(({
  children,
  className,
  variant = 'light', // 'light' | 'secondary' | 'muted' | 'dark' | 'darkSoft' | 'transparent'
  spacing = 'md',    // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'
  container = true,  // boolean: wraps children inside content-container
  narrow = false,     // boolean: wraps inside narrow container (1120px)
  id,
  as: Component = 'section',
  ...props
}, ref) => {
  const variants = {
    light: 'section-theme-light bg-bg-primary text-text-primary',
    secondary: 'section-theme-secondary bg-bg-secondary text-text-primary',
    muted: 'section-theme-muted bg-bg-muted text-text-primary',
    dark: 'section-theme-dark bg-bg-dark text-text-inverse theme-dark',
    darkSoft: 'section-theme-dark-soft bg-bg-darkSoft text-text-inverse theme-dark',
    transparent: 'bg-transparent text-text-primary',
  };

  const spacings = {
    none: 'py-0',
    xs: 'section-pad-xs',
    sm: 'section-pad-sm',
    md: 'section-pad-md',
    lg: 'section-pad-lg',
    xl: 'section-pad-xl',
  };

  const containerClasses = narrow ? 'page-container-narrow' : 'content-container';

  return (
    <Component
      ref={ref}
      id={id}
      className={cn('relative w-full', variants[variant], spacings[spacing], className)}
      {...props}
    >
      {container ? (
        <div className={containerClasses}>
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
});

Section.displayName = 'Section';
export default Section;
