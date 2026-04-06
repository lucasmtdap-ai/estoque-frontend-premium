import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Produtos from "./pages/Produtos.jsx";
import Vendas from "./pages/Vendas.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./layout/AppLayout.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="vendas" element={<Vendas />} />
        </Route>

        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
