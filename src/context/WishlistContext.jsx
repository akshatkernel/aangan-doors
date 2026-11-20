import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredWishlist, saveStoredWishlist } from '../utils/storage';
import { useApp } from './AppContext';
import { createWishlistInquiry } from '../utils/whatsapp';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { products, settings, showToast } = useApp();
  const [wishlistIds, setWishlistIds] = useState(() => getStoredWishlist());

  // Keep localStorage synced whenever wishlist changes
  useEffect(() => {
    saveStoredWishlist(wishlistIds);
  }, [wishlistIds]);

  // Resolve actual product objects from current products list, gracefully ignoring deleted items
  const wishlistProducts = wishlistIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Added "${product.name}" to your wishlist.`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    const prod = products.find((p) => p.id === productId);
    showToast(`Removed "${prod?.name || productId}" from wishlist.`, 'info');
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    showToast('Wishlist cleared.', 'info');
  };

  const sendWishlistToWhatsApp = () => {
    if (wishlistProducts.length === 0) {
      showToast('Your wishlist is empty. Add doors to inquire.', 'error');
      return;
    }
    createWishlistInquiry(wishlistProducts, settings.whatsappNumber);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistProducts.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        sendWishlistToWhatsApp
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
