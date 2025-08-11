import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, width = "max-w-2xl" }) {

  useEffect(() => {
    if (!isOpen) return;
    const prevBody = document.body.style.overflow;
    const prevRoot = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevRoot;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />


      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative mt-6 w-[92%] sm:w-auto ${width} pointer-events-auto`}
      >
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              ✕
            </button>
          </div>


          <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}