import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import GoogleSuccess from "./components/GoogleSuccess.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CupsPage from "./pages/CupsPage.jsx";
import CouponsPage from "./pages/CouponsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import "./index.css";

// Проверка авторизации по наличию токена
const isAuthenticated = () => !!localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Google login redirect */}
        <Route path="/google-success" element={<GoogleSuccess />} />

        {/* Если не авторизован — показываем AuthPage */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/home" replace /> : <AuthPage />
          }
        />

        {/* Защищённая часть приложения */}
        <Route
          path="/"
          element={isAuthenticated() ? <Layout /> : <Navigate to="/" />}
        >
          <Route path="home" element={<HomePage />} />
          <Route path="cups" element={<CupsPage />} />
          <Route path="coupons" element={<CouponsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
