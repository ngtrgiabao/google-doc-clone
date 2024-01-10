import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/login/index.tsx";
import Register from "./pages/register/index.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import { ToastProvider } from "./context/toast-context.tsx";
import VerifyEmail from "./pages/user/verify-email.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/verify-email/:token" element={<VerifyEmail />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
