import { Link, useLocation } from "react-router-dom";
import { routes } from "@/shared/routes";
import { useAuth } from "@/hooks/AuthContext";

export const Header = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="fixed w-full top-0 left-0 right-0 z-50">
      <div className="w-full py-4 px-8 flex justify-between items-center">
        {location.pathname === routes.main ? (
          <div />
        ) : (
          <Link
            to={routes.main}
            className="inline-block mt-4 p-4 text-center rounded-4xl bg-white border duration-300 font-medium"
          >
            Inclusive Matching.
          </Link>
        )}

        {location.pathname !== routes.main && (
          <Link
            to={routes.match}
            className="inline-block mt-4 p-4 text-center rounded-4xl text-white bg-indigo-600 hover:bg-indigo-800 duration-300 font-medium"
          >
            Find Match →
          </Link>
        )}
      </div>
    </div>
  );
};
