import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { openWhatsApp } from '../utils/whatsapp';
import { Heart, Menu, X, MessageSquare, Shield } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { settings, adminUser } = useApp();
  const location = useLocation();

  // Handle sticky scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Production', path: '/production' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleWhatsAppClick = () => {
    openWhatsApp(
      'Hello AANGAN DOORS, I am visiting your digital showroom and would like to inquire about your wooden door catalog.',
      settings.whatsappNumber
    );
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-xs border-b border-[#EAE0D2]'
          : 'bg-[#F7F3EC] border-b border-[#EAE0D2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-wider uppercase transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'text-[#251A16] font-medium border-[#A98255]'
                      : 'text-[#77716A] hover:text-[#251A16] border-transparent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Wishlist Link with Live Badge */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#251A16] hover:text-[#A98255] transition-colors rounded-full hover:bg-[#EAE0D2]/50"
              aria-label={`View Wishlist with ${wishlistCount} items`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#A98255] text-[#A98255]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#A98255] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded transition-all duration-200 shadow-xs active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#A98255]" />
              <span>WhatsApp Inquiry</span>
            </button>

            {/* Discreet Admin Link (if logged in, quick switch) */}
            {adminUser && (
              <Link
                to="/admin"
                className="p-2 text-[#77716A] hover:text-[#251A16] hover:bg-[#EAE0D2]/50 rounded-full transition-colors"
                title="Admin Dashboard"
                aria-label="Admin Dashboard"
              >
                <Shield className="w-4 h-4 text-[#A98255]" />
              </Link>
            )}
          </div>

          {/* Mobile Actions: Wishlist + Hamburger Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/wishlist"
              className="relative p-2 text-[#251A16] hover:text-[#A98255]"
              aria-label="Wishlist"
            >
              <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'fill-[#A98255] text-[#A98255]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#A98255] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#251A16] hover:text-[#A98255] transition-colors focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F7F3EC] border-b border-[#EAE0D2] px-6 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col space-y-3.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base tracking-wider uppercase py-2 border-b border-[#EAE0D2]/50 flex items-center justify-between ${
                    isActive ? 'text-[#251A16] font-semibold text-[#A98255]' : 'text-[#77716A]'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="text-[#A98255] text-sm">→</span>
              </NavLink>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded"
              >
                <MessageSquare className="w-4 h-4 text-[#A98255]" />
                <span>WhatsApp Inquiry</span>
              </button>

              <Link
                to="/admin/login"
                className="text-center py-2 text-xs text-[#77716A] hover:text-[#251A16] uppercase tracking-wider"
              >
                Admin Access
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
