import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/cards/ProductCard';
import Button from '@/components/ui/Button';
import { products } from '@/data/products';
import { productCategories } from '@/data/productCategories';
import { cn } from '@/lib/utils';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';

/**
 * Ambika Traders — Products Catalog Page Shell with GSAP Stagger
 */
export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => {
        const cat = productCategories.find((c) => c.slug === selectedCategory);
        return cat ? p.categoryId === cat.id : true;
      });

  useGsap((gsap) => {
    // Animate section heading
    const heading = containerRef.current?.querySelector('[data-heading-container]');
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: GSAP_EASING.editorial }
      );
    }

    // Animate products grid
    const cards = gridRef.current?.querySelectorAll('[data-product-card]');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: GSAP_EASING.editorial }
      );
    }
  }, [selectedCategory], containerRef);

  return (
    <PageContainer>
      <div ref={containerRef} className="content-container">
        {/* Page Header */}
        <SectionHeading
          index="CATALOG"
          tag="PRIORITY 01"
          title="Architectural Products & Systems"
          subtitle="Premium aluminium doors, windows, sliding glass partitions, sanitaryware aur modular kitchen solutions."
        />

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-mono-200">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className={cn(
              'px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950',
              selectedCategory === 'all'
                ? 'bg-mono-950 text-mono-0 font-semibold'
                : 'bg-mono-100 text-mono-700 hover:bg-mono-200'
            )}
          >
            All Products ({products.length})
          </button>

          {productCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSearchParams({ category: cat.slug })}
              className={cn(
                'px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950',
                selectedCategory === cat.slug
                  ? 'bg-mono-950 text-mono-0 font-semibold'
                  : 'bg-mono-100 text-mono-700 hover:bg-mono-200'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div data-product-card key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-mono-50 border border-mono-200 rounded-xs">
            <p className="text-mono-600">Is category mein abhi products available nahi hain.</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => setSearchParams({})}
            >
              Sabhi Products Dekhein
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default Products;
