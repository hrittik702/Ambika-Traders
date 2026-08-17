import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/cards/ProductCard';
import Button from '@/components/ui/Button';
import { fetchProducts } from '@/lib/firebase/productsService';
import { productCategories } from '@/data/productCategories';
import { cn } from '@/lib/utils';
import useGsap from '@/hooks/useGsap';
import { GSAP_EASING } from '@/lib/animations/gsap';
import { PackageOpen, Plus, MessageCircle } from 'lucide-react';
import { contactData } from '@/data/contact';

/**
 * Ambika Traders — Products Catalog Page (Real Data from Firestore)
 */
export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProductsList(data);
      } catch (e) {
        console.error('Failed to load products:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? productsList
    : productsList.filter((p) => {
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
  }, [selectedCategory, productsList], containerRef);

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
            All Products ({productsList.length})
          </button>

          {productCategories.map((cat) => {
            const count = productsList.filter((p) => p.categoryId === cat.id).length;
            return (
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
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading live catalog...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div data-product-card key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 md:p-16 text-center bg-mono-50 border border-mono-200 rounded-xs space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xs bg-mono-200 text-mono-700 flex items-center justify-center mx-auto">
              <PackageOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-heading-sm font-semibold text-mono-950">
                {productsList.length === 0
                  ? 'Catalog Update Ho Raha Hai'
                  : 'Is Category Mein Abhi Products Available Nahi Hain'}
              </h3>
              <p className="text-body-sm text-mono-600">
                {productsList.length === 0
                  ? 'Admin panel se products live add kiye ja rahe hain. Custom profile requirements ke liye direct enquiry submit karein.'
                  : 'Kripya doosri categories check karein ya direct custom quote request karein.'}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {selectedCategory !== 'all' && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setSearchParams({})}
                >
                  Sabhi Products Dekhein
                </Button>
              )}
              <a
                href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent('Namaste Ambika Traders, mujhe custom aluminium/sanitaryware product ke liye quote chahiye.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-mono-950 text-mono-0 font-medium text-xs rounded-xs hover:bg-mono-850 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Par Direct Quote Mangein</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default Products;
