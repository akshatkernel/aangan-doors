import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Save, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { initialContent } from '../data/initialContent';

export const ContentManagement = () => {
  const { content, updateContent, showToast } = useApp();
  const [formData, setFormData] = useState({ ...content });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateContent(formData);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website text to default demonstration copy?')) {
      setFormData({ ...initialContent });
      updateContent(initialContent);
      showToast('Website content restored to defaults.', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE0D2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
            Editorial Copy
          </span>
          <h2 className="font-serif text-2xl text-[#251A16] font-medium mt-0.5">
            Website Content Management
          </h2>
          <p className="text-xs text-[#77716A] mt-0.5">
            Modify text across the homepage hero, manufacturing editorial, about story, and footer.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#77716A] hover:text-[#251A16] border border-[#EAE0D2] rounded hover:bg-white self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Homepage Hero Section */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE0D2] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#251A16] border-b border-[#EAE0D2] pb-2">
            Homepage Hero Section
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Hero Eyebrow Tag
            </label>
            <input
              type="text"
              value={formData.heroBadge || ''}
              onChange={(e) => handleChange('heroBadge', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={formData.heroHeading || ''}
              onChange={(e) => handleChange('heroHeading', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Hero Supporting Subheadline
            </label>
            <textarea
              rows="2"
              value={formData.heroSubheading || ''}
              onChange={(e) => handleChange('heroSubheading', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] resize-y"
            />
          </div>
        </div>

        {/* Brand Intro & Manufacturing Highlights */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE0D2] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#251A16] border-b border-[#EAE0D2] pb-2">
            Brand Introduction & CNC Highlight
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Brand Introduction Heading
            </label>
            <input
              type="text"
              value={formData.brandIntroHeading || ''}
              onChange={(e) => handleChange('brandIntroHeading', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Brand Introduction Body Text
            </label>
            <textarea
              rows="3"
              value={formData.brandIntroText || ''}
              onChange={(e) => handleChange('brandIntroText', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Manufacturing Heading
              </label>
              <input
                type="text"
                value={formData.manufacturingHeading || ''}
                onChange={(e) => handleChange('manufacturingHeading', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Customization CTA Heading
              </label>
              <input
                type="text"
                value={formData.customizationHeading || ''}
                onChange={(e) => handleChange('customizationHeading', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
              />
            </div>
          </div>
        </div>

        {/* About & Production Pages Intro */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE0D2] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#251A16] border-b border-[#EAE0D2] pb-2">
            About & Production Page Introductions
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              About Page Heading
            </label>
            <input
              type="text"
              value={formData.aboutTitle || ''}
              onChange={(e) => handleChange('aboutTitle', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              About Page Lead Paragraph
            </label>
            <textarea
              rows="2"
              value={formData.aboutIntro || ''}
              onChange={(e) => handleChange('aboutIntro', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] resize-y"
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Production Page Heading
            </label>
            <input
              type="text"
              value={formData.productionTitle || ''}
              onChange={(e) => handleChange('productionTitle', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>
        </div>

        {/* Footer Text */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE0D2] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#251A16] border-b border-[#EAE0D2] pb-2">
            Footer Company Bio
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Footer Description
            </label>
            <textarea
              rows="2"
              value={formData.footerText || ''}
              onChange={(e) => handleChange('footerText', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] resize-y"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded transition-colors shadow-xs"
          >
            <Save className="w-4 h-4 text-[#A98255]" />
            <span>Save Website Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
