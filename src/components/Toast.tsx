import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
        let borderClass = 'border-emerald-500/30';
        
        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
          borderClass = 'border-rose-500/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />;
          borderClass = 'border-blue-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[var(--surface-elevated)] border ${borderClass} shadow-xl shadow-black/30 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-[var(--text)]">{toast.title}</h5>
              {toast.description && (
                <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-lg focus:outline-none"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
