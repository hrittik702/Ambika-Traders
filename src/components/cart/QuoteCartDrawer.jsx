import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingBag, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import { submitQuoteEnquiry } from '@/lib/firebase/enquiriesService';
import { contactData } from '@/data/contact';
import { cn } from '@/lib/utils';

export function QuoteCartDrawer() {
  const { items, totalCount, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Kripya apna poora naam enter karein.';
    
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!phoneClean) {
      errs.phone = 'Mobile number zaroori hai.';
    } else if (phoneClean.length !== 10) {
      errs.phone = 'Kripya valid 10-digit mobile number enter karein.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address enter karein.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address enter karein.';
    }

    if (!formData.address.trim()) {
      errs.address = 'Site / Delivery address zaroori hai.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (items.length === 0) {
      setErrorMessage('Aapke cart mein koi product ya service nahi hai.');
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitQuoteEnquiry({
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
        },
        items,
        notes: formData.notes,
        type: 'cart_quotation',
      });

      setSubmittedRefId(res.id);
      setSubmitSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Quote submission error:', err);
      setErrorMessage(err.message || 'Quotation submit karne mein dikkat aayi. Kripya dobara try karein.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmittedRefId('');
    setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
    setErrors({});
    closeCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quotation Cart Drawer"
      className="fixed inset-0 z-modal bg-mono-950/60 backdrop-blur-sm flex justify-end animate-fade-in font-intern"
      onClick={closeCart}
    >
      <div
        className="w-full max-w-xl bg-mono-0 h-full flex flex-col shadow-floating border-l border-mono-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-mono-200 flex items-center justify-between bg-mono-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-mono-950 text-mono-0 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-sm font-bold text-mono-950 uppercase tracking-tight">
                Quotation Cart
              </h2>
              <span className="font-mono text-xs text-mono-500">
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'} Selected • No Login Required
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-mono-600 hover:text-mono-950 hover:bg-mono-200 rounded-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-950"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submitSuccess ? (
            /* Success View */
            <div className="text-center py-12 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-mono-950 text-mono-0 rounded-full flex items-center justify-center mx-auto shadow-card">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
                  [QUOTATION REQUEST REGISTERED]
                </span>
                <h3 className="text-heading-lg font-bold text-mono-950">
                  Quotation Enquiry Submit Ho Gayi!
                </h3>
                <p className="text-body-sm text-mono-600 max-w-md mx-auto">
                  Dhanyawad <strong>{formData.name}</strong>. Aapke selected items aur site address ka quotation request hamari technical team ko receive ho gaya hai.
                </p>
                <div className="p-3 bg-mono-50 border border-mono-200 rounded-xs inline-block font-mono text-xs text-mono-700">
                  Ref ID: <span className="font-bold text-mono-950">{submittedRefId}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3 max-w-sm mx-auto">
                <a
                  href={`https://wa.me/${contactData.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`Namaste Ambika Traders, maine website par quotation submit kiya hai (Ref: ${submittedRefId}). Kripya details check karein.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-mono-950 text-mono-0 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-mono-850 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Par Direct Update Lein</span>
                </a>
                <Button variant="secondary" size="md" onClick={handleReset}>
                  Naye Products Dekhein
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-mono-200">
                  <span className="font-mono text-xs text-mono-500 uppercase tracking-wider">
                    [SELECTED PRODUCTS & SERVICES]
                  </span>
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-mono-500 hover:text-mono-950 font-mono underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="p-8 text-center bg-mono-50 border border-mono-200 rounded-xs space-y-2">
                    <p className="text-body-sm text-mono-600 font-medium">Aapka quotation cart abhi empty hai.</p>
                    <p className="text-xs text-mono-400">Products ya Services page se items add karein.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-mono-200 border border-mono-200 rounded-xs overflow-hidden">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 bg-mono-0 flex items-start gap-4 hover:bg-mono-50 transition-colors">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || item.title}
                            className="w-16 h-16 object-cover rounded-xs border border-mono-200 shrink-0 bg-mono-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xs border border-mono-200 bg-mono-100 flex items-center justify-center text-xs font-mono text-mono-500 shrink-0">
                            SPEC
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="text-body-sm font-semibold text-mono-950 truncate">
                            {item.name || item.title}
                          </h4>
                          <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">
                            {item.categoryName || item.category || item.itemType}
                          </span>
                          <span className="font-mono text-xs text-mono-700 font-medium block mt-1">
                            {item.price || 'Price on Enquiry'}
                          </span>
                        </div>

                        {/* Quantity controls & delete */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-mono-400 hover:text-mono-950 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>

                          <div className="flex items-center border border-mono-300 rounded-xs bg-mono-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="p-1 text-mono-700 hover:bg-mono-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono text-xs font-semibold text-mono-950 min-w-6 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="p-1 text-mono-700 hover:bg-mono-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Checkout Form */}
              {items.length > 0 && (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-mono-200">
                  <div className="bg-mono-950 text-mono-0 p-4 rounded-xs">
                    <span className="font-mono text-[0.7rem] text-mono-400 uppercase tracking-widest block mb-1">
                      [STEP 2: CUSTOMER & SITE DETAILS]
                    </span>
                    <p className="text-xs text-mono-300">
                      Sahi quotation aur site measurement ke liye details bharein (No login required).
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                      {errorMessage}
                    </div>
                  )}

                  <Input
                    id="cart-name"
                    name="name"
                    label="Aapka Poora Naam *"
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="cart-phone"
                      name="phone"
                      label="Mobile Number (10 Digits) *"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      required
                    />

                    <Input
                      id="cart-email"
                      name="email"
                      label="Email Address *"
                      type="email"
                      placeholder="e.g. ramesh@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Textarea
                    id="cart-address"
                    name="address"
                    label="Site / Delivery Address *"
                    placeholder="Plot / Flat No, Street, Landmark, City (e.g. Shop No 4, Ring Road, Raipur)"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                  />

                  <Textarea
                    id="cart-notes"
                    name="notes"
                    label="Project Requirements / Dimensions (Optional)"
                    placeholder="e.g. 3 aluminium windows (4x5 ft) and 1 glass partition needed."
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Official Quotation Request Submit Karein
                    </Button>
                  </div>

                  <p className="text-[0.7rem] font-mono text-mono-500 text-center">
                    Direct showroom WhatsApp aur phone call par technical verification hoga.
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuoteCartDrawer;
