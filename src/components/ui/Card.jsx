import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Global Reusable Card Shell (Stage 02)
 * Editorial, image-first architectural card foundation.
 */
export const Card = React.forwardRef(({
  children,
  className,
  variant = 'default', // 'default' | 'flat' | 'dark' | 'interactive'
  as: Component = 'article',
  ...props
}, ref) => {
  const variants = {
    default: 'bg-mono-0 border border-mono-200 text-mono-950',
    flat: 'bg-mono-50 text-mono-950',
    dark: 'bg-mono-900 border border-mono-800 text-mono-0',
    interactive: 'bg-mono-0 border border-mono-200 text-mono-950 transition-all duration-300 hover:border-mono-950 hover:shadow-card cursor-pointer',
  };

  return (
    <Component
      ref={ref}
      className={cn('relative flex flex-col rounded-xs overflow-hidden', variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';
export default Card;
