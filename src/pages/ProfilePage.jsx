import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// export default function ProfilePage() {

//   return (
//     <div className="page-container">
//       <Header title="Профиль" />
//       <h2>👤 Профиль</h2>
//       <p>Информация о пользователе, настройках и истории заказов.</p>
//       <button onClick={handleClick}>Выйти</button>
//     </div>
//   );
// }

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});

  const handleClick = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:3000/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({ name: data.name, surname: data.surname });
      })
      .catch((err) => console.error("Ошибка загрузки профиля:", err));
  }, []);

  const handleEdit = (field) => setEditingField(field);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    fetch("http://localhost:3000/user/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        setEditingField(null);
      })
      .catch((err) => console.error("Ошибка обновления:", err));
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-row">
          <span>👤</span>
          {editingField === "name" ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <span>{user.name}</span>
              <button onClick={() => handleEdit("name")}>✏️</button>
            </>
          )}
        </div>

        <div className="profile-row">
          <span>👤</span>
          {editingField === "surname" ? (
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              <span>{user.surname}</span>
              <button onClick={() => handleEdit("surname")}>✏️</button>
            </>
          )}
        </div>

        <div className="profile-row">
          <span>📧</span>
          <span>{user.mail}</span>
        </div>

        <div className="profile-row">
          <span>📞</span>
          <span>{user.phone}</span>
        </div>

        <div className="profile-row">
          <span>🔔</span>
          <span>Уведомления</span>
        </div>

        <div className="profile-row">
          <span>🗑</span>
          <span>Удалить аккаунт</span>
        </div>

        <div
          className="profile-row logout"
          onClick={() => console.log("logout")}
        >
          <span>↩️</span>
          <span onClick={handleClick} style={{ color: "red" }}>
            Выйти
          </span>
        </div>
      </div>
    </div>
  );
}
