import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { createCustomDesignInquiry } from '../utils/whatsapp';
import {
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Compass,
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Home = () => {
  const { products, categories, content, settings } = useApp();

  // Featured products (up to 4-6)
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  const handleCustomInquiry = () => {
    createCustomDesignInquiry(settings.whatsappNumber);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#251A16] text-white">
        {/* Background Architectural Door Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-door.svg"
            alt="AANGAN DOORS Handcrafted Architectural Wooden Door"
            className="w-full h-full object-cover object-center opacity-70 transform scale-102"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#251A16] via-[#251A16]/60 to-[#251A16]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D2]/15 border border-[#A98255]/40 text-[#EAE0D2] text-xs uppercase tracking-[0.25em] backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A98255]"></span>
            <span>{content.heroBadge || 'Architectural Wooden Doors • Bhopal, India'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.15] tracking-tight max-w-4xl mx-auto">
            {content.heroHeading || 'Crafted with Precision. Designed to Last.'}
          </h1>

          <p className="text-base sm:text-lg text-[#EAE0D2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            {content.heroSubheading ||
              'Discover thoughtfully crafted wooden doors where timeless design meets modern CNC precision.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#251A16] bg-[#A98255] hover:bg-[#B89255] rounded-xs shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-1px] text-center"
            >
              Explore Collections
            </Link>
            <Link
              to="/production"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] bg-transparent hover:bg-white/10 border border-[#EAE0D2]/40 rounded-xs transition-all duration-300 text-center"
            >
              Discover Our Craft
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: BRAND INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
                About The Manufacturer
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#251A16] font-normal leading-tight">
                {content.brandIntroHeading || 'Where Craftsmanship Meets Precision'}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#77716A] leading-relaxed font-light">
              <p>
                {content.brandIntroText ||
                  'AANGAN DOORS is a specialized wooden door manufacturer based in Bhopal, Madhya Pradesh. We craft architectural entrance doors, interior portals, and CNC carved wooden designs for homeowners, architects, and interior designers who appreciate honest materials and rigorous fabrication.'}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EAE0D2]">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#251A16] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                  <span>Seasoned Hardwoods & Teak</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#251A16] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                  <span>Sub-Millimeter CNC Reliefs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#251A16] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                  <span>Custom Dimension Fabrication</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#251A16] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#A98255]" />
                  <span>Weather-Resistant Finishes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED COLLECTIONS (4 CATEGORIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Architectural Portals"
            title="Curated Door Collections"
            subtitle="Explore our four primary manufacturing categories, each engineered for distinct spatial requirements."
            className="mb-0"
          />
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#A98255] hover:text-[#251A16] transition-colors"
          >
            <span>View All 15 Designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Showroom Highlights"
            title="Featured Door Designs"
            subtitle="Handpicked door models exemplifying our carving fidelity and wood selections."
            className="mb-0"
          />
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#251A16] hover:text-[#A98255] transition-colors"
          >
            <span>Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 5: MANUFACTURING HIGHLIGHT (CNC EDITORIAL) */}
      <section className="bg-[#251A16] text-[#EAE0D2] py-20 my-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Panel */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden border border-[#A98255]/40 shadow-2xl aspect-4/3 bg-[#1A110D]">
                <img
                  src="/images/production-cnc.svg"
                  alt="Precision CNC Router Cutting Timber Door Panel"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/door-fallback.svg';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#251A16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#251A16]/90 backdrop-blur-xs border border-[#A98255]/30 rounded-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#A98255] block">
                    Manufacturing Process
                  </span>
                  <span className="font-serif text-sm text-white">
                    Multi-Axis CNC Wood Carving & Milling Machinery
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
                Digital Craftsmanship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {content.manufacturingHeading || 'Precision in Every Detail'}
              </h2>
              <p className="text-sm sm:text-base text-[#EAE0D2]/80 leading-relaxed font-light">
                {content.manufacturingText ||
                  'Modern CNC technology supports intricate carving and accurate design execution. Every cut depth, chamfer, and curve is programmed with digital precision to ensure uniform relief and flawless joint fits.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="border-l-2 border-[#A98255] pl-4 space-y-1">
                  <h4 className="font-serif text-white font-medium text-base">CAD / CAM Workflow</h4>
                  <p className="text-xs text-[#EAE0D2]/70 leading-relaxed">
                    Custom architectural patterns translated directly into CNC cutter paths.
                  </p>
                </div>
                <div className="border-l-2 border-[#A98255] pl-4 space-y-1">
                  <h4 className="font-serif text-white font-medium text-base">Hand Finishing</h4>
                  <p className="text-xs text-[#EAE0D2]/70 leading-relaxed">
                    Each machine-routed door panel is hand-sanded and hand-polished by artisans.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/production"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-[#A98255] hover:bg-[#B89255] rounded transition-colors"
                >
                  <span>Explore Our Production</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE AANGAN DOORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Commitment"
          title="Why Choose AANGAN DOORS"
          subtitle="Honest timber selection, advanced manufacturing, and dedicated attention to every bespoke commission."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF7F2] p-6 rounded-sm border border-[#EAE0D2] space-y-3">
            <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#251A16]">Custom Design Possibilities</h3>
            <p className="text-xs text-[#77716A] leading-relaxed">
              Tailored door heights, widths, wood species, and relief patterns to match specific architectural plans.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-sm border border-[#EAE0D2] space-y-3">
            <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#251A16]">CNC Precision</h3>
            <p className="text-xs text-[#77716A] leading-relaxed">
              Automated high-speed router tooling delivers symmetry and crisp profile depth across all door faces.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-sm border border-[#EAE0D2] space-y-3">
            <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#251A16]">Thoughtful Craftsmanship</h3>
            <p className="text-xs text-[#77716A] leading-relaxed">
              Proper moisture seasoning, stress-relieving kerfs, and mortise-and-tenon structural joints.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-sm border border-[#EAE0D2] space-y-3">
            <div className="w-10 h-10 rounded bg-[#EAE0D2] text-[#A98255] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#251A16]">Attention to Finishing</h3>
            <p className="text-xs text-[#77716A] leading-relaxed">
              Multi-coat sealants, hand-applied wood stains, and protective exterior coats that highlight natural grain.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: CUSTOMIZATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#39271F] text-white rounded-sm p-8 sm:p-14 text-center relative overflow-hidden border border-[#A98255]/40 shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
              Bespoke Manufacturing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              {content.customizationHeading || 'Have a Design in Mind?'}
            </h2>
            <p className="text-sm sm:text-base text-[#EAE0D2]/90 leading-relaxed font-light">
              {content.customizationText ||
                'Share your ideas with us and explore possibilities for a wooden door crafted around your preferences.'}
            </p>
            <div className="pt-3">
              <button
                onClick={handleCustomInquiry}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-[#A98255] hover:bg-[#B89255] rounded-xs shadow-lg transition-all duration-200 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss Your Design on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl text-[#251A16]">
            Begin Your Door Selection
          </h3>
          <p className="text-xs sm:text-sm text-[#77716A]">
            Browse all 15 wooden door designs in our catalog or reach out directly to our Bhopal manufacturing team.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              to="/collections"
              className="text-xs uppercase tracking-wider font-semibold text-[#251A16] hover:text-[#A98255] underline underline-offset-4"
            >
              Browse Collections
            </Link>
            <span className="text-[#EAE0D2]">•</span>
            <Link
              to="/contact"
              className="text-xs uppercase tracking-wider font-semibold text-[#251A16] hover:text-[#A98255] underline underline-offset-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
