import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';
import { openWhatsApp } from '../utils/whatsapp';
import { MapPin, Phone, MessageSquare, ArrowUpRight, Compass } from 'lucide-react';

export const Footer = () => {
  const { settings, content } = useApp();

  const handleWhatsAppClick = () => {
    openWhatsApp('Hello AANGAN DOORS, I would like to inquire about your wooden door collection.', settings.whatsappNumber);
  };

  return (
    <footer className="bg-[#251A16] text-[#EAE0D2] border-t border-[#39271F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#39271F]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-[#EAE0D2]/75 leading-relaxed max-w-sm pt-2">
              {content.footerText || settings.footerText}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#A98255] tracking-wider uppercase">
              <Compass className="w-4 h-4" />
              <span>Bhopal, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white border-b border-[#39271F] pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#EAE0D2]/75">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/production" className="hover:text-white transition-colors">
                  Manufacturing Process
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Brand Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Door Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white border-b border-[#39271F] pb-2">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-[#EAE0D2]/75">
              <li>
                <Link to="/collections?category=Main+Entrance+Doors" className="hover:text-white transition-colors">
                  Main Entrance Doors
                </Link>
              </li>
              <li>
                <Link to="/collections?category=CNC+Designer+Doors" className="hover:text-white transition-colors">
                  CNC Designer Doors
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Interior+Doors" className="hover:text-white transition-colors">
                  Interior Doors
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Traditional+Doors" className="hover:text-white transition-colors">
                  Traditional Doors
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Inquiry & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white border-b border-[#39271F] pb-2">
              Inquiries
            </h4>
            <div className="space-y-3 text-sm text-[#EAE0D2]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A98255] shrink-0 mt-0.5" />
                <span>Bhopal, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A98255] shrink-0" />
                <span>+91 {settings.whatsappNumber.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}</span>
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-[#A98255] hover:bg-[#B89255] rounded transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77716A] gap-4">
          <div>
            © {new Date().getFullYear()} AANGAN DOORS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#A98255]/80">
              Demo Digital Showroom • Local Persistence Architecture
            </span>
            <Link to="/admin/login" className="hover:text-[#EAE0D2] transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
