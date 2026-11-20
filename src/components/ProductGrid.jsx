import React from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RefreshCcw } from 'lucide-react';

export const ProductGrid = ({
  products = [],
  emptyMessage = 'No door designs matched your criteria.',
  onResetFilters
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-[#FAF7F2] rounded border border-dashed border-[#EAE0D2] p-8 max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[#EAE0D2]/50 text-[#A98255] flex items-center justify-center mx-auto mb-4">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-lg font-medium text-[#251A16] mb-2">
          No Designs Found
        </h3>
        <p className="text-sm text-[#77716A] mb-6 max-w-xs mx-auto">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
