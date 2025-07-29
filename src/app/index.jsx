import { BrowserRouter } from "react-router";

import { Header } from "@/components/header";
import { ToastProvider } from "@/components/toast/";

import { Router } from "./router";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastProvider>
        <Router />
      </ToastProvider>
    </BrowserRouter>
  );
}
