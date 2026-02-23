'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeToast, Toast } from '@/store/uiSlice';

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const STYLES = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  error: 'bg-red-50 border-red-200 text-red-900',
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  warning: 'bg-amber-50 border-amber-200 text-amber-900',
};

const ICON_STYLES = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-amber-500',
};

const AUTO_DISMISS_MS = 4500;

function ToastItem({ toast }: { toast: Toast }) {
  const dispatch = useAppDispatch();
  const Icon = ICONS[toast.type];

  useEffect(() => {
    const t = setTimeout(() => dispatch(removeToast(toast.id)), AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [toast.id, dispatch]);

  return (
    <div
      className={`flex items-start gap-3 w-80 max-w-full px-4 py-3.5 rounded-2xl border shadow-xl shadow-slate-200/50 animate-in slide-in-from-right-5 fade-in-0 duration-300 ${STYLES[toast.type]}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${ICON_STYLES[toast.type]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold leading-tight">{toast.title}</p>
        {toast.message && (
          <p className="text-xs mt-0.5 opacity-80 leading-snug">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * Global toast notification container — rendered in root layout.
 * Dispatch `addToast(toast.success('Title'))` from anywhere in the app.
 */
export default function ToastContainer() {
  const toasts = useAppSelector((s) => s.ui.toasts);
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
