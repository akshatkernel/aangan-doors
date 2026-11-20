import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { handleImageError } from '../utils/imageUtils';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Check,
  X
} from 'lucide-react';

export const ProductManagement = () => {
  const { products, categories, deleteProduct, toggleFeatured } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productToDelete, setProductToDelete] = useState(null);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term === '' ||
        p.name.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term) ||
        (p.material && p.material.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE0D2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
            Inventory
          </span>
          <h2 className="font-serif text-2xl text-[#251A16] font-medium mt-0.5">
            Product Management
          </h2>
          <p className="text-xs text-[#77716A] mt-0.5">
            Create, edit, feature, and manage all {products.length} wooden door models.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-[#EAE0D2] flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or ID (AD-001)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#77716A] flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#FAF7F2] border border-[#EAE0D2] rounded px-3 py-1.5 text-xs text-[#251A16] focus:outline-hidden focus:border-[#A98255] cursor-pointer"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-[#EAE0D2] rounded-sm overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#EAE0D2] text-[#77716A] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Door Model</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Timber Material</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE0D2]/60 text-[#251A16]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-[#77716A]">
                    No door models found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const image = p.images?.[0] || '/images/door-fallback.svg';

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      {/* Name & Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-13 rounded overflow-hidden bg-[#251A16]/5 shrink-0 border border-[#EAE0D2]">
                            <img
                              src={image}
                              alt=""
                              onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif font-medium text-sm text-[#251A16] block">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-[#77716A] line-clamp-1">
                              {p.shortDescription}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Code */}
                      <td className="py-3 px-4 font-mono font-medium text-[#77716A]">
                        {p.id}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-[#FAF7F2] border border-[#EAE0D2] text-[#251A16]">
                          {p.category}
                        </span>
                      </td>

                      {/* Material */}
                      <td className="py-3 px-4 text-[#77716A]">
                        {p.material || 'Solid Wood'}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(p.id)}
                          className={`p-1.5 rounded transition-colors ${
                            p.featured
                              ? 'text-[#A98255] hover:bg-[#FAF7F2]'
                              : 'text-[#EAE0D2] hover:text-[#77716A]'
                          }`}
                          title={p.featured ? 'Featured on homepage' : 'Not featured'}
                        >
                          <Star className={`w-4 h-4 ${p.featured ? 'fill-[#A98255]' : ''}`} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/product/${p.id}`}
                            target="_blank"
                            className="p-1.5 text-[#77716A] hover:text-[#251A16] rounded hover:bg-[#FAF7F2]"
                            title="Preview customer view"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/products/edit/${p.id}`}
                            className="p-1.5 text-[#77716A] hover:text-[#251A16] rounded hover:bg-[#FAF7F2]"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setProductToDelete(p)}
                            className="p-1.5 text-[#77716A] hover:text-red-700 rounded hover:bg-red-50"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Delete Door Model"
        message={`Are you sure you want to delete "${productToDelete?.name}" (${productToDelete?.id})? This will remove it from the digital showroom catalog and wishlist.`}
        confirmText="Delete Product"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};
