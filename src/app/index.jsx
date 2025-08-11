import { BrowserRouter } from "react-router-dom"; 
import { Header } from "@/components/header";
import { ToastProvider } from "@/components/toast";
import { AuthProvider } from "@/hooks/AuthContext";
import { Router } from "./router";

export function App() {
  return (
    <BrowserRouter>             
      <AuthProvider>             
        <Header />
        <ToastProvider>
          <Router />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}