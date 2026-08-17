import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Enquiry Form Foundation Component
 * Accessible, state-aware form control shell with Hinglish labels.
 */
export function EnquiryForm({ className, defaultService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: defaultService || 'aluminium-works',
    projectLocation: '',
    requirementDetails: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Kripya apna naam aur valid phone number zaroor darj karein.');
      return;
    }

    setStatus('loading');
    // Simulated submission for architecture foundation
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className={cn('p-8 bg-mono-950 text-mono-0 border border-mono-800 rounded-xs text-center space-y-4', className)}>
        <div className="w-12 h-12 rounded-full bg-mono-800 flex items-center justify-center mx-auto text-mono-0">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-heading-3 font-semibold">Aapki Enquiry Receive Ho Gayi Hai</h3>
        <p className="text-mono-400 text-body-sm max-w-md mx-auto">
          Dhanyawad! Ambika Traders ki technical team aapse jald hi contact karegi aur project requirements par detail mein discuss karegi.
        </p>
        <Button
          variant="inverseOutline"
          size="sm"
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              phone: '',
              email: '',
              serviceInterest: 'aluminium-works',
              projectLocation: '',
              requirementDetails: '',
            });
          }}
        >
          Nayi Enquiry Karein
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6 bg-mono-0 p-6 md:p-8 border border-mono-200 rounded-xs', className)}
      noValidate
    >
      <div>
        <h3 className="text-heading-4 font-semibold text-mono-950">
          Project Enquiry Karein
        </h3>
        <p className="text-body-sm text-mono-600 mt-1">
          Apni requirements share karein — humari team aapko sahi estimation aur guidance degi.
        </p>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="p-3.5 bg-mono-100 border border-mono-300 text-mono-950 text-xs flex items-center gap-2 rounded-xs"
        >
          <AlertCircle className="w-4 h-4 text-mono-950 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label htmlFor="enquiry-name" className="block text-xs font-semibold uppercase tracking-wider text-mono-800 mb-1.5 font-mono">
            Aapka Naam *
          </label>
          <input
            type="text"
            id="enquiry-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Apna poora naam likhein"
            className="w-full px-4 py-3 text-sm bg-mono-50 border border-mono-300 rounded-xs focus:bg-mono-0 focus:border-mono-950 focus:outline-none focus:ring-1 focus:ring-mono-950 text-mono-950 transition-colors"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="enquiry-phone" className="block text-xs font-semibold uppercase tracking-wider text-mono-800 mb-1.5 font-mono">
            Phone Number *
          </label>
          <input
            type="tel"
            id="enquiry-phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 00000"
            className="w-full px-4 py-3 text-sm bg-mono-50 border border-mono-300 rounded-xs focus:bg-mono-0 focus:border-mono-950 focus:outline-none focus:ring-1 focus:ring-mono-950 text-mono-950 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email Field */}
        <div>
          <label htmlFor="enquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-mono-800 mb-1.5 font-mono">
            Email ID (Optional)
          </label>
          <input
            type="email"
            id="enquiry-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full px-4 py-3 text-sm bg-mono-50 border border-mono-300 rounded-xs focus:bg-mono-0 focus:border-mono-950 focus:outline-none focus:ring-1 focus:ring-mono-950 text-mono-950 transition-colors"
          />
        </div>

        {/* Service Category */}
        <div>
          <label htmlFor="enquiry-service" className="block text-xs font-semibold uppercase tracking-wider text-mono-800 mb-1.5 font-mono">
            Kis Product / Service Mein Interest Hai?
          </label>
          <select
            id="enquiry-service"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm bg-mono-50 border border-mono-300 rounded-xs focus:bg-mono-0 focus:border-mono-950 focus:outline-none focus:ring-1 focus:ring-mono-950 text-mono-950 transition-colors"
          >
            <option value="aluminium-works">Aluminium Doors & Windows</option>
            <option value="sliding-partitions">Sliding Systems & Glass Partitions</option>
            <option value="sanitaryware">Sanitaryware & Bath Solutions</option>
            <option value="modular-kitchens">Modular Kitchen Systems</option>
            <option value="wardrobes-interiors">Wardrobes & Interior Works</option>
            <option value="false-ceiling">False Ceiling & Panels</option>
            <option value="renovation">Renovation & Upgrades</option>
            <option value="other">Other Architectural Works</option>
          </select>
        </div>
      </div>

      {/* Requirement Details */}
      <div>
        <label htmlFor="enquiry-details" className="block text-xs font-semibold uppercase tracking-wider text-mono-800 mb-1.5 font-mono">
          Project Ya Requirement Details
        </label>
        <textarea
          id="enquiry-details"
          name="requirementDetails"
          rows={3}
          value={formData.requirementDetails}
          onChange={handleChange}
          placeholder="Approximate dimensions, site status, ya special requirements ke baare mein likhein..."
          className="w-full px-4 py-3 text-sm bg-mono-50 border border-mono-300 rounded-xs focus:bg-mono-0 focus:border-mono-950 focus:outline-none focus:ring-1 focus:ring-mono-950 text-mono-950 transition-colors resize-y"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={status === 'loading'}
        rightIcon={<Send className="w-4 h-4" />}
      >
        Enquiry Submit Karein
      </Button>
    </form>
  );
}

export default EnquiryForm;
