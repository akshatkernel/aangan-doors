import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const { adminUser, login } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Aangan@123');
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to /admin
  useEffect(() => {
    if (adminUser) {
      navigate('/admin');
    }
  }, [adminUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMessage(res.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-block mb-2">
            <Logo />
          </div>
          <h2 className="font-serif text-2xl text-[#251A16] font-medium">
            Administrative Console
          </h2>
          <p className="text-xs text-[#77716A]">
            Manage products, categories, website content and settings
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white border border-[#EAE0D2] rounded-sm p-8 shadow-lg space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#251A16] font-medium block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#EAE0D2] rounded text-[#251A16] focus:outline-hidden focus:border-[#A98255] transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#251A16] hover:bg-[#39271F] border border-[#A98255]/50 rounded shadow-xs transition-colors"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Discreet Demo Credentials Hint */}
          <div className="pt-4 border-t border-[#EAE0D2] text-[11px] text-[#77716A] space-y-1.5 bg-[#FAF7F2] p-3 rounded">
            <span className="font-semibold text-[#251A16] block uppercase tracking-wider text-[10px]">
              Demo Demonstration Credentials:
            </span>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span>Username: <strong className="text-[#251A16]">admin</strong></span>
              <span>Password: <strong className="text-[#251A16]">Aangan@123</strong></span>
            </div>
          </div>
        </div>

        {/* Security Limitation Disclaimer */}
        <div className="text-[11px] text-[#77716A] text-center leading-relaxed max-w-sm mx-auto space-y-1">
          <p>
            <strong>Note on Demo Architecture:</strong> This application utilizes browser-only LocalStorage for authentication and data persistence. It is designed as an interactive showroom demo, not a production enterprise system.
          </p>
          <p>
            <Link to="/" className="text-[#A98255] hover:underline">
              ← Return to Customer Website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
