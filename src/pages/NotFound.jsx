import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

/**
 * Ambika Traders — 404 Not Found Page
 */
export function NotFound() {
  return (
    <PageContainer>
      <div className="content-container py-24 text-center max-w-2xl mx-auto space-y-6">
        <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
          [ERROR 404 — PAGE NOT FOUND]
        </span>
        <h1 className="text-display-lg font-bold text-mono-950">
          Ye Page Mil Nahi Saka
        </h1>
        <p className="text-body text-mono-600">
          Aap jis URL par aaye hain wo exist nahi karta ya move ho chuka hai. Kripya homepage ya catalog par wapas jayein.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as="link"
            to="/"
            variant="primary"
            size="lg"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Home Par Jayein
          </Button>
          <Button
            as="link"
            to="/products"
            variant="outline"
            size="lg"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Products Catalog Dekhein
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default NotFound;
