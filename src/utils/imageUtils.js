/**
 * Image Utilities for AANGAN DOORS
 * Handles image fallbacks, base64 reading, and local canvas compression to avoid LocalStorage overflow.
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/door-fallback.svg';

/**
 * Validates image file type and size (max 5MB raw, compressed down to < 200KB before storage)
 */
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Only JPG, JPEG, PNG, and WebP images are allowed.'
    };
  }

  const maxRawSize = 5 * 1024 * 1024; // 5 MB
  if (file.size > maxRawSize) {
    return {
      valid: false,
      error: 'Image is too large. Please select an image under 5MB.'
    };
  }

  return { valid: true };
};

/**
 * Compresses an image to max 1200x1200px at 0.8 quality and returns Base64 data URL
 * Ensures LocalStorage quota is preserved while maintaining crisp door aesthetics.
 */
export const compressImageToBase64 = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP if supported, otherwise JPEG
        try {
          const dataUrl = canvas.toDataURL('image/webp', quality);
          resolve(dataUrl);
        } catch {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression.'));
      };

      img.src = readerEvent.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Safe Image component onError handler
 */
export const handleImageError = (e, fallback = DEFAULT_FALLBACK_IMAGE) => {
  if (e.target && e.target.src !== fallback) {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = fallback;
  }
};
