import { useState, useCallback } from "react";

import { ToastContext } from "./context";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, message, duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const toast = {
    success: (msg) => addToast({ type: "success", message: msg }),
    error: (msg) => addToast({ type: "error", message: msg }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
        {toasts.map(({ id, type, message }) => (
          <div
            key={id}
            className={
              `px-8 py-4 rounded-4xl shadow text-base text-white animate-fade-in-out ` +
              (type === "success" ? "bg-green-500" : "bg-red-500")
            }
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
