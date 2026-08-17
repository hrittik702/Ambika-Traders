import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/cards/ProductCard';
import ProjectCard from '@/components/cards/ProjectCard';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { getServiceByIdOrSlug, getRelatedProductsForService, getRelatedProjectsForService } from '@/data/relationships';

/**
 * Ambika Traders — Service Detail Page Shell (Stage 02)
 */
export function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceByIdOrSlug(slug);

  if (!service) {
    return (
      <PageContainer>
        <div className="content-container py-20 text-center space-y-4">
          <h1 className="text-heading-xl font-bold">Service Mil Nahi Saki</h1>
          <p className="text-mono-600">Aap jis service ko dhoondh rahe hain wo available nahi hai ya URL invalid hai.</p>
          <Button as="link" to="/services" variant="primary" size="md">
            Services List Par Wapas Jayein
          </Button>
        </div>
      </PageContainer>
    );
  }

  const relatedProducts = getRelatedProductsForService(service.id);
  const relatedProjects = getRelatedProjectsForService(service.id);

  return (
    <PageContainer>
      <div className="content-container">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mono-600 hover:text-mono-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Services Overview Par Wapas</span>
          </Link>
        </div>

        {/* Service Hero */}
        <div className="max-w-4xl pb-16 border-b border-mono-200">
          <span className="font-mono text-eyebrow text-mono-400 uppercase block mb-3">
            [SERVICE EXECUTION DETAILS]
          </span>
          <h1 className="text-heading-xl md:text-display-md font-bold text-mono-950 tracking-tight">
            {service.title}
          </h1>
          <p className="mt-4 text-body-lg text-mono-600 leading-relaxed prose-editorial">
            {service.description}
          </p>

          {/* Scope of Work Breakdown */}
          {service.scopeOfWork && service.scopeOfWork.length > 0 && (
            <div className="mt-10 p-8 bg-mono-50 border border-mono-300 rounded-xs shadow-subtle">
              <h3 className="text-eyebrow font-mono font-semibold uppercase text-mono-950 mb-4">
                [SCOPE OF WORK & INSTALLATION WORKFLOW]
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.scopeOfWork.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-mono-950 shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-body-sm text-mono-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-b border-mono-200">
            <span className="font-mono text-eyebrow text-mono-400 uppercase block mb-2">
              [SYSTEMS & MATERIALS]
            </span>
            <h2 className="text-heading-lg font-bold text-mono-950 mb-8">
              Compatible Products & Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="py-16 border-b border-mono-200">
            <span className="font-mono text-eyebrow text-mono-400 uppercase block mb-2">
              [CASE STUDIES]
            </span>
            <h2 className="text-heading-lg font-bold text-mono-950 mb-8">
              Sites Executed Under This Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((proj, idx) => (
                <ProjectCard key={proj.id} project={proj} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Enquiry Form */}
        <div className="py-16 max-w-2xl mx-auto">
          <EnquiryForm defaultService={service.title} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ServiceDetail;
