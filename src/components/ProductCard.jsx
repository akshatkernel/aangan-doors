import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { handleImageError } from '../utils/imageUtils';
import { Heart, ArrowRight } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const primaryImage = product.images?.[0] || '/images/door-fallback.svg';
  const fallbackImage = product.images?.[1] || '/images/door-fallback.svg';

  return (
    <div className="group relative flex flex-col bg-[#FAF7F2] rounded-sm border border-[#EAE0D2] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#A98255]/40">
      {/* Image Container with Wishlist Toggle */}
      <div className="relative aspect-3/4 sm:aspect-4/5 w-full overflow-hidden bg-[#251A16]/5">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={primaryImage}
            alt={product.name}
            onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 shadow-xs ${
            wishlisted
              ? 'bg-[#251A16] text-[#A98255]'
              : 'bg-white/85 text-[#77716A] hover:bg-white hover:text-[#251A16]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'In Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#A98255]' : ''}`} />
        </button>

        {/* Customization Badge */}
        {product.customizationAvailable && (
          <div className="absolute bottom-3 left-3 bg-[#251A16]/85 backdrop-blur-xs text-[#EAE0D2] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs">
            Bespoke Sizing
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A98255] font-medium tracking-wider uppercase text-[11px]">
              {product.category}
            </span>
            <span className="font-mono text-[11px] text-[#77716A]">
              {product.id}
            </span>
          </div>

          <h3 className="font-serif text-lg font-medium text-[#251A16] group-hover:text-[#A98255] transition-colors line-clamp-1">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-[#77716A] line-clamp-2 leading-relaxed pt-0.5">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Card Footer: Material & View Details CTA */}
        <div className="mt-4 pt-3 border-t border-[#EAE0D2]/70 flex items-center justify-between text-xs">
          <span className="text-[#77716A] text-[11px] truncate max-w-[140px]">
            {product.material || 'Solid Wood'}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-1 font-medium text-[#251A16] group-hover:text-[#A98255] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
