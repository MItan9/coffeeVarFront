import React, { useState } from "react";
import "./CouponPopup.css";

export default function CouponPopup({ onClose, couponCount, usedCount = 0 }) {
  const [closing, setClosing] = useState(false);
  const remaining = couponCount - usedCount;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`coupon-popup ${closing ? "closing" : ""}`} onClick={handleClose}>
      <div className="coupon-content" onClick={(e) => e.stopPropagation()}>
        <div className="coupon-info-top">
          Вы получили {couponCount} купон{couponCount > 1 ? "а" : ""} 
          {usedCount > 0 && ` (${usedCount} использован${usedCount > 1 ? "о" : ""})`}
        </div>
        <button className="coupon-close" onClick={handleClose}>×</button>
      </div>
    </div>
  );
}
