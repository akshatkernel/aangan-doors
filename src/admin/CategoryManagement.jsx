import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { handleImageError } from '../utils/imageUtils';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Save,
  X,
  CheckCircle2
} from 'lucide-react';

export const CategoryManagement = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory, showToast } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDescription('');
    setFormImage('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormDescription(cat.description || '');
    setFormImage(cat.image || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Category name is required.');
      return;
    }

    setFormError('');

    const payload = {
      name: formName.trim(),
      description: formDescription.trim(),
      image: formImage.trim() || '/images/door-fallback.svg'
    };

    let success = false;
    if (editingCategory) {
      success = updateCategory(editingCategory.id, payload);
    } else {
      success = addCategory(payload);
    }

    if (success) {
      setModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE0D2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
            Taxonomy
          </span>
          <h2 className="font-serif text-2xl text-[#251A16] font-medium mt-0.5">
            Category Management
          </h2>
          <p className="text-xs text-[#77716A] mt-0.5">
            Organize catalog classifications, entrance portals, and interior categories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const productCount = products.filter((p) => p.category === cat.name).length;

          return (
            <div
              key={cat.id}
              className="bg-white border border-[#EAE0D2] rounded-sm p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#A98255]/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 rounded bg-[#251A16]/5 overflow-hidden shrink-0 border border-[#EAE0D2]">
                  <img
                    src={cat.image || cat.fallbackImage || '/images/door-fallback.svg'}
                    alt={cat.name}
                    onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-medium text-[#251A16] truncate">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[#77716A] px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#EAE0D2]">
                      {productCount} {productCount === 1 ? 'Product' : 'Products'}
                    </span>
                  </div>

                  <p className="text-xs text-[#77716A] line-clamp-2 leading-relaxed">
                    {cat.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-[#EAE0D2]/70 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#77716A]">
                  Slug: <span className="font-mono">{cat.slug || cat.id}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#251A16] hover:text-[#A98255] border border-[#EAE0D2] rounded hover:bg-[#FAF7F2] transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-red-600 hover:text-red-700 border border-red-200 rounded hover:bg-red-50 transition-colors"
                    title={
                      productCount > 0
                        ? `Contains ${productCount} product(s). Must reassign before deletion.`
                        : 'Delete category'
                    }
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#EAE0D2] rounded-sm shadow-2xl max-w-lg w-full p-6 text-[#292521] relative animate-in zoom-in-95">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#77716A] hover:text-[#251A16] p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-medium text-[#251A16] mb-4 pb-2 border-b border-[#EAE0D2]">
              {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add New Category'}
            </h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                  Category Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Pivot Doors / Temple Gateways"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Overview of door types included in this category..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                  Category Showcase Image URL / Path
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="e.g. /images/door-entrance-1.svg or image URL"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
                />
              </div>

              <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#77716A] hover:text-[#251A16]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded"
                >
                  <Save className="w-3.5 h-3.5 text-[#A98255]" />
                  <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(categoryToDelete)}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
        confirmText="Delete Category"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
};
