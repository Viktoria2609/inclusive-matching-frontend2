import { BrowserRouter } from "react-router";

import { Header } from "@/components/header";
import { ToastProvider } from "@/components/toast";
import { AuthProvider } from "@/hooks/AuthContext";

import { Router } from "./router";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ToastProvider>
          <Router />
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
