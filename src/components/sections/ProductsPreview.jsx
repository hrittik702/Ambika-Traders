import React from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/cards/ProductCard';
import { products } from '@/data/products';

/**
 * Ambika Traders — Section 05: Featured Products Preview (Stage 03)
 * Primary business priority. Editorial asymmetric showcase of real products.
 */
export function ProductsPreview() {
  const featuredProducts = products.filter((p) => p.featured);
  const primaryProduct = featuredProducts[0]; // e.g. Slim Sliding Window
  const secondaryProducts = featuredProducts.slice(1, 4); // e.g. Casement Door, Glass Partition, Modular Kitchen

  return (
    <Section variant="secondary" spacing="lg" container={false}>
      <div className="content-container">
        {/* Section Heading with Action Slot */}
        <SectionHeading
          index="01"
          eyebrow="PRODUCTS CATALOG"
          title="Rozmarra ke space se complete interior solution tak."
          description="Heavy-duty aluminium windows, sliding partitions, sanitaryware aur modular storage — high-grade material aur long-term durability ke saath."
          align="split"
          action={
            <Button
              as="link"
              to="/products"
              variant="secondary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Saare Products Dekhein
            </Button>
          }
        />

        {/* Editorial Product Showcase Grid */}
        <div data-products-grid className="space-y-8 mt-10">
          {/* Asymmetric Showcase: Primary Featured Product */}
          {primaryProduct && (
            <div data-product-card className="w-full">
              <div className="group relative grid grid-cols-1 lg:grid-cols-12 bg-mono-0 border border-mono-300 hover:border-mono-950 transition-all duration-300 rounded-xs overflow-hidden shadow-subtle">
                {/* Featured Image */}
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] bg-mono-100 overflow-hidden border-b lg:border-b-0 lg:border-r border-mono-200">
                  <ProductCard product={primaryProduct} className="border-0 shadow-none rounded-none h-full" />
                </div>

                {/* Featured Content Callout */}
                <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-mono-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-eyebrow font-semibold uppercase tracking-wider text-mono-500">
                        [FEATURED SPECIFICATION]
                      </span>
                    </div>

                    <h3 className="text-heading-lg font-bold text-mono-950 tracking-tight">
                      {primaryProduct.name}
                    </h3>

                    <p className="text-body text-mono-700 leading-relaxed prose-editorial">
                      {primaryProduct.description}
                    </p>

                    {primaryProduct.features && (
                      <div className="pt-4 border-t border-mono-200">
                        <span className="font-mono text-xs text-mono-500 uppercase tracking-wider block mb-2">
                          Key Highlights:
                        </span>
                        <ul className="space-y-1.5 text-xs text-mono-700">
                          {primaryProduct.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-mono-950" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-mono-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-mono-500 block uppercase">Estimate / Pricing</span>
                      <span className="text-heading-sm font-bold text-mono-950 font-intern">
                        {primaryProduct.price || 'Custom Quote on Measurement'}
                      </span>
                    </div>

                    <Button
                      as="link"
                      to={`/products/${primaryProduct.slug}`}
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Specifications Dekhein
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Products Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondaryProducts.map((product) => (
              <div data-product-card key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-12 text-center md:hidden">
          <Button
            as="link"
            to="/products"
            variant="primary"
            size="lg"
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Saare Products Dekhein
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default ProductsPreview;
