import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, width = "max-w-2xl" }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute left-1/2 top-8 -translate-x-1/2 ${width} w-[92%] sm:w-[90%]`}
        role="dialog" aria-modal="true" aria-label={title}
      >
        <div className="bg-white rounded-3xl shadow-xl border">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">✕</button>
          </div>
          <div className="p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}