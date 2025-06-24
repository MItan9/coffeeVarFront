import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState(null); // null | "login" | "register"

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/logo.png" className="auth-logo" alt="CoffeeVar logo" />

        {mode === null && (
          <div className="auth-choice-buttons">
            <button
              className="auth-button auth-button-enter"
              onClick={() => setMode("login")}
            >
              ВОЙТИ
            </button>

            <p className="toggle-mode">
              Нет аккаунта?{" "}
              <span className="auth-button" onClick={() => setMode("register")}>
                Зарегистрируйтесь
              </span>
            </p>
          </div>
        )}

        {mode === "login" && (
          <LoginForm onToggleMode={() => setMode("register")} />
        )}
        {mode === "register" && (
          <RegisterForm onToggleMode={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
