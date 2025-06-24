import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import GoogleSuccess from "./components/GoogleSuccess.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
