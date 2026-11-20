import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'dark', className = '', showTagline = true }) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Architectural Door Emblem */}
      <div
        className={`w-10 h-10 rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
          isLight
            ? 'bg-[#EAE0D2] text-[#251A16] border border-[#A98255]/40'
            : 'bg-[#251A16] text-[#A98255] border border-[#39271F]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Architectural Arch & Inset Door */}
          <path d="M5 21V9a7 7 0 0 1 14 0v12" />
          <path d="M9 21V10a3 3 0 0 1 6 0v11" />
          <circle cx="13.5" cy="14.5" r="0.75" fill="currentColor" />
          <line x1="3" y1="21" x2="21" y2="21" strokeWidth="2" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-lg tracking-[0.2em] font-semibold leading-tight uppercase ${
            isLight ? 'text-[#F7F3EC]' : 'text-[#251A16]'
          }`}
        >
          Aangan
          <span className="font-sans font-light tracking-[0.3em] text-xs ml-1.5 opacity-90 text-[#A98255]">
            DOORS
          </span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] tracking-[0.18em] uppercase ${
              isLight ? 'text-[#A98255]' : 'text-[#77716A]'
            }`}
          >
            Timber & CNC Craft • Bhopal
          </span>
        )}
      </div>
    </Link>
  );
};
