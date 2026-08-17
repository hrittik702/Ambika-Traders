import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Product Card Component (Stage 02)
 * Editorial, image-first architectural card with category badge and direct link.
 */
export function ProductCard({ product, className }) {
  if (!product) return null;

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-mono-0 border border-mono-300 transition-all duration-300 hover:border-mono-950 rounded-xs overflow-hidden shadow-subtle',
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full bg-mono-100 overflow-hidden border-b border-mono-200">
        <Image
          src={product.image}
          alt={product.name}
          aspect="auto"
          hoverZoom
          fallbackLabel={product.name}
          className="w-full h-full"
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3 z-content">
          <Badge variant="default" className="bg-mono-0/95 backdrop-blur-sm border-mono-300">
            {product.categoryName}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div>
          <h3 className="text-heading-sm font-semibold text-mono-950 group-hover:text-mono-800 transition-colors">
            <Link
              to={`/products/${product.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 after:absolute after:inset-0"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-body-sm text-mono-600 line-clamp-2 leading-relaxed">
            {product.hinglishHeadline || product.description}
          </p>
        </div>

        {/* Footer info & CTA trigger */}
        <div className="mt-6 pt-4 border-t border-mono-200 flex items-center justify-between text-xs text-mono-500 font-mono">
          <span className="uppercase tracking-wider font-medium">
            {product.price ? product.price : 'Custom Quote'}
          </span>
          <span className="inline-flex items-center gap-1 text-mono-950 font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform font-intern">
            Details Dekhein
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
