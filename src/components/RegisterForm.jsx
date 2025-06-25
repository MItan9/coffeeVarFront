import { useState } from "react";
import InputField from "./InputField";
import "./authForms.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ onToggleMode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    confirmPassword: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!/^[A-Za-z\d]{8,}$/.test(form.password)) {
      newErrors.password =
        "Пароль должен содержать минимум 8 символов и только английские буквы";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (!/^\+?\d{8,15}$/.test(form.phone)) {
      newErrors.phone = "Введите номер с 8–15 цифрами, можно с '+' в начале";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Введите корректный email с символом @ и точкой";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({ confirmPassword: "", phone: "" });

    const body = {
      username: form.name,
      userSurname: form.surname,
      mail: form.email,
      phone: form.phone,
      password: form.password,
    };

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Регистрация успешна", data);
        onToggleMode();
      } else {
        console.error("Ошибка регистрации", data.error);
        // можно добавить отображение ошибки в интерфейсе
      }
    } catch (err) {
      console.error("Сетевая ошибка", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          label="Ваше имя"
          name="name"
          onChange={handleChange}
          value={form.name}
        />
        <InputField
          label="Ваше фамилия"
          name="surname"
          onChange={handleChange}
          value={form.surname}
        />
        <InputField
          label="Телефон"
          name="phone"
          type="tel"
          inputMode="numeric"
          onChange={handleChange}
          value={form.phone}
          error={errors.phone}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={form.email}
          error={errors.email}
        />
        <InputField
          label="Пароль"
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          error={errors.password}
        />
        <InputField
          label="Повторите пароль"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={form.confirmPassword}
          error={errors.confirmPassword}
        />

        <button className="submit-btn" type="submit">
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>

        <div className="auth-social">
          <button className="social-btn">
            <span className="social-icon">
              {/* Google SVG */}
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
          </button>
        </div>
      </form>

      <p className="toggle-mode">
        Есть аккаунт? <span onClick={onToggleMode}>Войти</span>
      </p>
    </>
  );
}
