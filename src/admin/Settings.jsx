import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Save, AlertCircle, Phone, Compass, Building, Tag } from 'lucide-react';
import { sanitizePhoneNumber } from '../utils/whatsapp';

export const Settings = () => {
  const { settings, updateSettings, showToast } = useApp();

  const [formData, setFormData] = useState({
    brandName: settings.brandName || 'AANGAN DOORS',
    tagline: settings.tagline || 'Crafted with Precision. Designed to Last.',
    location: settings.location || 'Bhopal, Madhya Pradesh, India',
    whatsappNumber: settings.whatsappNumber || '917879626597',
    operatingHours: settings.operatingHours || 'Monday – Saturday: 9:30 AM – 7:00 PM IST',
    footerText: settings.footerText || ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Strict WhatsApp number validation
    const rawNumber = formData.whatsappNumber.trim();
    if (!rawNumber) {
      setError('WhatsApp number cannot be blank.');
      return;
    }

    const cleanNumber = sanitizePhoneNumber(rawNumber);
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      setError('Please provide a valid WhatsApp number with country code (e.g. 917879626597).');
      return;
    }

    const payload = {
      ...formData,
      whatsappNumber: cleanNumber
    };

    updateSettings(payload);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-[#EAE0D2]">
        <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
          Configuration
        </span>
        <h2 className="font-serif text-2xl text-[#251A16] font-medium mt-0.5">
          Website Settings
        </h2>
        <p className="text-xs text-[#77716A] mt-0.5">
          Configure business identity, location, and the primary WhatsApp inquiry destination.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE0D2] shadow-xs space-y-6">
        {/* Brand Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Brand Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Tagline
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Inquiry Routing */}
        <div className="space-y-2 p-4 bg-[#FAF7F2] border border-[#EAE0D2] rounded">
          <label className="text-xs uppercase tracking-wider text-[#251A16] font-semibold block">
            Primary Business WhatsApp Number <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#A98255] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="e.g. 917879626597"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#EAE0D2] rounded text-[#251A16] font-mono focus:outline-hidden focus:border-[#A98255]"
            />
          </div>
          <p className="text-[11px] text-[#77716A] leading-relaxed">
            Include country code without "+" or dashes (e.g. <strong>917879626597</strong> for India). Changes immediately update all floating buttons, product inquiry CTAs, and wishlist transfer links.
          </p>
        </div>

        {/* Business Location & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Business Location
            </label>
            <div className="relative">
              <Compass className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Workshop Operating Hours
            </label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#EAE0D2] flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded transition-colors shadow-xs"
          >
            <Save className="w-4 h-4 text-[#A98255]" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
