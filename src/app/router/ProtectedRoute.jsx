import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/AuthContext";

import { routes } from "@/shared/routes";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const redirectTo = location.pathname + location.search;

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <Navigate
        to={`${routes.login}?redirectTo=${decodeURI(redirectTo)}`}
        replace
      />
    );
  }

  return children;
}
