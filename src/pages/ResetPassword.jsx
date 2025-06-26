import { useState } from "react";
import InputField from "../components/InputField";
import "../components/authForms.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!/^[A-Za-z\d]{6,}$/.test(form.password)) {
      newErrors.password =
        "Пароль должен содержать минимум 6 символов и только английские буквы";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({ confirmPassword: "" });

    const body = {
      token: token,
      password: form.password,
    };

    try {
      const res = await fetch("http://localhost:3000/set-new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Регистрация успешна", data);
        navigate("/");
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <form onSubmit={handleSubmit} className="auth-form">
          <img src="/logo.png" className="auth-logo" alt="CoffeeVar logo" />
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
            ИЗМЕНИТЬ ПАРОЛЬ
          </button>
        </form>
      </div>
    </>
  );
}
