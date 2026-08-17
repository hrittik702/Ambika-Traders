import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Ambika Traders — Accessible, State-Aware Button Component
 * Supports keyboard focus, hover states, loading spinner, and polymorphic Link/Anchor rendering.
 */
export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  as = 'button',
  to,
  href,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-intern font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

  const variants = {
    primary: 'bg-mono-950 text-mono-0 hover:bg-mono-800 active:bg-black focus-visible:ring-mono-950 focus-visible:ring-offset-white border border-transparent shadow-subtle',
    secondary: 'bg-mono-0 text-mono-950 border border-mono-300 hover:border-mono-950 hover:bg-mono-50 active:bg-mono-100 focus-visible:ring-mono-950 focus-visible:ring-offset-white',
    outline: 'bg-transparent text-mono-950 border border-mono-800 hover:bg-mono-950 hover:text-mono-0 active:bg-mono-900 focus-visible:ring-mono-950 focus-visible:ring-offset-white',
    ghost: 'bg-transparent text-mono-950 hover:bg-mono-100 active:bg-mono-200 focus-visible:ring-mono-950',
    inverse: 'bg-mono-0 text-mono-950 hover:bg-mono-100 active:bg-mono-200 focus-visible:ring-mono-0 focus-visible:ring-offset-mono-950 border border-transparent',
    inverseOutline: 'bg-transparent text-mono-0 border border-mono-600 hover:border-mono-0 hover:bg-mono-900 active:bg-mono-850 focus-visible:ring-mono-0 focus-visible:ring-offset-mono-950',
  };

  const sizes = {
    sm: 'text-xs uppercase tracking-wider px-3.5 py-1.5 h-8 gap-1.5 rounded-xs',
    md: 'text-sm font-medium px-5 py-2.5 h-11 gap-2 rounded-xs',
    lg: 'text-base font-medium px-7 py-3.5 h-13 gap-2.5 rounded-xs',
  };

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />}
      {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{rightIcon}</span>}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    'group',
    className
  );

  if (to && as === 'link') {
    return (
      <Link
        ref={ref}
        to={to}
        className={combinedClasses}
        aria-disabled={disabled || isLoading}
        tabIndex={disabled || isLoading ? -1 : undefined}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href || as === 'a') {
    return (
      <a
        ref={ref}
        href={href}
        className={combinedClasses}
        aria-disabled={disabled || isLoading}
        tabIndex={disabled || isLoading ? -1 : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={props.type || 'button'}
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
