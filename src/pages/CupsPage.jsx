import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CouponPopup from "../components/CouponPopup";
import "./CupsPage.css";
import { authFetch } from "../context/authFetch";

export default function CupsPage() {
  const total = 6;
  const [cups, setCups] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCoupon, setShowCoupon] = useState(false);
  const [previousCups, setPreviousCups] = useState(0);
  const [queuedCoupons, setQueuedCoupons] = useState(0);



  const fetchCups = async () => {
    try {
      const res = await authFetch("http://localhost:3000/user/cups");
      if (res.ok) {
        const data = await res.json();
        setCups(data.cups.cups_number);
       
      } else {
        console.error("Ошибка при получении количества чашек");
      }
    } catch (err) {
      console.error("Ошибка сети при получении чашек", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCups();
  }, []);

useEffect(() => {
  const couponsAvailable = Math.floor(cups / total);
  setQueuedCoupons(couponsAvailable);

  if (couponsAvailable > 0 && previousCups < total) {
    setShowCoupon(true);
    addCouponDeleteCup();
  }

  setPreviousCups(cups);
}, [cups]);


  const addCouponDeleteCup = async () => {
    try {
      const res = await authFetch("http://localhost:3000/user/add-coupon-delete-cups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
       setCups(cups -6 );

      if (!res.ok) {
        console.error("Ошибка при добавлении купона");
      }
    } catch (err) {
      console.error("Сетевая ошибка при добавлении купона", err);
    }
  };

  const handleCouponClose = async () => {
  setShowCoupon(false);

  if (queuedCoupons > 1) {
    setQueuedCoupons(queuedCoupons - 1);
    setShowCoupon(true);
    addCouponDeleteCup();
  }
};


  const strokeLength = 2 * Math.PI * 120;
const safeCups = Math.min(cups, total);
const offset = strokeLength * (1 - safeCups / total);



  const getCupPhrase = (count) => {
    if (count === 1) return "Осталась 1 чашка";
    if ([2, 3, 4].includes(count)) return `Осталось ${count} чашки`;
    return `Осталось ${count} чашек`;
  };

 
  return (
    <div className="page-container">
      <Header title="Чашки" />
      <div className="page-content">
        <p className="circle-text">Каждое 7-е кофе — бесплатно!</p>

        <div className="main-circle">
          <svg className="progress-ring" viewBox="0 0 260 260" style={{ transform: "scale(-1, 1)" }}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#846046" />
                <stop offset="100%" stopColor="#412d20" />
              </linearGradient>
            </defs>
            <circle cx="130" cy="130" r="120" fill="#D8CCC3" />
            <circle
              key={cups}
              cx="130"
              cy="130"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeDasharray={strokeLength}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 130 130)"
            />
          </svg>

          <div className="cup-grid">
            {Array.from({ length: total }, (_, i) => (
              <svg
                key={i}
                className={`cup-icon ${i < cups ? "filled" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 4a2 2 0 0 1 2 2v2.035A3.5 3.5 0 0 1 18.5 15h-.788a8.54 8.54 0 0 1-3.208 3H17a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h2.496A8.5 8.5 0 0 1 2 10.5V6a2 2 0 0 1 2-2z"
                />
              </svg>
            ))}
          </div>
        </div>

        <p className="gift-info">
         {getCupPhrase(Math.max(total - cups, 0))} — и кофе в подарок!
        </p>

        <p className="coupon-terms">
          <span>
            * Выбирайте любимый напиток в подарок — эспрессо, американо, капучино или латте.<br />
            Молоко и другие дополнения — за отдельную плату.
          </span>
        </p>
      </div>

      {showCoupon && <CouponPopup onClose={handleCouponClose} />}
    </div>
  );
}
