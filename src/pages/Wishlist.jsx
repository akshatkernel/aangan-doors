import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { handleImageError } from '../utils/imageUtils';
import {
  Heart,
  Trash2,
  MessageSquare,
  ArrowRight,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const Wishlist = () => {
  const {
    wishlistProducts,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
    sendWishlistToWhatsApp
  } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Saved Designs & Wishlist' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE0D2] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
            Client Shortlist
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#251A16] font-normal mt-1">
            Saved Door Designs
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] mt-1.5">
            Review your selected wooden doors and send your complete shortlist directly to AANGAN DOORS over WhatsApp for pricing and timber quotes.
          </p>
        </div>

        {wishlistCount > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 text-xs text-[#77716A] hover:text-red-700 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Shortlist</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {wishlistCount === 0 ? (
        <div className="py-20 text-center bg-[#FAF7F2] rounded-sm border border-dashed border-[#EAE0D2] max-w-lg mx-auto p-8 space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#EAE0D2] text-[#A98255] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl text-[#251A16]">Your Wishlist is Empty</h2>
            <p className="text-sm text-[#77716A] leading-relaxed max-w-sm mx-auto">
              Explore our architectural catalog and save door designs you like. You can send your shortlisted doors directly to our workshop on WhatsApp.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded transition-colors"
            >
              <span>Browse 15 Door Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Wishlist Items List (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            {wishlistProducts.map((product) => {
              const image = product.images?.[0] || '/images/door-fallback.svg';

              return (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm gap-4 transition-all hover:border-[#A98255]/40"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Thumbnail */}
                    <Link
                      to={`/product/${product.id}`}
                      className="w-20 h-24 sm:w-22 sm:h-28 rounded-xs overflow-hidden bg-[#251A16]/5 shrink-0 border border-[#EAE0D2]"
                    >
                      <img
                        src={image}
                        alt={product.name}
                        onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#A98255] font-semibold tracking-wider uppercase text-[11px]">
                          {product.category}
                        </span>
                        <span className="text-[#77716A] font-mono text-[11px]">
                          • {product.id}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-medium text-[#251A16] hover:text-[#A98255] transition-colors">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>

                      <p className="text-xs text-[#77716A]">
                        {product.material || 'Solid Wood'} • {product.dimensions || 'Custom Sizing'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#EAE0D2]">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-xs font-medium text-[#251A16] hover:text-[#A98255] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 text-[#77716A] hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Remove from shortlist"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* WhatsApp Inquiry Summary (Right Column) */}
          <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-6 sm:p-7 space-y-5 sticky top-28">
            <div className="border-b border-[#EAE0D2] pb-4 space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
                Shortlist Summary
              </span>
              <h2 className="font-serif text-xl text-[#251A16]">
                {wishlistCount} {wishlistCount === 1 ? 'Door' : 'Doors'} Selected
              </h2>
            </div>

            <p className="text-xs text-[#77716A] leading-relaxed">
              Click below to generate a preformatted WhatsApp message containing your selected door models and reference IDs. You can review and edit before sending.
            </p>

            <div className="bg-white p-3.5 rounded border border-[#EAE0D2] text-[11px] font-mono text-[#77716A] space-y-1 max-h-36 overflow-y-auto">
              <p className="text-[#251A16] font-semibold font-sans text-xs">Included in inquiry:</p>
              {wishlistProducts.map((p, idx) => (
                <div key={p.id} className="truncate">
                  {idx + 1}. {p.name} ({p.id})
                </div>
              ))}
            </div>

            <button
              onClick={sendWishlistToWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded shadow-md transition-all duration-200 active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-[#A98255]" />
              <span>Send Shortlist to WhatsApp</span>
            </button>

            <p className="text-[10px] text-center text-[#77716A]">
              Opens WhatsApp in a new tab. No automatic sending.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
