import { initialProducts } from '../data/initialProducts';
import { initialCategories } from '../data/initialCategories';
import { initialContent } from '../data/initialContent';
import { initialSettings } from '../data/initialSettings';

export const STORAGE_VERSION = 'v2_aangan_doors_catalog';
export const STORAGE_VERSION_KEY = 'aangan_data_version';

export const STORAGE_KEYS = {
  PRODUCTS: 'aangan_products',
  CATEGORIES: 'aangan_categories',
  WISHLIST: 'aangan_wishlist',
  SETTINGS: 'aangan_settings',
  CONTENT: 'aangan_content',
  ADMIN_SESSION: 'aangan_admin_session'
};

/**
 * Safely parse JSON from localStorage with fallback
 */
export const safeGet = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

/**
 * Safely save data to localStorage with error handling for quota
 */
export const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error writing ${key} to localStorage (quota exceeded or storage blocked):`, err);
    return false;
  }
};

/**
 * Initialize storage with default demo data if keys do not exist or version migrated
 */
export const initializeStorage = () => {
  const currentVersion = localStorage.getItem(STORAGE_VERSION_KEY);

  // If version mismatch, update products & categories with verified door images
  if (currentVersion !== STORAGE_VERSION) {
    const existingProducts = safeGet(STORAGE_KEYS.PRODUCTS, null);

    if (existingProducts && Array.isArray(existingProducts)) {
      // Map fresh door images to the 15 standard products, preserving user custom products
      const updatedProducts = existingProducts.map((p) => {
        const fresh = initialProducts.find((ip) => ip.id === p.id);
        if (fresh) {
          const hasOldImage =
            !p.images ||
            p.images.length === 0 ||
            p.images.some(
              (img) =>
                typeof img === 'string' &&
                (img.includes('photo-1513694203232') ||
                  img.includes('photo-1506521781263') ||
                  img.includes('photo-1549488344') ||
                  img.includes('photo-1533779283484') ||
                  img.includes('photo-1581092160607'))
            );
          if (hasOldImage) {
            return { ...p, images: fresh.images };
          }
        }
        return p;
      });
      safeSet(STORAGE_KEYS.PRODUCTS, updatedProducts);
    } else {
      safeSet(STORAGE_KEYS.PRODUCTS, initialProducts);
    }

    // Always ensure verified categories are synchronized
    safeSet(STORAGE_KEYS.CATEGORIES, initialCategories);
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
  } else {
    // Normal initial checks
    if (localStorage.getItem(STORAGE_KEYS.PRODUCTS) === null) {
      safeSet(STORAGE_KEYS.PRODUCTS, initialProducts);
    }
    if (localStorage.getItem(STORAGE_KEYS.CATEGORIES) === null) {
      safeSet(STORAGE_KEYS.CATEGORIES, initialCategories);
    }
  }

  // Content
  if (localStorage.getItem(STORAGE_KEYS.CONTENT) === null) {
    safeSet(STORAGE_KEYS.CONTENT, initialContent);
  }

  // Settings
  if (localStorage.getItem(STORAGE_KEYS.SETTINGS) === null) {
    safeSet(STORAGE_KEYS.SETTINGS, initialSettings);
  }

  // Wishlist
  if (localStorage.getItem(STORAGE_KEYS.WISHLIST) === null) {
    safeSet(STORAGE_KEYS.WISHLIST, []);
  }
};

// Convenience Accessors
export const getStoredProducts = () => safeGet(STORAGE_KEYS.PRODUCTS, initialProducts);
export const saveStoredProducts = (products) => safeSet(STORAGE_KEYS.PRODUCTS, products);

export const getStoredCategories = () => safeGet(STORAGE_KEYS.CATEGORIES, initialCategories);
export const saveStoredCategories = (categories) => safeSet(STORAGE_KEYS.CATEGORIES, categories);

export const getStoredWishlist = () => safeGet(STORAGE_KEYS.WISHLIST, []);
export const saveStoredWishlist = (wishlist) => safeSet(STORAGE_KEYS.WISHLIST, wishlist);

export const getStoredContent = () => safeGet(STORAGE_KEYS.CONTENT, initialContent);
export const saveStoredContent = (content) => safeSet(STORAGE_KEYS.CONTENT, content);

export const getStoredSettings = () => safeGet(STORAGE_KEYS.SETTINGS, initialSettings);
export const saveStoredSettings = (settings) => safeSet(STORAGE_KEYS.SETTINGS, settings);

// Admin Session (Demo mode)
export const getAdminSession = () => safeGet(STORAGE_KEYS.ADMIN_SESSION, null);
export const setAdminSession = (session) => safeSet(STORAGE_KEYS.ADMIN_SESSION, session);
export const clearAdminSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  } catch (e) {
    console.error('Error clearing session:', e);
  }
};
