import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useWishlist } from '../context/WishlistContext';
import { ImageGallery } from '../components/ImageGallery';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { createProductInquiry, createCustomDesignInquiry } from '../utils/whatsapp';
import {
  Heart,
  MessageSquare,
  CheckCircle2,
  ShieldAlert,
  ArrowLeft,
  Ruler,
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, settings } = useApp();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product by id or slug (case insensitive)
  const product = products.find(
    (p) =>
      p.id.toLowerCase() === (id || '').toLowerCase() ||
      (p.slug && p.slug.toLowerCase() === (id || '').toLowerCase())
  );

  // If not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-[#FAF7F2] p-8 rounded border border-[#EAE0D2] space-y-4">
          <ShieldAlert className="w-12 h-12 text-[#A98255] mx-auto" />
          <h2 className="font-serif text-2xl text-[#251A16]">Door Design Not Found</h2>
          <p className="text-sm text-[#77716A]">
            We could not locate a wooden door with reference ID "{id}". It may have been relocated or updated.
          </p>
          <div className="pt-2">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Collections</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  // Related products from same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleInquiry = () => {
    createProductInquiry(product, settings.whatsappNumber);
  };

  const handleCustomInquiry = () => {
    createCustomDesignInquiry(settings.whatsappNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Collections', path: '/collections' },
          {
            label: product.category,
            path: `/collections?category=${encodeURIComponent(product.category)}`
          },
          { label: product.name }
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-[#EAE0D2] pb-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A98255] font-semibold tracking-widest uppercase text-[11px]">
                {product.category}
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#EAE0D2]/60 text-[#251A16] font-medium">
                REF: {product.id}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#251A16] font-normal leading-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-[#77716A] leading-relaxed font-light pt-2">
              {product.description || product.shortDescription}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-4 py-2 text-xs">
            <div className="bg-[#FAF7F2] p-3.5 rounded border border-[#EAE0D2] space-y-1">
              <span className="text-[#77716A] block text-[10px] uppercase tracking-wider">
                Timber Species
              </span>
              <span className="font-medium text-[#251A16] text-sm">
                {product.material || 'Solid Wood'}
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-3.5 rounded border border-[#EAE0D2] space-y-1">
              <span className="text-[#77716A] block text-[10px] uppercase tracking-wider">
                Finish & Coating
              </span>
              <span className="font-medium text-[#251A16] text-sm truncate block" title={product.finish}>
                {product.finish || 'Natural Wood'}
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-3.5 rounded border border-[#EAE0D2] space-y-1">
              <span className="text-[#77716A] block text-[10px] uppercase tracking-wider">
                Standard Dimensions
              </span>
              <span className="font-medium text-[#251A16] text-xs">
                {product.dimensions || 'Custom Sizing Available'}
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-3.5 rounded border border-[#EAE0D2] space-y-1">
              <span className="text-[#77716A] block text-[10px] uppercase tracking-wider">
                Customization
              </span>
              <span className="font-medium text-emerald-700 text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Available upon request</span>
              </span>
            </div>
          </div>

          {/* Inquiry Notice (Inquiry-based business, no online payment) */}
          <div className="p-3.5 rounded bg-[#FAF7F2] border border-[#EAE0D2] text-xs text-[#77716A] space-y-1">
            <p className="font-medium text-[#251A16]">Pricing & Custom Quotes</p>
            <p>
              Each door is fabricated to custom dimensions and wood species. Inquire directly on WhatsApp for pricing estimates and lead times.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleInquiry}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded transition-all duration-200 shadow-md active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-[#A98255]" />
              <span>Inquire on WhatsApp for {product.name}</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded border transition-colors ${
                  wishlisted
                    ? 'bg-[#251A16] text-[#A98255] border-[#251A16]'
                    : 'bg-white text-[#251A16] border-[#EAE0D2] hover:bg-[#FAF7F2]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#A98255]' : ''}`} />
                <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleCustomInquiry}
                className="flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded border border-[#EAE0D2] bg-[#FAF7F2] hover:bg-[#EAE0D2]/50 text-[#77716A] hover:text-[#251A16] transition-colors text-center"
              >
                Custom Dimensions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Fabrication Details */}
      <section className="bg-[#FAF7F2] rounded-sm border border-[#EAE0D2] p-6 sm:p-10 space-y-6">
        <div className="border-b border-[#EAE0D2] pb-4">
          <h2 className="font-serif text-xl sm:text-2xl text-[#251A16] font-normal">
            Manufacturing & Architectural Specifications
          </h2>
          <p className="text-xs sm:text-sm text-[#77716A] mt-1">
            Standard specifications for model {product.id}. All parameters can be customized for specific openings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-[#EAE0D2]/70">
            <span className="text-[#77716A]">Product Model & Code</span>
            <span className="font-medium text-[#251A16]">{product.name} ({product.id})</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#EAE0D2]/70">
            <span className="text-[#77716A]">Primary Category</span>
            <span className="font-medium text-[#251A16]">{product.category}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#EAE0D2]/70">
            <span className="text-[#77716A]">Wood Species</span>
            <span className="font-medium text-[#251A16]">{product.material || 'Solid Teak / Hardwood'}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#EAE0D2]/70">
            <span className="text-[#77716A]">Dimensions</span>
            <span className="font-medium text-[#251A16]">{product.dimensions || 'Bespoke Architectural Sizing'}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#EAE0D2]/70">
            <span className="text-[#77716A]">Surface Finish</span>
            <span className="font-medium text-[#251A16]">{product.finish || 'Protective Matte Polyurethane'}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#EAE0D2]/70">
            <span className="text-[#77716A]">Manufacturing Tech</span>
            <span className="font-medium text-[#251A16]">CNC Routing & Artisanal Joinery</span>
          </div>
        </div>
      </section>

      {/* Related Products from same category */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-[#EAE0D2] pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
                Similar Designs
              </span>
              <h3 className="font-serif text-2xl text-[#251A16]">
                More in {product.category}
              </h3>
            </div>
            <Link
              to={`/collections?category=${encodeURIComponent(product.category)}`}
              className="text-xs uppercase tracking-wider font-semibold text-[#A98255] hover:text-[#251A16] transition-colors"
            >
              View Category →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
