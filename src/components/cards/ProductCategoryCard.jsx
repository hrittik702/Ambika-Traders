import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Product Category Card Component
 */
export function ProductCategoryCard({ category, index, className }) {
  if (!category) return null;

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-8 bg-mono-0 border border-mono-200 transition-all duration-300 hover:border-mono-950 hover:bg-mono-50',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-mono-400 font-semibold tracking-widest">
            {index ? `[${String(index).padStart(2, '0')}]` : ''}
          </span>
          <div className="w-8 h-8 rounded-full border border-mono-200 flex items-center justify-center text-mono-950 group-hover:border-mono-950 group-hover:bg-mono-950 group-hover:text-mono-0 transition-colors">
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        <h3 className="text-heading-3 font-semibold text-mono-950 mb-3">
          <Link
            to={`/products?category=${category.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 after:absolute after:inset-0"
          >
            {category.name}
          </Link>
        </h3>

        <p className="text-body-sm text-mono-600 leading-relaxed">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-mono-100 flex items-center justify-between text-xs text-mono-500 font-medium uppercase tracking-wider">
        <span>Explore Category</span>
        <span className="text-mono-950 font-semibold">View Products</span>
      </div>
    </div>
  );
}

export default ProductCategoryCard;
