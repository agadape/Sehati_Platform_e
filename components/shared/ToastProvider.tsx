"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in slide-in-from-bottom-5 fade-in duration-300 ${
              toast.type === "success" 
                ? "bg-brand text-white border-brand-dark" 
                : toast.type === "error"
                ? "bg-red-600 text-white"
                : "bg-white text-brand-ink border border-brand-border"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              <span className="text-sm font-medium leading-snug">{toast.message}</span>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/10 transition-colors ml-4 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
