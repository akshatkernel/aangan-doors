import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductGrid } from '../components/ProductGrid';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeading } from '../components/SectionHeading';
import { Search, Filter, ArrowUpDown, X, Check } from 'lucide-react';

export const Collections = () => {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameter for category
  const activeCategoryParam = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'name-asc', 'name-desc', 'id-asc'

  // Update category filter via searchParams
  const handleCategorySelect = (categoryName) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categoryName === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', categoryName);
    }
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('default');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('category');
    setSearchParams(nextParams);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        const matchesCategory =
          activeCategoryParam === 'All' ||
          product.category.toLowerCase() === activeCategoryParam.toLowerCase();

        // Search Filter (matches name, id, material, or category)
        const term = searchTerm.trim().toLowerCase();
        const matchesSearch =
          term === '' ||
          product.name.toLowerCase().includes(term) ||
          product.id.toLowerCase().includes(term) ||
          (product.material && product.material.toLowerCase().includes(term)) ||
          product.category.toLowerCase().includes(term);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'id-asc') return a.id.localeCompare(b.id);
        return 0; // Default
      });
  }, [products, activeCategoryParam, searchTerm, sortBy]);

  const categoryList = ['All', ...categories.map((c) => c.name)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Collections' }]} />

      {/* Header Banner */}
      <div className="my-6 sm:my-8">
        <SectionHeading
          eyebrow="Digital Showroom"
          title="Architectural Door Collections"
          subtitle="Explore all 15 handcrafted wooden door models, from grand entrance portals and delicate CNC jaalis to quiet interior panels."
        />
      </div>

      {/* Controls Bar: Search, Category Filter Tabs, Sorting */}
      <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-4 sm:p-5 mb-8 space-y-4">
        {/* Top row: Search input + Sorting dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID (e.g. AD-001), or wood type..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-[#EAE0D2] rounded text-[#251A16] placeholder-[#77716A]/70 focus:outline-hidden focus:border-[#A98255] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#77716A] hover:text-[#251A16]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
            <span className="text-[#77716A] flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#EAE0D2] rounded px-3 py-2 text-xs text-[#251A16] focus:outline-hidden focus:border-[#A98255] transition-colors cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="name-asc">Alphabetical (A – Z)</option>
              <option value="name-desc">Alphabetical (Z – A)</option>
              <option value="id-asc">Product ID (AD-001...)</option>
            </select>
          </div>
        </div>

        {/* Bottom row: Category Filter Tabs */}
        <div className="pt-2 border-t border-[#EAE0D2]/70 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {categoryList.map((cat) => {
            const isActive = activeCategoryParam.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#251A16] text-white shadow-xs'
                    : 'bg-white text-[#77716A] hover:text-[#251A16] border border-[#EAE0D2]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Status Bar */}
      <div className="flex items-center justify-between text-xs text-[#77716A] mb-6 pb-2 border-b border-[#EAE0D2]/60">
        <div>
          Showing <span className="font-semibold text-[#251A16]">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold text-[#251A16]">{products.length}</span> door designs
          {activeCategoryParam !== 'All' && (
            <span className="ml-1.5 text-[#A98255]">in {activeCategoryParam}</span>
          )}
        </div>

        {(searchTerm || activeCategoryParam !== 'All' || sortBy !== 'default') && (
          <button
            onClick={handleResetFilters}
            className="text-[#A98255] hover:text-[#251A16] font-medium transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage="No door designs found matching your search or category selection. Try a different keyword or reset filters."
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};
