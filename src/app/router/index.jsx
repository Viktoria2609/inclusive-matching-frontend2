import { Routes, Route } from "react-router";
import { routerData } from "./data";
import { CreateProfilePage } from "@/pages/create-profile";

export const Router = () => {
  const pages = [
    ...routerData.map(({ url, component }) => (
      <Route key={url} path={url} element={component} />
    )),
    <Route key="/create-profile" path="/create-profile" element={<CreateProfilePage />} />,
  ];

  return <Routes>{pages}</Routes>;
};