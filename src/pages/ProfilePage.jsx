import React from "react";
import "./ProfilePage.css";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="page-container">
      <Header title="Профиль" />
      <h2>👤 Профиль</h2>
      <p>Информация о пользователе, настройках и истории заказов.</p>
      <button onClick={handleClick}>Выйти</button>
    </div>
  );
}
