import React, { useState } from 'react';
import { handleImageError } from '../utils/imageUtils';

export const ImageGallery = ({ images = [], productName = 'Wooden Door' }) => {
  const validImages = images && images.length > 0 ? images : ['/images/door-fallback.svg'];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = validImages[activeImageIndex] || validImages[0] || '/images/door-fallback.svg';

  return (
    <div className="space-y-4">
      {/* Primary Hero Door Viewer */}
      <div className="relative aspect-3/4 sm:aspect-4/5 w-full bg-[#251A16]/5 rounded-sm border border-[#EAE0D2] overflow-hidden group shadow-xs">
        <img
          src={currentImage}
          alt={`${productName} view ${activeImageIndex + 1}`}
          onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />

        {/* Discreet Watermark Tag */}
        <div className="absolute top-4 left-4 bg-[#251A16]/80 backdrop-blur-xs text-[#EAE0D2] text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-xs">
          AANGAN DOORS • SHOWROOM
        </div>
      </div>

      {/* Thumbnail Bar */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative shrink-0 w-18 h-22 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                activeImageIndex === idx
                  ? 'border-[#A98255] ring-2 ring-[#A98255]/30'
                  : 'border-[#EAE0D2] opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt=""
                onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
