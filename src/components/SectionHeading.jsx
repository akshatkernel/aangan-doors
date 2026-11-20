import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = ''
}) => {
  return (
    <div className={`space-y-3 mb-10 md:mb-14 ${centered ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-[0.25em] font-medium text-[#A98255]">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#251A16] font-normal leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-sm sm:text-base text-[#77716A] leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};
