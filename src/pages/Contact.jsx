import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeading } from '../components/SectionHeading';
import { useApp } from '../context/AppContext';
import { createContactInquiry, openWhatsApp } from '../utils/whatsapp';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  ArrowRight,
  Info,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const Contact = () => {
  const { settings, products } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productInterest: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide a valid contact number.';
    } else {
      const cleanDigits = formData.phone.replace(/\D/g, '');
      if (cleanDigits.length < 10) {
        errors.phone = 'Please enter at least a 10-digit phone number.';
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    // Opens WhatsApp directly with formatted message
    createContactInquiry(formData, settings.whatsappNumber);
  };

  const handleGeneralWhatsApp = () => {
    openWhatsApp(
      'Hello AANGAN DOORS, I would like to get in touch regarding your wooden door collection and manufacturing services.',
      settings.whatsappNumber
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Contact & Inquiries' }]} />

      {/* Header */}
      <div className="border-b border-[#EAE0D2] pb-8">
        <SectionHeading
          eyebrow="Connect With Us"
          title="Direct WhatsApp & Workshop Inquiries"
          subtitle="AANGAN DOORS is based in Bhopal, Madhya Pradesh. For bespoke orders, dimension consultations, or catalog inquiries, connect with us directly over WhatsApp."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Business Information */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl text-[#251A16] font-medium border-b border-[#EAE0D2] pb-3">
              Manufacturing Workshop Info
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#EAE0D2] text-[#A98255] rounded-full shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#77716A] block font-medium">
                    Location
                  </span>
                  <p className="font-medium text-[#251A16] mt-0.5">
                    Bhopal, Madhya Pradesh, India
                  </p>
                  <p className="text-xs text-[#77716A] mt-0.5">
                    Woodworking Workshop & Digital Showroom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#EAE0D2] text-[#A98255] rounded-full shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#77716A] block font-medium">
                    Primary WhatsApp Channel
                  </span>
                  <p className="font-medium text-[#251A16] mt-0.5">
                    +91 {settings.whatsappNumber.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}
                  </p>
                  <p className="text-xs text-[#77716A] mt-0.5">
                    Dedicated business messaging & instant catalog shares
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#EAE0D2] text-[#A98255] rounded-full shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#77716A] block font-medium">
                    Workshop Inquiries
                  </span>
                  <p className="font-medium text-[#251A16] mt-0.5">
                    {settings.operatingHours || 'Monday – Saturday: 9:30 AM – 7:00 PM IST'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGeneralWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#A98255]" />
                <span>Open Instant WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="p-4 rounded-sm bg-[#FAF7F2] border border-[#EAE0D2] flex items-start gap-3 text-xs text-[#77716A] leading-relaxed">
            <Info className="w-4 h-4 text-[#A98255] shrink-0 mt-0.5" />
            <p>
              AANGAN DOORS operates as an inquiry-based manufacturer. We do not process online credit card checkouts. All bespoke dimensions, timber selections, and orders are finalized through WhatsApp consultations.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-6 sm:p-10 space-y-6">
          <div className="space-y-2 border-b border-[#EAE0D2] pb-4">
            <h2 className="font-serif text-2xl text-[#251A16] font-normal">
              Send an Inquiry via WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
              Fill in your project details below. When you click "Continue on WhatsApp", your message will be formatted and opened directly in WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                  Your Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded text-[#251A16] placeholder-[#77716A]/60 focus:outline-hidden focus:border-[#A98255] transition-colors ${
                    formErrors.name ? 'border-red-500' : 'border-[#EAE0D2]'
                  }`}
                />
                {formErrors.name && (
                  <span className="text-[11px] text-red-600 block">{formErrors.name}</span>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                  Contact / WhatsApp Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 98765 43210"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded text-[#251A16] placeholder-[#77716A]/60 focus:outline-hidden focus:border-[#A98255] transition-colors ${
                    formErrors.phone ? 'border-red-500' : 'border-[#EAE0D2]'
                  }`}
                />
                {formErrors.phone && (
                  <span className="text-[11px] text-red-600 block">{formErrors.phone}</span>
                )}
              </div>
            </div>

            {/* Product Interest (Optional Dropdown) */}
            <div className="space-y-1.5">
              <label htmlFor="productInterest" className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Interested Door Model (Optional)
              </label>
              <select
                id="productInterest"
                value={formData.productInterest}
                onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] transition-colors cursor-pointer"
              >
                <option value="">Select a door design from catalog (optional)</option>
                <option value="Custom Architectural Design">Custom Architectural Design (New Blueprint)</option>
                {products.map((p) => (
                  <option key={p.id} value={`${p.name} (${p.id})`}>
                    {p.name} — {p.id} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Message / Dimensions / Timber Requirements
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your rough dimensions, desired timber type (e.g. Teak, Walnut), or carving style preferences..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#EAE0D2] rounded text-[#251A16] placeholder-[#77716A]/60 focus:outline-hidden focus:border-[#A98255] transition-colors resize-y"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded shadow-sm transition-all duration-200 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-[#A98255]" />
                <span>Continue on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#77716A] text-center pt-1">
              Your inquiry details will be securely prepared and transferred to WhatsApp where our team will respond directly.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
