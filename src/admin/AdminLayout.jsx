import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import {
  LayoutDashboard,
  Package,
  Layers,
  FileEdit,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  AlertCircle
} from 'lucide-react';

export const AdminLayout = () => {
  const { adminUser, logout } = useApp();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not logged in, show access denied / redirect message
  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] p-4">
        <div className="max-w-md w-full bg-white border border-[#EAE0D2] rounded p-8 text-center space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-[#251A16]">Admin Authentication Required</h2>
          <p className="text-xs sm:text-sm text-[#77716A]">
            You must be logged in to access the AANGAN DOORS administrative console.
          </p>
          <div className="pt-2">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] rounded"
            >
              <span>Go to Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Website Content', path: '/admin/content', icon: FileEdit },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-[#39271F]">
          <Logo variant="light" showTagline={false} />
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] text-[#A98255] uppercase tracking-wider font-medium">
              Demo Admin Console
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1.5" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors ${
                    isActive
                      ? 'bg-[#39271F] text-white border-l-2 border-[#A98255]'
                      : 'text-[#EAE0D2]/70 hover:text-white hover:bg-[#39271F]/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#A98255] shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[#39271F] space-y-3">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#EAE0D2]/80 hover:text-white hover:bg-[#39271F]/60 rounded transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#A98255]" />
            <span>View Live Website</span>
          </span>
          <span className="text-[10px] bg-[#39271F] px-1.5 py-0.5 rounded text-[#A98255]">Tab</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out (Demo)</span>
        </button>

        <div className="pt-2 text-[10px] text-[#77716A] leading-tight">
          Demo data stored in browser LocalStorage.
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#292521] flex">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 bg-[#251A16] text-[#EAE0D2] shrink-0 fixed inset-y-0 left-0 z-30 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-in fade-in"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#251A16] text-[#EAE0D2] shadow-2xl transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-4 right-4 lg:hidden">
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 text-[#EAE0D2] hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#EAE0D2] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-[#251A16] hover:bg-[#FAF7F2] rounded"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-lg font-medium text-[#251A16]">
              AANGAN DOORS Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#251A16] hover:text-[#A98255] border border-[#EAE0D2] rounded hover:bg-[#FAF7F2] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Digital Showroom</span>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-[#EAE0D2]">
              <div className="w-7 h-7 rounded-full bg-[#251A16] text-[#A98255] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-xs text-[#251A16] font-medium hidden sm:inline">
                {adminUser.username}
              </span>
            </div>
          </div>
        </header>

        {/* Demo Notice Banner */}
        <div className="bg-[#FAF7F2] border-b border-[#EAE0D2] px-4 sm:px-8 py-2 text-[11px] text-[#77716A] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#A98255] shrink-0" />
            <span>
              <strong>Demo Environment:</strong> Changes update your live browser session and persist in LocalStorage.
            </span>
          </div>
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
