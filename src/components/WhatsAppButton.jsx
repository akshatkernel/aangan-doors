import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createCustomDesignInquiry } from '../utils/whatsapp';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppButton = () => {
  const { settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    createCustomDesignInquiry(settings.whatsappNumber);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Optional gentle floating tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#251A16] text-[#F7F3EC] text-xs px-3.5 py-2 rounded shadow-xl border border-[#A98255]/50 animate-in fade-in duration-200">
          <span>Inquire on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#77716A] hover:text-[#F7F3EC]"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-3 focus:ring-[#25D366]/40"
        aria-label="Contact AANGAN DOORS on WhatsApp"
        title="Direct WhatsApp Inquiry (+91 7879626597)"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        
        {/* Subtle pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#A98255]"></span>
        </span>
      </button>
    </div>
  );
};
