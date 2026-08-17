import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Minimal Architectural Badge Component
 */
export function Badge({
  children,
  variant = 'default',
  className,
  ...props
}) {
  const variants = {
    default: 'bg-mono-100 text-mono-900 border border-mono-200',
    dark: 'bg-mono-900 text-mono-100 border border-mono-800',
    outline: 'bg-transparent text-mono-800 border border-mono-300',
    outlineDark: 'bg-transparent text-mono-300 border border-mono-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-[0.7rem] font-medium uppercase tracking-wider px-2.5 py-1 rounded-xs select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
