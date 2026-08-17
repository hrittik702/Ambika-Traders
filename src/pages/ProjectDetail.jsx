import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/cards/ProductCard';
import ServiceCard from '@/components/cards/ServiceCard';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { getProjectByIdOrSlug, getRelatedProductsForProject, getRelatedServicesForProject } from '@/data/relationships';

/**
 * Ambika Traders — Project Detail Page Shell
 */
export function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectByIdOrSlug(slug);

  if (!project) {
    return (
      <PageContainer>
        <div className="content-container py-20 text-center space-y-4">
          <h1 className="text-heading-1 font-bold">Project Mil Nahi Saka</h1>
          <p className="text-mono-600">Aap jis project case study ko dekhna chahte hain wo available nahi hai.</p>
          <Button as="link" to="/projects" variant="primary" size="md">
            Sabhi Projects Par Wapas Jayein
          </Button>
        </div>
      </PageContainer>
    );
  }

  const relatedProducts = getRelatedProductsForProject(project.id);
  const relatedServices = getRelatedServicesForProject(project.id);

  return (
    <PageContainer>
      <div className="content-container">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mono-600 hover:text-mono-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mono-950"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Projects Overview Par Wapas</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl pb-12 border-b border-mono-200">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="default">{project.category}</Badge>
            <span className="font-mono text-xs text-mono-400">SCOPE: {project.scope}</span>
          </div>

          <h1 className="text-display-lg md:text-display-xl font-bold text-mono-950 tracking-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-body-lg text-mono-600 leading-relaxed">
            {project.description}
          </p>

          {/* Project Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-8 pt-6 border-t border-mono-200">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-mono-950 mb-3">
                [PROJECT HIGHLIGHTS & ARCHITECTURAL SPECS]
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-body-sm text-mono-700">
                    <CheckCircle2 className="w-4 h-4 text-mono-950 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Media Placeholder Gallery */}
        <div className="py-12 border-b border-mono-200">
          <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block mb-4">
            [PROJECT PHOTOGRAPHY]
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(project.gallery || [project.image]).map((img, idx) => (
              <div key={idx} className="aspect-[4/3] bg-mono-100 border border-mono-200 flex items-center justify-center font-mono text-xs text-mono-400 p-4 text-center">
                <span>[Site Photograph 0{idx + 1}]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Installed */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-b border-mono-200">
            <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block mb-2">
              [INSTALLED SYSTEMS]
            </span>
            <h2 className="text-heading-2 font-bold text-mono-950 mb-8">
              Products Specified in this Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Related Services Utilized */}
        {relatedServices.length > 0 && (
          <div className="py-16 border-b border-mono-200">
            <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block mb-2">
              [EXECUTION SCOPE]
            </span>
            <h2 className="text-heading-2 font-bold text-mono-950 mb-8">
              Services Deployed for this Execution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedServices.map((srv, idx) => (
                <ServiceCard key={srv.id} service={srv} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Enquiry Section */}
        <div className="py-16 max-w-2xl mx-auto">
          <EnquiryForm defaultService={project.scope} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ProjectDetail;
