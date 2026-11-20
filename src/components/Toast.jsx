import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded shadow-xl border text-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
              isError
                ? 'bg-[#2A1810] text-[#F7F3EC] border-red-800/60'
                : isInfo
                ? 'bg-[#251A16] text-[#EAE0D2] border-[#A98255]/40'
                : 'bg-[#251A16] text-[#F7F3EC] border-[#A98255]/60'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isError ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : isInfo ? (
                <Info className="w-5 h-5 text-[#A98255]" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <p className="flex-1 leading-snug">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#EAE0D2]/60 hover:text-[#F7F3EC] shrink-0 p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
