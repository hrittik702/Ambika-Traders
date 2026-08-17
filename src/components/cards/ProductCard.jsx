import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Product Card Component
 * Sharp architectural card with image container, product meta, and direct link.
 */
export function ProductCard({ product, className }) {
  if (!product) return null;

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-mono-0 border border-mono-200 transition-all duration-300 hover:border-mono-950 overflow-hidden',
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full bg-mono-100 overflow-hidden border-b border-mono-200">
        <div className="absolute inset-0 flex items-center justify-center text-mono-400 bg-mono-100 font-mono text-xs uppercase tracking-wider p-4 text-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
              onError={(e) => {
                // Fallback for placeholder
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          <span className="select-none">{product.name}</span>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="default" className="bg-mono-0/90 backdrop-blur-sm">
            {product.categoryName}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <h3 className="text-heading-5 font-semibold text-mono-950 group-hover:text-mono-800 transition-colors">
            <Link
              to={`/products/${product.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 after:absolute after:inset-0"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-body-sm text-mono-600 line-clamp-2">
            {product.hinglishHeadline || product.description}
          </p>
        </div>

        {/* Footer info & CTA trigger */}
        <div className="mt-6 pt-4 border-t border-mono-100 flex items-center justify-between text-xs text-mono-500 font-medium">
          <span className="uppercase tracking-wider">
            {product.price ? product.price : 'Custom Quote'}
          </span>
          <span className="inline-flex items-center gap-1 text-mono-950 font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
            Details Dekhein
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
