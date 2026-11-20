import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Package,
  Layers,
  Sparkles,
  Heart,
  Plus,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const Dashboard = () => {
  const { products, categories, settings } = useApp();
  const { wishlistCount } = useWishlist();

  const featuredCount = products.filter((p) => p.featured).length;

  // Recent products (sorted by updatedAt or createdAt)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE0D2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A98255] font-medium">
            Overview
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#251A16] font-medium mt-0.5">
            Workshop Management Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#77716A] mt-1">
            Real-time catalog inventory and digital showroom configuration.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#251A16] bg-white border border-[#EAE0D2] hover:bg-[#FAF7F2] rounded transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Real LocalStorage Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-sm border border-[#EAE0D2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#77716A]">
            <span className="uppercase tracking-wider font-medium">Total Products</span>
            <Package className="w-4 h-4 text-[#A98255]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-[#251A16]">
              {products.length}
            </span>
            <span className="text-xs text-[#77716A]">Designs Active</span>
          </div>
          <div className="pt-2 border-t border-[#EAE0D2]/50 text-xs">
            <Link to="/admin/products" className="text-[#A98255] hover:underline flex items-center gap-1">
              <span>Manage products</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-5 rounded-sm border border-[#EAE0D2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#77716A]">
            <span className="uppercase tracking-wider font-medium">Categories</span>
            <Layers className="w-4 h-4 text-[#A98255]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-[#251A16]">
              {categories.length}
            </span>
            <span className="text-xs text-[#77716A]">Door Types</span>
          </div>
          <div className="pt-2 border-t border-[#EAE0D2]/50 text-xs">
            <Link to="/admin/categories" className="text-[#A98255] hover:underline flex items-center gap-1">
              <span>Manage categories</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white p-5 rounded-sm border border-[#EAE0D2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#77716A]">
            <span className="uppercase tracking-wider font-medium">Featured Showcase</span>
            <Sparkles className="w-4 h-4 text-[#A98255]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-[#251A16]">
              {featuredCount}
            </span>
            <span className="text-xs text-[#77716A]">on Homepage</span>
          </div>
          <div className="pt-2 border-t border-[#EAE0D2]/50 text-xs text-[#77716A]">
            <span>Highlighted in showroom</span>
          </div>
        </div>

        {/* Wishlist Active Items */}
        <div className="bg-white p-5 rounded-sm border border-[#EAE0D2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#77716A]">
            <span className="uppercase tracking-wider font-medium">Active Shortlist</span>
            <Heart className="w-4 h-4 text-[#A98255]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-[#251A16]">
              {wishlistCount}
            </span>
            <span className="text-xs text-[#77716A]">Items Shortlisted</span>
          </div>
          <div className="pt-2 border-t border-[#EAE0D2]/50 text-xs">
            <Link to="/wishlist" className="text-[#A98255] hover:underline flex items-center gap-1">
              <span>View user shortlist</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Products & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Products */}
        <div className="lg:col-span-8 bg-white border border-[#EAE0D2] rounded-sm p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EAE0D2] pb-3">
            <h3 className="font-serif text-lg font-medium text-[#251A16]">
              Recent Product Updates
            </h3>
            <Link
              to="/admin/products"
              className="text-xs text-[#A98255] hover:text-[#251A16] font-medium uppercase tracking-wider"
            >
              View All ({products.length})
            </Link>
          </div>

          <div className="divide-y divide-[#EAE0D2]/60">
            {recentProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#251A16]/5 rounded overflow-hidden shrink-0 border border-[#EAE0D2]">
                    <img
                      src={p.images?.[0] || '/images/door-fallback.svg'}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/door-fallback.svg';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-[#251A16]">{p.name}</h4>
                    <p className="text-xs text-[#77716A]">
                      ID: <span className="font-mono">{p.id}</span> • {p.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="bg-[#FAF7F2] border border-[#A98255]/40 text-[#A98255] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                      Featured
                    </span>
                  )}
                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="text-xs text-[#77716A] hover:text-[#251A16] border border-[#EAE0D2] px-2.5 py-1 rounded hover:bg-[#FAF7F2] transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Configuration & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#EAE0D2] rounded-sm p-6 space-y-4 shadow-xs">
            <h3 className="font-serif text-lg font-medium text-[#251A16] border-b border-[#EAE0D2] pb-3">
              Quick Shortcuts
            </h3>
            <div className="space-y-2">
              <Link
                to="/admin/products/new"
                className="w-full flex items-center justify-between p-3 rounded bg-[#FAF7F2] border border-[#EAE0D2] hover:border-[#A98255] text-xs font-medium text-[#251A16] transition-colors"
              >
                <span>Add New Wooden Door</span>
                <Plus className="w-4 h-4 text-[#A98255]" />
              </Link>

              <Link
                to="/admin/categories"
                className="w-full flex items-center justify-between p-3 rounded bg-[#FAF7F2] border border-[#EAE0D2] hover:border-[#A98255] text-xs font-medium text-[#251A16] transition-colors"
              >
                <span>Manage Categories ({categories.length})</span>
                <Layers className="w-4 h-4 text-[#A98255]" />
              </Link>

              <Link
                to="/admin/content"
                className="w-full flex items-center justify-between p-3 rounded bg-[#FAF7F2] border border-[#EAE0D2] hover:border-[#A98255] text-xs font-medium text-[#251A16] transition-colors"
              >
                <span>Edit Hero & Website Text</span>
                <ArrowRight className="w-4 h-4 text-[#A98255]" />
              </Link>

              <Link
                to="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded bg-[#FAF7F2] border border-[#EAE0D2] hover:border-[#A98255] text-xs font-medium text-[#251A16] transition-colors"
              >
                <span>WhatsApp & Brand Settings</span>
                <ArrowRight className="w-4 h-4 text-[#A98255]" />
              </Link>
            </div>
          </div>

          {/* Business WhatsApp Status */}
          <div className="bg-[#FAF7F2] border border-[#EAE0D2] rounded-sm p-5 space-y-2 text-xs">
            <span className="font-semibold text-[#251A16] uppercase tracking-wider text-[10px] block">
              Active WhatsApp Routing:
            </span>
            <div className="font-mono text-sm text-[#251A16] bg-white p-2 rounded border border-[#EAE0D2]">
              +{settings.whatsappNumber}
            </div>
            <p className="text-[11px] text-[#77716A]">
              All product inquiries, wishlist shares, and custom design buttons route to this number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
