import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

/**
 * Ambika Traders — Global Reusable Image Component (Stage 02)
 * Supports aspect ratio presets, lazy loading, hover scale transitions, and accessible placeholders.
 */
export const Image = React.forwardRef(({
  src,
  alt = 'Ambika Traders Architectural Solution',
  aspect = 'auto', // 'hero' | 'product' | 'productSquare' | 'service' | 'project' | 'auto'
  objectFit = 'cover', // 'cover' | 'contain'
  hoverZoom = false,
  borderless = false,
  overlay = 'none', // 'none' | 'subtle' | 'strong' | 'light'
  className,
  containerClassName,
  loading = 'lazy',
  fallbackLabel,
  ...props
}, ref) => {
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    hero: 'aspect-[21/9]',
    product: 'aspect-[4/5]',
    productSquare: 'aspect-square',
    service: 'aspect-[4/3]',
    project: 'aspect-[16/10]',
    auto: '',
  };

  const overlayClasses = {
    none: '',
    subtle: 'after:absolute after:inset-0 after:bg-gradient-to-t after:from-mono-950/70 after:to-transparent after:pointer-events-none',
    strong: 'after:absolute after:inset-0 after:bg-gradient-to-t after:from-mono-950/90 after:via-mono-950/40 after:to-transparent after:pointer-events-none',
    light: 'after:absolute after:inset-0 after:bg-mono-0/30 after:pointer-events-none',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden select-none w-full h-full',
        !borderless && 'bg-mono-100 border border-mono-200 rounded-xs',
        aspectClasses[aspect],
        overlayClasses[overlay],
        hoverZoom && 'group',
        containerClassName
      )}
    >
      {!hasError && src ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full transition-all duration-700 ease-luxury',
            objectFit === 'cover' ? 'object-cover' : 'object-contain',
            hoverZoom && 'group-hover:scale-105',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-mono-100 text-mono-400 font-mono text-xs uppercase tracking-wider">
          <ImageIcon className="w-6 h-6 mb-2 text-mono-300" aria-hidden="true" />
          <span>{fallbackLabel || alt || 'Ambika Traders Asset'}</span>
        </div>
      )}
    </div>
  );
});

Image.displayName = 'Image';
export default Image;
