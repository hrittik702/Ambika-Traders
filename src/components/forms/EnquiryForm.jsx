import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Ambika Traders — Enquiry Form Foundation Component (Stage 02)
 * Built with accessible input primitives, clear states, and natural Hinglish copy.
 */
export function EnquiryForm({ className, defaultService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: defaultService || 'aluminium-works',
    requirementDetails: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    { value: 'aluminium-works', label: 'Aluminium Doors & Windows' },
    { value: 'sliding-partitions', label: 'Sliding Systems & Glass Partitions' },
    { value: 'sanitaryware', label: 'Sanitaryware & Bath Solutions' },
    { value: 'modular-kitchens', label: 'Modular Kitchen Systems' },
    { value: 'wardrobes-interiors', label: 'Wardrobes & Interior Works' },
    { value: 'false-ceiling', label: 'False Ceiling & Panels' },
    { value: 'renovation', label: 'Renovation & Upgrades' },
    { value: 'other', label: 'Other Architectural Fabrication' },
  ];

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

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setStatus('error');
      setErrorMessage('Kripya 10-digit ka valid phone number darj karein.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    // Simulated submission for architecture foundation
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  if (status === 'success') {
    return (
      <div className={cn('p-8 bg-mono-950 text-mono-0 border border-mono-800 rounded-xs text-center space-y-4 shadow-card', className)}>
        <div className="w-12 h-12 rounded-full bg-mono-800 flex items-center justify-center mx-auto text-mono-0">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-heading-md font-semibold text-mono-0">Aapki Enquiry Receive Ho Gayi Hai</h3>
        <p className="text-mono-400 text-body-sm max-w-md mx-auto prose-editorial">
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
      className={cn('space-y-6 bg-mono-0 p-6 md:p-8 border border-mono-300 rounded-xs shadow-subtle', className)}
      noValidate
    >
      <div>
        <h3 className="text-heading-md font-semibold text-mono-950">
          Project Enquiry Karein
        </h3>
        <p className="text-body-sm text-mono-600 mt-1">
          Apni requirements share karein — humari team aapko sahi estimation aur guidance degi.
        </p>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="p-3.5 bg-mono-100 border border-mono-400 text-mono-950 text-xs flex items-center gap-2 rounded-xs"
        >
          <AlertCircle className="w-4 h-4 text-mono-950 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Aapka Naam"
          id="enquiry-name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Apna poora naam likhein"
        />

        <Input
          label="Phone Number"
          id="enquiry-phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 00000"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Email ID (Optional)"
          id="enquiry-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
        />

        <Select
          label="Product / Service Category"
          id="enquiry-service"
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          options={serviceOptions}
        />
      </div>

      <Textarea
        label="Project Ya Requirement Details"
        id="enquiry-details"
        name="requirementDetails"
        rows={3}
        value={formData.requirementDetails}
        onChange={handleChange}
        placeholder="Approximate dimensions, site status, ya special requirements ke baare mein likhein..."
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={status === 'loading'}
        rightIcon={<Send className="w-4 h-4" aria-hidden="true" />}
      >
        Enquiry Submit Karein
      </Button>
    </form>
  );
}

export default EnquiryForm;
