import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Product Card Component (Stage 02)
 * Editorial, image-first architectural card with category badge and direct link.
 */
export function ProductCard({ product, className }) {
  const { addItem, items } = useCart();
  if (!product) return null;

  const isInCart = items.some((i) => i.id === product.id);

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

        {/* Quick Add To Quote Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
          className={cn(
            'absolute bottom-3 right-3 z-content inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono font-semibold transition-all shadow-subtle',
            isInCart
              ? 'bg-mono-950 text-mono-0'
              : 'bg-mono-0/95 backdrop-blur-sm text-mono-950 border border-mono-300 hover:bg-mono-950 hover:text-mono-0'
          )}
          aria-label={`Add ${product.name} to Quote Cart`}
        >
          {isInCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isInCart ? 'In Quote' : '+ Quote'}</span>
        </button>
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
