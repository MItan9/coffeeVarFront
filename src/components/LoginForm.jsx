import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import "./authForms.css";
import { useAuth } from "../context/AuthContext";

export default function LoginForm({ onToggleMode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      mail: form.email,
      password: form.password,
    };

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Пользователь авторизирован успешно", data);
        const accessToken = data.accessToken;
        login(accessToken);
        navigate("/home");

        // toast.success("Пользователь авторизирован успешно");
      } else {
        console.error("Ошибка авторизации", data.error);
        toast.error("Ошибка авторизации. Проверьте email и пароль.");
        // можно добавить отображение ошибки в интерфейсе
      }
    } catch (err) {
      console.error("Сетевая ошибка", err);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      if (res.ok) {
        toast.success("Инструкция для смены пароля отправлена на email");
      } else {
        toast.error("Пользователь не найден, перепроверьте введенную почту");
      }
    } catch (err) {
      toast.error("Ошибка при отправке запроса на восстановление пароля");
    }
  };

  return (
    <>
      {showForgotForm ? (
        <form onSubmit={handleForgotSubmit} className="auth-form">
          <InputField
            label="Введите ваш email"
            name="forgotEmail"
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            Отправить
          </button>
          <p className="toggle-mode">
            <span onClick={() => setShowForgotForm(false)}>
              Вернуться ко входу
            </span>
          </p>
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </form>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="auth-form">
            <InputField
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
            />
            <InputField
              label="Пароль"
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
            />

            <p
              className="forgot-password"
              onClick={() => setShowForgotForm(true)}
            >
              Забыли пароль?
            </p>

            <button className="submit-btn" type="submit">
              ВОЙТИ
            </button>

            <div className="auth-social">
              <a
                className="social-btn"
                href="http://localhost:3000/auth/google"
              >
                <span className="social-icon">
                  {/* Google Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    />
                    <path
                      fill="#ff3d00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    />
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    />
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    />
                  </svg>
                </span>
                Google
              </a>
            </div>
          </form>

          <p className="toggle-mode">
            Нет аккаунта? <span onClick={onToggleMode}>Зарегистрируйтесь</span>
          </p>
        </>
      )}
    </>
  );
}
