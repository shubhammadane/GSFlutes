import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          {toast.type === 'success' && <CheckCircle size={18} color="var(--color-gold-light)" />}
          {toast.type === 'info' && <Info size={18} color="#72B6E6" />}
          {toast.type === 'warning' && <AlertTriangle size={18} color="#FFC72C" />}
          {toast.type === 'error' && <AlertCircle size={18} color="#FF7B7B" />}

          <span className="toast-msg">{toast.message}</span>

          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }}
            aria-label="Close notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
