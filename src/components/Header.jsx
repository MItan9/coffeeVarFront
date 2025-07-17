import React from "react";
import "./Header.css";
import { useAuth } from "../context/AuthContext";

export default function Header({ title = "Заголовок", showLogout = false }) {
  const { logout } = useAuth();
  const logoutIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path
          stroke-dasharray="36"
          stroke-dashoffset="36"
          d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.5s"
            values="36;0"
          />
        </path>
        <path stroke-dasharray="14" stroke-dashoffset="14" d="M9 12h11.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="14;0"
          />
        </path>
        <path
          stroke-dasharray="6"
          stroke-dashoffset="6"
          d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="6;0"
          />
        </path>
      </g>
    </svg>
  );
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="header">
      <div className="header-content">
        <img src="/logo.png" alt="Логотип CoffeeVAR" className="header-logo" />
        <h1 className="header-title">{title}</h1>
      </div>

      {showLogout && (
        <button onClick={handleLogout} className="logout-button">
          <span className="logout-content">
            {logoutIcon}
            <span>Выйти</span>
          </span>
        </button>
      )}
    </div>
  );
}
