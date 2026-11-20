import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  validateImageFile,
  compressImageToBase64,
  handleImageError
} from '../utils/imageUtils';
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  AlertCircle,
  Save,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const { products, categories, addProduct, updateProduct, showToast } = useApp();

  const existingProduct = isEditMode
    ? products.find((p) => p.id.toLowerCase() === id.toLowerCase())
    : null;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: categories[0]?.name || 'Main Entrance Doors',
    shortDescription: '',
    description: '',
    material: 'Seasoned Teak Wood',
    dimensions: 'Standard: 84" × 36" × 1.75" (Customizable)',
    finish: 'Natural Wood Stain with Protective Clear Coat',
    customizationAvailable: true,
    featured: false,
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');

  // Prepopulate form if in edit mode
  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        id: existingProduct.id,
        name: existingProduct.name,
        category: existingProduct.category,
        shortDescription: existingProduct.shortDescription || '',
        description: existingProduct.description || '',
        material: existingProduct.material || '',
        dimensions: existingProduct.dimensions || '',
        finish: existingProduct.finish || '',
        customizationAvailable: existingProduct.customizationAvailable ?? true,
        featured: existingProduct.featured ?? false,
        images: existingProduct.images || []
      });
    } else if (isEditMode && !existingProduct) {
      showToast(`Product with ID "${id}" was not found.`, 'error');
      navigate('/admin/products');
    }
  }, [isEditMode, existingProduct, id, navigate, showToast]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required.';
    if (!formData.id.trim()) {
      errs.id = 'Product ID is required.';
    } else if (!isEditMode) {
      // Check for duplicate ID on new product
      const exists = products.some(
        (p) => p.id.trim().toLowerCase() === formData.id.trim().toLowerCase()
      );
      if (exists) {
        errs.id = `Product ID "${formData.id}" already exists. Please choose a unique ID.`;
      }
    } else if (isEditMode && existingProduct && formData.id.trim().toLowerCase() !== existingProduct.id.toLowerCase()) {
      // If changing ID during edit, ensure no collision
      const exists = products.some(
        (p) => p.id.trim().toLowerCase() === formData.id.trim().toLowerCase()
      );
      if (exists) {
        errs.id = `Product ID "${formData.id}" already belongs to another product.`;
      }
    }

    if (!formData.category) errs.category = 'Category selection is required.';
    return errs;
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageUploadError('');
    setIsProcessingImage(true);

    try {
      const newImages = [...formData.images];

      for (const file of files) {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setImageUploadError(validation.error);
          continue;
        }

        // Compress image to safe canvas WebP/JPEG base64 (< 200KB)
        const base64 = await compressImageToBase64(file, 1000, 1000, 0.75);
        newImages.push(base64);
      }

      setFormData((prev) => ({ ...prev, images: newImages }));
      showToast(`Uploaded and processed ${files.length} image(s).`);
    } catch (err) {
      console.error('Image compression error:', err);
      setImageUploadError('Failed to process image. Please try another file.');
    } finally {
      setIsProcessingImage(false);
      // Reset input value
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setErrors({});

    // If no images provided, supply default fallback SVG
    const finalImages =
      formData.images.length > 0
        ? formData.images
        : ['/images/door-fallback.svg'];

    const payload = {
      ...formData,
      images: finalImages
    };

    let success = false;
    if (isEditMode) {
      success = updateProduct(existingProduct.id, payload);
    } else {
      success = addProduct(payload);
    }

    if (success) {
      navigate('/admin/products');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE0D2]">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-1.5 text-[#77716A] hover:text-[#251A16] hover:bg-[#FAF7F2] rounded transition-colors"
            title="Back to products list"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="font-serif text-2xl text-[#251A16] font-medium">
              {isEditMode ? `Edit Product: ${existingProduct?.name}` : 'Add New Wooden Door'}
            </h2>
            <p className="text-xs text-[#77716A]">
              {isEditMode
                ? `Updating model details for reference ${existingProduct?.id}`
                : 'Enter specifications to add a new door design to the digital showroom'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE0D2] shadow-xs space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Product Name */}
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Royal Heritage"
              className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] ${
                errors.name ? 'border-red-500' : 'border-[#EAE0D2]'
              }`}
            />
            {errors.name && <span className="text-[11px] text-red-600">{errors.name}</span>}
          </div>

          {/* Product ID */}
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Product ID / Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value.toUpperCase() })}
              placeholder="e.g. AD-016"
              className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border rounded font-mono text-[#251A16] focus:outline-hidden focus:border-[#A98255] ${
                errors.id ? 'border-red-500' : 'border-[#EAE0D2]'
              }`}
            />
            {errors.id && <span className="text-[11px] text-red-600">{errors.id}</span>}
          </div>

          {/* Category */}
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Wood Material */}
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Timber Species / Material
            </label>
            <input
              type="text"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g. Seasoned Teak Wood / Padauk"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Short Description (Card Summary)
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief 1-sentence synopsis for catalog cards..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Full Description (Product Page)
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed explanation of carving details, joinery, and spatial recommendations..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] resize-y"
            />
          </div>
        </div>

        {/* Dimensions & Finishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Standard Dimensions
            </label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              placeholder='e.g. 84" × 36" × 1.75" (Customizable)'
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
              Surface Finish & Treatment
            </label>
            <input
              type="text"
              value={formData.finish}
              onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
              placeholder="e.g. Deep Walnut Stain with Matte Polyurethane"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255]"
            />
          </div>
        </div>

        {/* Toggles: Customization & Featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-[#EAE0D2]">
          <label className="flex items-center gap-3 p-3 bg-[#FAF7F2] border border-[#EAE0D2] rounded cursor-pointer">
            <input
              type="checkbox"
              checked={formData.customizationAvailable}
              onChange={(e) =>
                setFormData({ ...formData, customizationAvailable: e.target.checked })
              }
              className="w-4 h-4 text-[#A98255] rounded focus:ring-0"
            />
            <div>
              <span className="text-xs font-medium text-[#251A16] block">
                Custom Sizing Available
              </span>
              <span className="text-[11px] text-[#77716A]">
                Displays bespoke dimensions badge on product card.
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-[#FAF7F2] border border-[#EAE0D2] rounded cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#A98255] rounded focus:ring-0"
            />
            <div>
              <span className="text-xs font-medium text-[#251A16] block">
                Feature on Homepage
              </span>
              <span className="text-[11px] text-[#77716A]">
                Showcase this door in the featured homepage gallery.
              </span>
            </div>
          </label>
        </div>

        {/* Image Management Section */}
        <div className="space-y-3 pt-4 border-t border-[#EAE0D2]">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Product Images
              </label>
              <p className="text-[11px] text-[#77716A]">
                Upload JPG, PNG, or WebP images from your computer. Images are compressed locally before saving to ensure smooth performance.
              </p>
            </div>
            <span className="text-xs text-[#77716A] font-mono">
              {formData.images.length} Image(s)
            </span>
          </div>

          {imageUploadError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{imageUploadError}</span>
            </div>
          )}

          {/* Upload Button Box */}
          <div className="border-2 border-dashed border-[#EAE0D2] rounded p-6 text-center hover:border-[#A98255] transition-colors bg-[#FAF7F2]">
            <input
              type="file"
              id="doorImagesInput"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="doorImagesInput"
              className="inline-flex flex-col items-center cursor-pointer space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#A98255] flex items-center justify-center border border-[#EAE0D2]">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#251A16]">
                {isProcessingImage ? 'Compressing Image(s)...' : 'Click to Upload Local Images'}
              </span>
              <span className="text-[10px] text-[#77716A]">
                Supports JPG, PNG, WebP up to 5MB (auto-compressed)
              </span>
            </label>
          </div>

          {/* Thumbnails of Current Images */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
              {formData.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-3/4 rounded border border-[#EAE0D2] overflow-hidden group bg-[#FAF7F2]"
                >
                  <img
                    src={imgUrl}
                    alt={`Preview ${idx + 1}`}
                    onError={(e) => handleImageError(e, '/images/door-fallback.svg')}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-red-700 text-white rounded-full transition-colors opacity-90 group-hover:opacity-100"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#251A16]/80 text-[#EAE0D2] text-[9px] px-1.5 py-0.5 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-[#EAE0D2] flex items-center justify-end gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 text-xs font-medium text-[#77716A] hover:text-[#251A16] rounded transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded transition-colors shadow-xs"
          >
            <Save className="w-4 h-4 text-[#A98255]" />
            <span>{isEditMode ? 'Update Product' : 'Save New Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
