import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import ProductCard from '@/components/cards/ProductCard';
import ServiceCard from '@/components/cards/ServiceCard';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { getProjectByIdOrSlug, getRelatedProductsForProject, getRelatedServicesForProject } from '@/data/relationships';

/**
 * Ambika Traders — Project Detail Page Shell (Stage 02)
 */
export function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectByIdOrSlug(slug);

  if (!project) {
    return (
      <PageContainer>
        <div className="content-container py-20 text-center space-y-4">
          <h1 className="text-heading-xl font-bold">Project Mil Nahi Saka</h1>
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
            <span className="font-mono text-eyebrow text-mono-400">SCOPE: {project.scope}</span>
          </div>

          <h1 className="text-heading-xl md:text-display-md font-bold text-mono-950 tracking-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-body-lg text-mono-600 leading-relaxed prose-editorial">
            {project.description}
          </p>

          {/* Project Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-8 pt-6 border-t border-mono-200">

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

        {/* Media Gallery */}
        <div className="py-12 border-b border-mono-200">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(project.gallery || [project.image]).map((img, idx) => (
              <div key={idx} className="aspect-[4/3]">
                <Image
                  src={img}
                  alt={`${project.title} - View 0${idx + 1}`}
                  aspect="service"
                  hoverZoom
                  fallbackLabel={`Site Photograph 0${idx + 1}`}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Installed */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-b border-mono-200">

            <h2 className="text-heading-lg font-bold text-mono-950 mb-8">
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

            <h2 className="text-heading-lg font-bold text-mono-950 mb-8">
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
