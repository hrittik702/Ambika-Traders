import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import ServiceCard from '@/components/cards/ServiceCard';
import ProjectCard from '@/components/cards/ProjectCard';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { getProductByIdOrSlug, getRelatedServicesForProduct, getRelatedProjectsForProduct } from '@/data/relationships';
import { scrollToTarget } from '@/lib/lenis';

/**
 * Ambika Traders — Product Detail Page Shell (Stage 02)
 */
export function ProductDetail() {
  const { slug } = useParams();
  const product = getProductByIdOrSlug(slug);

  if (!product) {
    return (
      <PageContainer>
        <div className="content-container py-20 text-center space-y-4">
          <h1 className="text-heading-xl font-bold">Product Mil Nahi Saka</h1>
          <p className="text-mono-600">Aap jis product ko dhoondh rahe hain wo available nahi hai ya URL invalid hai.</p>
          <Button as="link" to="/products" variant="primary" size="md">
            Sabhi Products Par Wapas Jayein
          </Button>
        </div>
      </PageContainer>
    );
  }

  const relatedServices = getRelatedServicesForProduct(product.id);
  const relatedProjects = getRelatedProjectsForProduct(product.id);

  const handleScrollToEnquiry = (e) => {
    e.preventDefault();
    scrollToTarget('#enquiry-section', { offset: -80 });
  };

  return (
    <PageContainer>
      <div className="content-container">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mono-600 hover:text-mono-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Products Catalog Par Wapas</span>
          </Link>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-mono-200">
          {/* Product Media Area */}
          <div className="lg:col-span-7">
            <Image
              src={product.image}
              alt={product.name}
              aspect="service"
              fallbackLabel={product.name}
              className="w-full h-full"
            />
          </div>

          {/* Product Meta & Specification */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{product.categoryName}</Badge>
                <span className="font-mono text-xs text-mono-400 font-medium">ID: {product.id}</span>
              </div>

              <h1 className="text-heading-xl md:text-display-md font-bold text-mono-950 tracking-tight">
                {product.name}
              </h1>

              <p className="mt-4 text-body text-mono-600 leading-relaxed prose-editorial">
                {product.description}
              </p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-mono-200">
                  <h3 className="text-eyebrow font-mono font-semibold uppercase text-mono-950 mb-3">
                    [KEY SPECIFICATIONS]
                  </h3>
                  <ul className="space-y-2.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-sm text-mono-700">
                        <CheckCircle2 className="w-4 h-4 text-mono-950 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Price Note & Enquiry Trigger */}
            <div className="mt-8 pt-6 border-t border-mono-200">
              <div className="text-xs font-mono text-mono-500 uppercase mb-4">
                Pricing: Site Measurement & Section Thickness ke hisaab se customized quote di jaati hai.
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleScrollToEnquiry}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Is Product Ke Liye Enquiry Karein
              </Button>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <div className="py-16 border-b border-mono-200">
            <span className="font-mono text-eyebrow text-mono-400 uppercase block mb-2">
              [ASSOCIATED CRAFTSMANSHIP]
            </span>
            <h2 className="text-heading-lg font-bold text-mono-950 mb-8">
              Related Installation & Fabrication Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedServices.map((srv, idx) => (
                <ServiceCard key={srv.id} service={srv} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="py-16 border-b border-mono-200">
            <span className="font-mono text-eyebrow text-mono-400 uppercase block mb-2">
              [CASE STUDIES]
            </span>
            <h2 className="text-heading-lg font-bold text-mono-950 mb-8">
              Projects Featuring This System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((proj, idx) => (
                <ProjectCard key={proj.id} project={proj} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Direct Enquiry Section Anchor */}
        <div id="enquiry-section" className="py-16 max-w-2xl mx-auto">
          <EnquiryForm defaultService={product.categoryName} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ProductDetail;
