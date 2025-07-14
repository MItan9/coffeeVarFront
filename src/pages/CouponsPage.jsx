import React, { useState } from 'react';
import Header from '../components/Header';
import QrPopup from '../components/QrPopup';
import './CouponsPage.css';
import { authFetch } from '../context/authFetch';

const coupons = [
  { id: 1, name: 'Бесплатный кофе', expiresIn: '31 дней' },
  { id: 2, name: 'Бесплатный кофе', expiresIn: '29 дней' },
  { id: 3, name: 'Бесплатный кофе', expiresIn: '27 дней' },
];

export default function CouponsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQRCode = async () => {
    try {
      setShowPopup(true);
      setLoading(true);
      setError("");
      setQrCode(null);
      setCode(null);

      const res = await authFetch("http://localhost:3000/user/qrcode");

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Ошибка при получении QR-кода");
        return;
      }

      const data = await res.json();
      setQrCode(data.qr);
      setCode(data.code);
    } catch (err) {
      console.error("Ошибка сети:", err);
      setError("Ошибка сети при получении QR-кода");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header title="Купоны" />

      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-image" />
            <div className="coupon-info">
              <span className="coupon-title">{coupon.name}</span>
              <span className="coupon-expire">
                Срок действия: {coupon.expiresIn}
              </span>
              <button className="coupon-button" onClick={fetchQRCode}>
                ИСПОЛЬЗОВАТЬ
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="coupon-note">
        Максимальное количество купонов: 3<br />
        Срок действия каждого купона — 1 месяц
      </p>

      <QrPopup
        show={showPopup}
        qrCode={qrCode}
        code={code}
        loading={loading}
        error={error}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
