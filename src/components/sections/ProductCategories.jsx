import React from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCategoryCard from '@/components/cards/ProductCategoryCard';
import { productCategories } from '@/data/productCategories';

/**
 * Ambika Traders — Section 06: Product Categories (Stage 03)
 * Allows visitors to browse the broader catalog by architectural domain.
 */
export function ProductCategories() {
  const visibleCategories = productCategories.slice(0, 6);

  return (
    <Section variant="light" spacing="lg" container={false}>
      <div className="content-container">
        <SectionHeading
          index="02"
          eyebrow="CATEGORIES CATALOG"
          title="Har space ke mutabiq complete product range."
          description="Aluminium fenestration se lekar modern sanitary fixtures aur false ceiling grids tak, category ke according explore karein."
        />

        <div data-categories-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {visibleCategories.map((category, idx) => (
            <div data-category-card key={category.id}>
              <ProductCategoryCard
                category={category}
                index={idx + 1}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default ProductCategories;
