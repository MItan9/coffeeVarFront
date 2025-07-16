import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import QrPopup from '../components/QrPopup';
import './CouponsPage.css';
import { authFetch } from '../context/authFetch';

export default function CouponsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    try {
      const res = await authFetch("http://localhost:3000/user/coupons");
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons);
        console.log("Купоны:", data.coupons);
      }
    } catch (err) {
      console.error("Ошибка загрузки купонов", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

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

  const formatDaysLeft = (expiresAt) => {
    const now = new Date();
    const exp = new Date(expiresAt);
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return `${diff} дней`;
  };

  return (
    <div className="page-container">
      <Header title="Купоны" />

      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-image" />
            <div className="coupon-info">
              <span className="coupon-title">Бесплатный кофе</span>
              <span className="coupon-expire">
                Срок действия: {formatDaysLeft(coupon.expires_at)}
              </span>
              <button className="coupon-button" onClick={fetchQRCode}>
                ИСПОЛЬЗОВАТЬ
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="coupon-note">
        Максимум: 3 активных купона<br />
        Срок действия — 1 месяц
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
