import { useCallback, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

export interface ToastApi {
  toasts: ToastItem[];
  showToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: number) => void;
}

export const useToast = (): ToastApi => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: number): void => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, variant: ToastVariant = 'info'): void => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, variant }].slice(-3));
    window.setTimeout(() => dismissToast(id), 3000);
  }, [dismissToast]);

  return { toasts, showToast, dismissToast };
};
