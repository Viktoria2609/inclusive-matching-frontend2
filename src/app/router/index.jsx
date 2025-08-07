import { Routes, Route } from "react-router";
import { routerData } from "./data";
import ProtectedRoute from "./ProtectedRoute";

export const Router = () => {
  const pages = routerData.map(({ url, component, secure }) => {
    let protectedElement = <ProtectedRoute>{component}</ProtectedRoute>;
    return (
      <Route
        key={url}
        path={url}
        element={secure ? protectedElement : component}
      />
    );
  });

  return <Routes>{pages}</Routes>;
};
