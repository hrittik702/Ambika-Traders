import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { fetchServiceById } from '@/lib/firebase/servicesService';
import { contactData } from '@/data/contact';

/**
 * Ambika Traders — Service Detail Page (Dynamic from Firestore)
 */
export function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchServiceById(slug);
        setService(data);
      } catch (e) {
        console.error('Failed to load service detail:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <PageContainer>
        <div className="content-container py-24 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
          Loading service specifications...
        </div>
      </PageContainer>
    );
  }

  if (!service) {
    return (
      <PageContainer>
        <div className="content-container py-20 text-center space-y-4">
          <h1 className="text-heading-xl font-bold">Service Mil Nahi Saki</h1>
          <p className="text-mono-600">Aap jis service ko dhoondh rahe hain wo abhi live nahi hai ya delete ho chuki hai.</p>
          <Button as="link" to="/services" variant="primary" size="md">
            Services List Par Wapas Jayein
          </Button>
        </div>
      </PageContainer>
    );
  }

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
            {service.description || service.hinglishHeadline}
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

          <div className="mt-8 pt-6 border-t border-mono-200 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`Namaste Ambika Traders, mujhe ${service.title} ke liye site visit aur quotation chahiye.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mono-950 text-mono-0 font-medium text-xs rounded-xs hover:bg-mono-850 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Par Site Visit Book Karein</span>
            </a>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="py-16 max-w-2xl mx-auto">
          <EnquiryForm defaultService={service.title} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ServiceDetail;
