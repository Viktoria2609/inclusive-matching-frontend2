import { Routes, Route } from "react-router";
import { routerData } from "./data";

export const Router = () => {
  const pages = routerData.map(({ url, component }) => (
    <Route key={url} path={url} element={component} />
  ));

  return <Routes>{pages}</Routes>;
};