import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeading } from '../components/SectionHeading';
import { useApp } from '../context/AppContext';
import { createCustomDesignInquiry } from '../utils/whatsapp';
import { handleImageError } from '../utils/imageUtils';
import {
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
  FileCheck,
  Hammer
} from 'lucide-react';

export const Production = () => {
  const { content, settings } = useApp();

  const handleInquiry = () => {
    createCustomDesignInquiry(settings.whatsappNumber);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Top Banner / Hero */}
      <section className="bg-[#251A16] text-[#EAE0D2] py-16 sm:py-24 border-b border-[#39271F] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Breadcrumbs items={[{ label: 'Production' }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
              Manufacturing Precision
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
              {content.productionTitle || 'From Seasoned Timber to Finished Masterpiece'}
            </h1>
            <p className="text-base sm:text-lg text-[#EAE0D2]/80 leading-relaxed font-light">
              {content.productionIntro ||
                'Our manufacturing workflow marries careful raw timber grading with computer-aided CNC precision carving and hand-rubbed artisanal finishes.'}
            </p>
          </div>
        </div>

        {/* Decorative background watermarks */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none pr-8 hidden lg:block">
          <Cpu className="w-96 h-96 text-[#A98255]" />
        </div>
      </section>

      {/* SECTION 1: MANUFACTURING OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <SectionHeading
              eyebrow="The Philosophy"
              title="Modern Precision Meets Authentic Joinery"
              subtitle="At AANGAN DOORS, door fabrication is not an assembly line compromise. We treat timber as a living, architectural material that requires both technological discipline and craft sensitivity."
              className="mb-4"
            />
            <p className="text-sm text-[#77716A] leading-relaxed">
              Every door commission undergoes a structured sequence: timber selection and moisture testing, CAD toolpath programming, CNC multi-axis routing, solid mortise joinery, hand scraping, and multi-coat surface sealing.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs text-[#251A16] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                <span>Seasoned Solid Woods</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                <span>Micro-Calibrated CNC Depth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                <span>Acoustic Core Options</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                <span>Hand-Rubbed Finishes</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border border-[#EAE0D2] shadow-xl aspect-4/3 bg-[#251A16]">
              <img
                src="/images/production-workshop.svg"
                alt="Woodworking workshop and door framing process with artisanal joinery"
                onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#251A16]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-[#EAE0D2]">
                <p className="font-serif text-sm text-white">Workshop Assembly & Timber Framing</p>
                <p className="text-[11px] text-[#A98255]">Artisanal joinery, mortise alignment, and clamping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: CNC MACHINERY & DESIGN PLANNING */}
      <section className="bg-[#FAF7F2] border-y border-[#EAE0D2] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Technology & Planning"
            title="Digital Precision Through CNC Machinery"
            subtitle="How CAD modeling and automated routing enable complex three-dimensional relief patterns and flawless symmetry."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step Card 1: CAD / CAM */}
            <div className="bg-white rounded-sm border border-[#EAE0D2] p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="aspect-16/9 rounded overflow-hidden bg-[#251A16] relative mb-4 border border-[#EAE0D2]">
                <img
                  src="/images/production-cad.svg"
                  alt="CAD/CAM technical workstation showing architectural wooden door blueprint and CNC vector cutter paths"
                  onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#A98255]">
                Phase 1: Digital Toolpath Engineering
              </span>
              <h3 className="font-serif text-xl text-[#251A16]">CAD / CAM Design Translation</h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Architectural motifs, traditional jali geometry, and custom homeowner sketches are digitized into precise vector geometry. Cutting angles, tool speeds, and step-downs are calibrated to avoid wood tear-out on delicate contours.
              </p>
            </div>

            {/* Step Card 2: CNC Multi-Axis Machine */}
            <div className="bg-white rounded-sm border border-[#EAE0D2] p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="aspect-16/9 rounded overflow-hidden bg-[#251A16] relative mb-4 border border-[#EAE0D2]">
                <img
                  src="/images/production-cnc.svg"
                  alt="Industrial multi-axis CNC wood router machine cutting solid timber door panel with spinning spindle and wood relief"
                  onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#A98255]">
                Phase 2: Multi-Axis CNC Carving
              </span>
              <h3 className="font-serif text-xl text-[#251A16]">High-Precision Relief Machining</h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Industrial router spindles carve into dense timber with sub-millimeter repeatable accuracy. This guarantees that double-door pairs align with total symmetry and that deep multi-level reliefs maintain crisp edges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4, 5, 6: MATERIAL PREP, FINISHING & INSPECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          eyebrow="Craftsmanship Workflow"
          title="The Multi-Stage Finishing Process"
          subtitle="Precision machining is only half the journey. Hand scraping, sanding, and multi-tier sealing protect the wood against humidity and seasonal expansion."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1: Sanding & Detailing */}
          <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-6 space-y-4">
            <div className="aspect-16/10 rounded overflow-hidden bg-[#251A16] border border-[#EAE0D2] mb-3">
              <img
                src="/images/production-sanding.svg"
                alt="Wood artisan hand-sanding carved door grooves with fine detailing tools"
                onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EAE0D2] text-[#A98255] flex items-center justify-center font-serif font-bold text-xs">
                1
              </span>
              <h3 className="font-serif text-lg font-medium text-[#251A16]">Hand Sanding & Detailing</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
              After CNC carving, experienced wood artisans hand-sand intricate crevices, soften sharp corners, and remove micro-chatter, ensuring tactile smoothness across every contour.
            </p>
          </div>

          {/* Step 2: Finishing & Polishing */}
          <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-6 space-y-4">
            <div className="aspect-16/10 rounded overflow-hidden bg-[#251A16] border border-[#EAE0D2] mb-3">
              <img
                src="/images/production-finishing.svg"
                alt="Applying hand-rubbed timber stain and protective clear sealant coat"
                onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EAE0D2] text-[#A98255] flex items-center justify-center font-serif font-bold text-xs">
                2
              </span>
              <h3 className="font-serif text-lg font-medium text-[#251A16]">Finishing & Sealing</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
              Doors receive deep penetrating wood stains and exterior-grade polyurethane or oil coats. Multi-layer applications protect the wood against humidity and seasonal expansion.
            </p>
          </div>

          {/* Step 3: Inspection */}
          <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-6 space-y-4">
            <div className="aspect-16/10 rounded overflow-hidden bg-[#251A16] border border-[#EAE0D2] mb-3">
              <img
                src="/images/production-inspection.svg"
                alt="Precision digital caliper and moisture meter measuring door squareness and moisture content"
                onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EAE0D2] text-[#A98255] flex items-center justify-center font-serif font-bold text-xs">
                3
              </span>
              <h3 className="font-serif text-lg font-medium text-[#251A16]">Quality & Fit Inspection</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
              We verify dimensional tolerance, frame squareness, moisture content (&lt;10%), and lockset mortise alignments before each finished door is carefully wrapped for dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: QUALITY BENCHMARKS & TRANSPARENCY NOTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-[#EAE0D2] text-[#A98255] rounded-full shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-[#251A16]">
                Process Transparency & Production Standards
              </h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Images shown across this production overview serve as visual demonstrations of the CAD/CAM engineering, CNC carving, and hand-finishing techniques utilized at AANGAN DOORS in Bhopal. Specific timber species, machine cutter profiles, and dimensions are calibrated per client commission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CUSTOM INQUIRY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#251A16] text-[#EAE0D2] rounded-sm p-8 sm:p-12 text-center space-y-5 border border-[#39271F] shadow-xl">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
            Custom Orders
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            Request a Custom Manufacturing Quote
          </h2>
          <p className="text-sm sm:text-base text-[#EAE0D2]/80 max-w-xl mx-auto leading-relaxed">
            Need custom architectural door heights, specific wood grains, or bespoke CAD carvings? Connect directly with our Bhopal team over WhatsApp.
          </p>
          <div className="pt-2">
            <button
              onClick={handleInquiry}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-[#A98255] hover:bg-[#B89255] rounded-xs shadow-md transition-colors"
            >
              <span>Discuss Specifications on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
