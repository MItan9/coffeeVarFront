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

      const res = await fetch("http://localhost:3000/user/qrcode", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });

      if (res.status === 403) {
        const refreshRes = await fetch("http://localhost:3000/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("accessToken", data.accessToken);
          return await fetchQRCode();
        } else {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return;
        }
      }

      const data = await res.json();
      if (res.ok) {
        setQrCode(data.qr);
        setCode(data.code);
      } else {
        setError(data.error || "Ошибка при получении QR-кода");
      }
    } catch {
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="header-welcome">
      <div className="welcome-top">
        <img src="/logo.png" alt="Логотип" className="welcome-logo" />
        <div className="welcome-greeting">
          <p className="welcome-line">Привет, {username}!</p>
          <p className="welcome-subline">С возвращением</p>
        </div>
      </div>

      <div className="welcome-qr" onClick={() => { setShowPopup(true); fetchQRCode(); }}>
        <div className="qr-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="qr-icon" viewBox="0 0 24 24" fill="white">
            <path d="M15 21h-2v-2h2v2zm-2-7h-2v5h2v-5zm8-2h-2v4h2v-4zm-2-2h-2v2h2v-2zM7 12H5v2h2v-2zm-2-2H3v2h2v-2zm7-5h2V3h-2v2zm-7.5-.5v3h3v-3h-3zM8 9H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1zm-3.5 7.5v3h3v-3h-3zM8 21H4c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1zm8.5-16.5v3h3v-3h-3zM20 9h-4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1zm-1 10v-3h-4v2h2v3h4v-2zm-2-7h-4v2h4v-2zm-4-2H7v2h2v2h2v-2h2v-2zm1-1V7h-2V5h-2v4h4zM6.75 5.25h-1.5v1.5h1.5v-1.5zm0 12h-1.5v1.5h1.5v-1.5zm12-12h-1.5v1.5h1.5v-1.5z"/>

          </svg>
        </div>
        <span className="qr-text">Отсканируй свой QR код</span>
      </div>

      {showPopup && (
        <div className="qr-popup" onClick={() => setShowPopup(false)}>
          <div className="qr-popup-content" onClick={(e) => e.stopPropagation()}>
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
