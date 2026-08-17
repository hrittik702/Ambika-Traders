import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Ambika Traders — Global Reusable Button Component (High Contrast Architectural Styling)
 * Supports variants: primary, secondary, outline, dark, ghost, text, icon, inverse, inverseOutline.
 * Supports states: default, hover, focus-visible, active, disabled, loading.
 * Supports polymorphic rendering: button, React Router Link, anchor tag.
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
  ariaLabel,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-intern font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer';

  const variants = {
    // Primary (on light): Crisp solid near-black, white text, clear tactile border
    primary: 'bg-mono-950 !text-white border border-mono-950 hover:bg-mono-800 hover:border-mono-800 active:bg-black focus-visible:ring-mono-950 focus-visible:ring-offset-white shadow-sm',
    
    // Secondary (on light): High contrast white with bold dark border
    secondary: 'bg-mono-0 !text-black border border-mono-950 hover:bg-mono-950 hover:!text-white active:bg-mono-900 focus-visible:ring-mono-950 focus-visible:ring-offset-white shadow-subtle',

    // Outline: Clean transparent background with dark border
    outline: 'bg-transparent !text-black border border-mono-400 hover:border-mono-950 hover:bg-mono-100 active:bg-mono-200 focus-visible:ring-mono-950 focus-visible:ring-offset-white',
    
    // Dark: Near-black surface with clean border
    dark: 'bg-mono-900 !text-white border border-mono-750 hover:bg-mono-950 hover:border-mono-600 active:bg-black focus-visible:ring-mono-0 focus-visible:ring-offset-mono-950',

    // Ghost: Subtle hover
    ghost: 'bg-transparent !text-black border border-transparent hover:bg-mono-150 hover:border-mono-300 active:bg-mono-200 focus-visible:ring-mono-950 focus-visible:ring-offset-white',

    // Text: Minimal link treatment with underline transition
    text: 'bg-transparent !text-black p-0 h-auto font-semibold hover:!text-mono-700 active:!text-black focus-visible:ring-mono-950 focus-visible:ring-offset-white underline-offset-4 hover:underline border-0',

    // Icon button: Square/rounded, optimized for Lucide icons
    icon: 'bg-mono-0 !text-black border border-mono-300 hover:border-mono-950 hover:bg-mono-100 active:bg-mono-200 focus-visible:ring-mono-950 focus-visible:ring-offset-white shadow-subtle',

    // Inverse (for dark sections): Brilliant solid white button with black text for maximum POP
    inverse: 'bg-mono-0 !text-black border-2 border-mono-0 hover:bg-mono-100 hover:border-mono-100 active:bg-mono-200 focus-visible:ring-mono-0 focus-visible:ring-offset-mono-950 shadow-card font-bold',

    // Inverse Outline (for dark sections): Transparent with crisp white border and white text
    inverseOutline: 'bg-transparent !text-white border-2 border-mono-0 hover:bg-mono-0 hover:!text-black active:bg-mono-100 focus-visible:ring-mono-0 focus-visible:ring-offset-mono-950 font-semibold',
  };

  const sizes = {
    sm: 'text-xs uppercase tracking-wider px-3.5 py-1.5 h-8 gap-1.5 rounded-xs',
    md: 'text-nav font-medium px-5 py-2.5 h-11 gap-2 rounded-xs',
    lg: 'text-body font-semibold px-7 py-3.5 h-13 gap-2.5 rounded-xs',
    icon: 'p-2.5 h-10 w-10 rounded-xs',
    text: 'p-0 h-auto gap-1',
  };

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />}
      {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    variant === 'text' ? sizes.text : sizes[size],
    'group',
    className
  );

  const isButtonDisabled = disabled || isLoading;

  if (to && (as === 'link' || as === 'Link')) {
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(combinedClasses, isButtonDisabled && 'pointer-events-none opacity-40 select-none')}
        aria-label={ariaLabel}
        aria-disabled={isButtonDisabled}
        tabIndex={isButtonDisabled ? -1 : undefined}
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
        className={cn(combinedClasses, isButtonDisabled && 'pointer-events-none opacity-40 select-none')}
        aria-label={ariaLabel}
        aria-disabled={isButtonDisabled}
        tabIndex={isButtonDisabled ? -1 : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', ...restProps } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClasses}
      disabled={isButtonDisabled}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...restProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
