import React, { useState, useEffect } from "react";
import "./HeaderWelcome.css";

export default function HeaderWelcome({ username = "Гость" }) {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQRCode = async () => {
    try {
      setLoading(true);
      setError("");

      const makeRequest = async () => {
        const res = await fetch("http://localhost:3000/user/qrcode", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include",
        });

        console.log("Response status:", res.status);
        if (res.status === 403) {
          // Попытка обновить access токен
          const refreshRes = await fetch(
            "http://localhost:3000/refresh-token",
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem("accessToken", data.accessToken);
            // Рекурсивно вызываем снова после обновления
            return await makeRequest();
          } else {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return;
          }
        }

        return res;
      };

      const res = await makeRequest();
      const data = await res.json();

      if (res.ok) {
        setQrCode(data.qr);
        setCode(data.code);
        console.log("QR-код получен успешно", data);
      } else {
        setError(data.error || "Ошибка при получении QR-кода");
      }
    } catch (err) {
      console.error("Ошибка сети:", err);
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
    fetchQRCode();
  };

  return (
    <div className="header-welcome">
      <div className="header-top">
        <img src="/logo.png" alt="Логотип" className="header-logo" />
        <div className="greeting-box">
          <p className="greeting-line">Привет, {username}!</p>
          <p className="greeting-subline">С возвращением</p>
        </div>
      </div>

      <div className="qr-wrapper" onClick={handleOpenPopup}>
        <div className="qr-gradient-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="qr-icon"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M15 21h-2v-2h2zm-2-7h-2v5h2zm8-2h-2v4h2zm-2-2h-2v2h2zM7 12H5v2h2zm-2-2H3v2h2zm7-5h2V3h-2zm-7.5-.5v3h3v-3zM8 9H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1m-3.5 7.5v3h3v-3zM8 21H4c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1m8.5-16.5v3h3v-3zM20 9h-4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1m-1 10v-3h-4v2h2v3h4v-2zm-2-7h-4v2h4zm-4-2H7v2h2v2h2v-2h2zm1-1V7h-2V5h-2v4zM6.75 5.25h-1.5v1.5h1.5zm0 12h-1.5v1.5h1.5zm12-12h-1.5v1.5h1.5z" />
          </svg>
        </div>
        <span className="qr-label">Отсканируй свой QR код</span>
      </div>

      {showPopup && (
        <div className="qr-popup" onClick={() => setShowPopup(false)}>
          <div
            className="qr-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            {loading && <p>Загрузка QR-кода...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {qrCode && <img src={qrCode} alt="QR-код" className="qr-image" />}
            <p>{code}</p>
            <button onClick={() => setShowPopup(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
