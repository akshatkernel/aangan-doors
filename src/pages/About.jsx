import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeading } from '../components/SectionHeading';
import { useApp } from '../context/AppContext';
import { createCustomDesignInquiry } from '../utils/whatsapp';
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const About = () => {
  const { content, settings } = useApp();

  const handleInquiry = () => {
    createCustomDesignInquiry(settings.whatsappNumber);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Header */}
      <section className="bg-[#251A16] text-[#EAE0D2] py-16 sm:py-24 border-b border-[#39271F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
              Brand Story
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
              {content.aboutTitle || 'Rooted in Craft. Shaped by Precision.'}
            </h1>
            <p className="text-base sm:text-lg text-[#EAE0D2]/80 leading-relaxed font-light">
              {content.aboutIntro ||
                'Based in Bhopal, Madhya Pradesh, AANGAN DOORS was established with a singular focus: to engineer wooden doors that combine the warmth of natural timber with the unyielding accuracy of modern machinery.'}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Introduction & Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
              Our Approach
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#251A16] font-normal leading-snug">
              Every Door is an Architectural Threshold
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#77716A] leading-relaxed font-light">
              <p>
                In Indian architectural tradition, the threshold (the aangan entrance) is the ceremonial dividing line between the public world and the warmth of home. We believe this gateway deserves more than flat industrial fiberboard.
              </p>
              <p>
                AANGAN DOORS specializes in manufacturing doors using seasoned solid hardwoods—primarily high-grade teak, walnut, padauk, and steam beech. We pair these natural timbers with precision CAD-programmed CNC routing to execute deep reliefs, clean linear chamfers, and bespoke jaali cutouts.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border border-[#EAE0D2] shadow-xl aspect-4/3 bg-[#FAF7F2]">
              <img
                src="/images/hero-door.svg"
                alt="Architectural entrance door crafted with timber and CNC detailing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#251A16]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
                <p className="font-serif text-sm">AANGAN DOORS Workshop Commission</p>
                <p className="text-[11px] text-[#A98255]">Bhopal, Madhya Pradesh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy & Pillars */}
      <section className="bg-[#FAF7F2] border-y border-[#EAE0D2] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Core Values"
            title="Our Manufacturing Pillars"
            subtitle="The fundamental disciplines that guide every timber door crafted in our workshop."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-sm border border-[#EAE0D2] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#251A16]">Honest Material Selection</h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                We prioritize properly seasoned solid hardwoods and select natural veneers over artificial substitutes. This ensures enduring weight, tactile warmth, and rich grain presence.
              </p>
            </div>

            <div className="bg-white p-7 rounded-sm border border-[#EAE0D2] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#251A16]">CNC Carving Precision</h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Computer-aided multi-axis CNC routing ensures that ornate patterns, geometric chevrons, and classical panel reveals are executed with mathematical symmetry and uniform depth.
              </p>
            </div>

            <div className="bg-white p-7 rounded-sm border border-[#EAE0D2] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#251A16]">Bespoke Customization</h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                No two architectural blueprints are identical. We adjust door widths, heights, frame rebates, and lock mortises to align directly with client plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Quality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
              Discipline & Finishing
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#251A16] font-normal">
              Commitment to Long-Term Structural Stability
            </h2>
            <p className="text-sm sm:text-base text-[#77716A] leading-relaxed font-light">
              Wood is responsive to atmospheric moisture. At AANGAN DOORS, we employ edge-glued core lamination, balanced face construction, and penetrating moisture sealants to minimize seasonal warping, binding, or joint separation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#EAE0D2]">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#251A16] block">Kiln-Dried Timber</span>
              <p className="text-xs text-[#77716A]">Properly conditioned to reduce interior moisture.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#251A16] block">Mortise Joinery</span>
              <p className="text-xs text-[#77716A]">Interlocking stile-and-rail structural strength.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#251A16] block">Multi-Layer Polyurethane</span>
              <p className="text-xs text-[#77716A]">Protective exterior coatings with UV filters.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#251A16] block">Bhopal Workshop Direct</span>
              <p className="text-xs text-[#77716A]">Manufactured locally with direct builder support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#251A16] text-[#EAE0D2] rounded-sm p-8 sm:p-14 space-y-5 border border-[#39271F] shadow-xl">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
            Start a Conversation
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            Ready to Discuss Your Wooden Door Requirements?
          </h2>
          <p className="text-sm sm:text-base text-[#EAE0D2]/80 max-w-xl mx-auto leading-relaxed">
            Whether for a residential villa in Bhopal, an interior renovation, or an architectural project, we invite you to inquire directly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-[#A98255] hover:bg-[#B89255] rounded-xs shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </button>
            <Link
              to="/collections"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F7F3EC] bg-transparent hover:bg-white/10 border border-[#EAE0D2]/40 rounded-xs transition-colors text-center"
            >
              View Door Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
