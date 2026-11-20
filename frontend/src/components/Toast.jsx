import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in">
      <div className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all ${
        isError 
          ? 'bg-red-950/80 border-red-500/40 text-red-200' 
          : isInfo 
          ? 'bg-sky-950/80 border-sky-500/40 text-sky-200'
          : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
      }`}>
        <div className="shrink-0 mt-0.5">
          {isError ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : isInfo ? (
            <Info className="w-5 h-5 text-sky-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </div>
        <button 
          onClick={onClose}
          className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

