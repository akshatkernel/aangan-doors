import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ToastContainer } from './components/Toast';

// Customer Pages
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { ProductDetails } from './pages/ProductDetails';
import { Production } from './pages/Production';
import { Wishlist } from './pages/Wishlist';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { Dashboard } from './admin/Dashboard';
import { ProductManagement } from './admin/ProductManagement';
import { ProductForm } from './admin/ProductForm';
import { CategoryManagement } from './admin/CategoryManagement';
import { ContentManagement } from './admin/ContentManagement';
import { Settings } from './admin/Settings';

// Scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Customer Pages Shell (Navbar, Footer, Floating WhatsApp, Toast)
const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#292521]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <WishlistProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Customer Routes with Customer Layout */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/production" element={<Production />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Login Route (Stand-alone without admin sidebar) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Dashboard & Sub-routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </AppProvider>
  );
}
