import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageUtils';
import { ArrowUpRight } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  const targetUrl = `/collections?category=${encodeURIComponent(category.name)}`;

  return (
    <Link
      to={targetUrl}
      className="group relative block overflow-hidden rounded-sm bg-[#251A16] border border-[#EAE0D2]/60 shadow-xs hover:shadow-xl transition-all duration-300"
    >
      {/* Background Image Container */}
      <div className="aspect-3/4 sm:aspect-4/5 w-full overflow-hidden bg-[#251A16] relative">
        <img
          src={category.image || category.fallbackImage}
          alt={category.name}
          onError={(e) => handleImageError(e, category.fallbackImage || '/images/door-fallback.svg')}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-95"
        />
        {/* Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#251A16] via-[#251A16]/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-left">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A98255]">
            Collection
          </span>
          <span className="text-xs text-[#EAE0D2]/70">
            {category.productCount ? `${category.productCount} Designs` : 'Bespoke'}
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#F7F3EC] transition-colors leading-snug">
          {category.name}
        </h3>

        <p className="mt-2 text-xs text-[#EAE0D2]/80 line-clamp-2 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300">
          {category.description}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#A98255] group-hover:text-white font-medium tracking-wider uppercase transition-colors">
          <span>Explore Collection</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
};
