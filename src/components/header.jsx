import { Link, useLocation } from "react-router-dom";
import { routes } from "@/shared/routes";
import { useAuth } from "@/hooks/AuthContext";

export const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const onMain = location.pathname === routes.main;

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="w-full py-3 px-8 flex justify-between items-center">

        {onMain ? (
          <div />
        ) : (
          <Link
            to={routes.main}
            aria-label="Home"
            title="Home"
            className="pointer-events-auto inline-flex items-center justify-center
                       w-12 h-12 rounded-full bg-white/80 border shadow hover:bg-white transition"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
            </svg>
          </Link>
        )}

        {!onMain && (
          <Link
            to={routes.match}
            className="pointer-events-auto inline-block px-5 py-3 rounded-3xl
                       text-white bg-indigo-600 hover:bg-indigo-800 transition font-medium"
          >
            Find Match →
          </Link>
        )}
      </div>
    </div>
  );
};