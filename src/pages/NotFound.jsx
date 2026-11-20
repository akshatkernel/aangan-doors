import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, DoorOpen } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#EAE0D2] text-[#A98255] flex items-center justify-center mx-auto">
          <DoorOpen className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A98255]">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl text-[#251A16] font-normal">
            Threshold Uncharted
          </h1>
          <p className="text-sm text-[#77716A] leading-relaxed">
            The page or door design you are seeking does not exist or may have been relocated in our digital showroom.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-[#EAE0D2] hover:bg-[#DDD1C1] rounded transition-colors"
          >
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
