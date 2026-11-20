import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initializeStorage,
  getStoredProducts,
  saveStoredProducts,
  getStoredCategories,
  saveStoredCategories,
  getStoredContent,
  saveStoredContent,
  getStoredSettings,
  saveStoredSettings,
  getAdminSession,
  setAdminSession,
  clearAdminSession
} from '../utils/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize storage once on boot
  useEffect(() => {
    initializeStorage();
  }, []);

  const [products, setProductsState] = useState(() => getStoredProducts());
  const [categories, setCategoriesState] = useState(() => getStoredCategories());
  const [content, setContentState] = useState(() => getStoredContent());
  const [settings, setSettingsState] = useState(() => getStoredSettings());
  const [adminUser, setAdminUserState] = useState(() => getAdminSession());
  const [toasts, setToasts] = useState([]);

  // Toast Notification System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product CRUD
  const addProduct = (newProduct) => {
    // Check ID uniqueness
    const exists = products.some((p) => p.id.trim().toLowerCase() === newProduct.id.trim().toLowerCase());
    if (exists) {
      showToast(`Product ID "${newProduct.id}" already exists. Please use a unique ID.`, 'error');
      return false;
    }

    const timestamp = new Date().toISOString();
    const productRecord = {
      ...newProduct,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      createdAt: timestamp,
      updatedAt: timestamp
    };

    const updated = [productRecord, ...products];
    setProductsState(updated);
    saveStoredProducts(updated);
    showToast(`Product "${productRecord.name}" added successfully.`);
    return true;
  };

  const updateProduct = (id, updatedFields) => {
    const timestamp = new Date().toISOString();
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          updatedAt: timestamp
        };
      }
      return p;
    });

    setProductsState(updated);
    saveStoredProducts(updated);
    showToast(`Product "${id}" updated successfully.`);
    return true;
  };

  const deleteProduct = (id) => {
    const toDelete = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    setProductsState(updated);
    saveStoredProducts(updated);
    showToast(`Product "${toDelete?.name || id}" was deleted.`, 'info');
    return true;
  };

  const toggleFeatured = (id) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, featured: !p.featured, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    setProductsState(updated);
    saveStoredProducts(updated);
  };

  // Category CRUD
  const addCategory = (categoryData) => {
    const exists = categories.some(
      (c) => c.name.trim().toLowerCase() === categoryData.name.trim().toLowerCase()
    );
    if (exists) {
      showToast(`Category "${categoryData.name}" already exists.`, 'error');
      return false;
    }

    const id = `cat-${Date.now()}`;
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory = { ...categoryData, id, slug, productCount: 0 };
    const updated = [...categories, newCategory];
    setCategoriesState(updated);
    saveStoredCategories(updated);
    showToast(`Category "${newCategory.name}" added successfully.`);
    return true;
  };

  const updateCategory = (id, updatedFields) => {
    const oldCat = categories.find((c) => c.id === id);
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    setCategoriesState(updated);
    saveStoredCategories(updated);

    // If category name changed, update products that belong to this category
    if (oldCat && updatedFields.name && oldCat.name !== updatedFields.name) {
      const updatedProds = products.map((p) => {
        if (p.category === oldCat.name) {
          return { ...p, category: updatedFields.name };
        }
        return p;
      });
      setProductsState(updatedProds);
      saveStoredProducts(updatedProds);
    }

    showToast('Category updated successfully.');
    return true;
  };

  const deleteCategory = (id) => {
    const targetCat = categories.find((c) => c.id === id);
    if (!targetCat) return false;

    // Check if products exist in category
    const associatedProds = products.filter((p) => p.category === targetCat.name);
    if (associatedProds.length > 0) {
      showToast(
        `Cannot delete "${targetCat.name}". It contains ${associatedProds.length} product(s). Please reassign or delete them first.`,
        'error'
      );
      return false;
    }

    const updated = categories.filter((c) => c.id !== id);
    setCategoriesState(updated);
    saveStoredCategories(updated);
    showToast(`Category "${targetCat.name}" deleted.`, 'info');
    return true;
  };

  // Content Management
  const updateContent = (newContent) => {
    setContentState(newContent);
    saveStoredContent(newContent);
    showToast('Website content saved successfully.');
  };

  // Website Settings
  const updateSettings = (newSettings) => {
    setSettingsState(newSettings);
    saveStoredSettings(newSettings);
    showToast('Website settings saved successfully.');
  };

  // Admin Auth (Demo Mode)
  const login = (username, password) => {
    // Demonstration credentials as specified in prompt
    if (username === 'admin' && password === 'Aangan@123') {
      const session = {
        username: 'admin',
        role: 'Administrator',
        loginTime: new Date().toISOString()
      };
      setAdminUserState(session);
      setAdminSession(session);
      showToast('Welcome back, Administrator.');
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password. (Hint: admin / Aangan@123)' };
  };

  const logout = () => {
    setAdminUserState(null);
    clearAdminSession();
    showToast('You have been logged out of Admin Panel.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        content,
        settings,
        adminUser,
        toasts,
        showToast,
        removeToast,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        addCategory,
        updateCategory,
        deleteCategory,
        updateContent,
        updateSettings,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
