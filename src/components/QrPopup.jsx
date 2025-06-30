import React from "react";
import "./QrPopup.css";

export default function QrPopup({ show, qrCode, code, loading, error, onClose }) {
  if (!show) return null;

  return (
    <div className="qr-popup" onClick={onClose}>
      <div className="qr-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close" onClick={onClose}>×</button>

        <h2 className="qr-title">Мой QR-код</h2>

        {loading && <p className="qr-status">Загрузка QR-кода...</p>}
        {error && <p className="qr-status error">{error}</p>}

        {qrCode && <img src={qrCode} alt="QR-код" className="qr-image" />}
        {code && <p className="qr-code">{code}</p>}

        <p className="qr-hint">Покажите QR на кассе после покупки кофе</p>
      </div>
    </div>
  );
}
