import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { fetchProductById } from '@/lib/firebase/productsService';
import { useCart } from '@/context/CartContext';
import { scrollToTarget } from '@/lib/lenis';

/**
 * Ambika Traders — Product Detail Page (Dynamic from Firestore)
 */
export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchProductById(slug);
        setProduct(data);
      } catch (e) {
        console.error('Failed to load product detail:', e);
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
          Loading product specifications...
        </div>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <div className="content-container py-20 text-center space-y-4">
          <h1 className="text-heading-xl font-bold">Product Mil Nahi Saka</h1>
          <p className="text-mono-600">Aap jis product ko dhoondh rahe hain wo abhi live nahi hai ya delete ho chuka hai.</p>
          <Button as="link" to="/products" variant="primary" size="md">
            Sabhi Products Par Wapas Jayein
          </Button>
        </div>
      </PageContainer>
    );
  }

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
              src={product.image || '/images/products/slim-sliding-window.jpg'}
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
                <Badge variant="outline">{product.categoryName || 'Architectural System'}</Badge>
                <span className="font-mono text-xs text-mono-400 font-medium">ID: {product.id}</span>
              </div>

              <h1 className="text-heading-xl md:text-display-md font-bold text-mono-950 tracking-tight">
                {product.name}
              </h1>

              <p className="mt-4 text-body text-mono-600 leading-relaxed prose-editorial">
                {product.description || product.hinglishHeadline}
              </p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-mono-200">

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

            {/* Price Note & Actions */}
            <div className="mt-8 pt-6 border-t border-mono-200 space-y-3">
              <div className="text-xs font-mono text-mono-500 uppercase">
                Estimate: <strong className="text-mono-950">{product.price || 'Custom Quote on Measurement'}</strong>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => addItem(product)}
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                >
                  Quotation Cart Mein Add Karein
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleScrollToEnquiry}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Direct Form Bharein
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Enquiry Section Anchor */}
        <div id="enquiry-section" className="py-16 max-w-2xl mx-auto">
          <EnquiryForm defaultService={product.categoryName || product.name} />
        </div>
      </div>
    </PageContainer>
  );
}

export default ProductDetail;
