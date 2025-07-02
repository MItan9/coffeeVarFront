import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../context/authFetch";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const IconUser = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"
      />
    </svg>
  );

  const IconMail = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 36 36"
      fill="currentColor"
    >
      <path d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" />
      <path d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );

  const IconPhone = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317" />
    </svg>
  );

  const IconBell = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v2" />
      <path d="M12 5c-3.31 0 -6 2.69 -6 6v6c-1 0 -2 1 -2 2h8" />
      <path d="M12 5c3.31 0 6 2.69 6 6v6c1 0 2 1 2 2h-8" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );

  const IconTrash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17" />
    </svg>
  );

  const IconLogout = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
        <path d="M9 12h12l-3-3m0 6l3-3" />
      </g>
    </svg>
  );

  const iconEdit = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
      />
    </svg>
  );

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const fetchUserData = async () => {
    const res = await authFetch("http://localhost:3000/user/profile");
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      setFormData({ name: data.name, surname: data.surname });
    } else {
      console.error("Ошибка получения профиля");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = (field) => setEditingField(field);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingField) return;

    try {
      const updatedField = {
        [editingField]: formData[editingField],
      };

      const res = await authFetch("http://localhost:3000/user/update", {
        method: "PATCH",
        body: JSON.stringify(updatedField),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setEditingField(null);
      } else {
        console.error("Ошибка обновления:", res.status);
      }
    } catch (err) {
      console.error("Ошибка сети при обновлении:", err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await authFetch("http://localhost:3000/user/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });

      if (res.ok) {
        logout();
      } else {
        const data = await res.json();
        console.error("Ошибка при удалении:", data.error);
        alert("Не удалось удалить аккаунт.");
      }
    } catch (err) {
      console.error("Сетевая ошибка:", err);
      alert("Ошибка сети. Попробуйте позже.");
    }
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <>
      <Header title="Профиль" />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-row">
            <span className="icon-wrapper">{IconUser}</span>
            {editingField === "name" ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  className="input-field"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleSave}
                  autoFocus
                />
                <button className="icon-button" onClick={handleSave}>
                  ✔
                </button>
                <button
                  className="icon-button"
                  onClick={() => setEditingField(null)}
                >
                  ✖
                </button>
              </div>
            ) : (
              <>
                <span className="profile-text">{user.name}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEdit("name")}
                >
                  {iconEdit}
                </button>
              </>
            )}
          </div>

          <div className="profile-row">
            <span className="icon-wrapper">{IconUser}</span>
            {editingField === "surname" ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  className="input-field"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  onBlur={handleSave}
                  autoFocus
                />
                <button className="icon-button" onClick={handleSave}>
                  ✔
                </button>
                <button
                  className="icon-button"
                  onClick={() => setEditingField(null)}
                >
                  ✖
                </button>
              </div>
            ) : (
              <>
                <span className="profile-text">{user.surname}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEdit("surname")}
                >
                  {iconEdit}
                </button>
              </>
            )}
          </div>

          <div className="profile-row">
            <span className="icon-wrapper">{IconMail}</span>
            <span className="profile-text ellipsis-text">{user.mail}</span>
          </div>

          <div className="profile-row">
            <span className="icon-wrapper">{IconPhone}</span>
            {editingField === "phone" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="input-field"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleSave}
                  autoFocus
                />
                <button className="icon-button" onClick={handleSave}>
                  ✔
                </button>
                <button
                  className="icon-button"
                  onClick={() => setEditingField(null)}
                >
                  ✖
                </button>
              </div>
            ) : (
              <>
                <span className="profile-text">{user.phone}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEdit("phone")}
                >
                  {iconEdit}
                </button>
              </>
            )}
          </div>

          <div className="profile-row">
            <span className="icon-wrapper">{IconBell}</span>
            <span className="profile-text">Уведомления</span>
          </div>

          <div className="profile-row">
            <span className="icon-wrapper">{IconTrash}</span>
            <span className="profile-text" onClick={() => setShowConfirm(true)}>
              Удалить аккаунт
            </span>

            {showConfirm && (
              <div className="modal-backdrop">
                <div className="modal">
                  <p>
                    Вы уверены, что хотите удалить аккаунт? Это действие
                    необратимо.
                  </p>
                  <div className="modal-buttons">
                    <button onClick={handleDeleteAccount}>Да, удалить</button>
                    <button onClick={() => setShowConfirm(false)}>
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="profile-row logout"
            onClick={() => console.log("logout")}
          >
            <span className="icon-wrapper">{IconLogout}</span>
            <span
              className="profile-text"
              onClick={handleClick}
              style={{ color: "red" }}
            >
              Выйти
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
