import React from "react";
import "./CouponPopup.css";

export default function CouponPopup({ onClose }) {
  return (
    <div className="coupon-popup" onClick={onClose}>
      <div className="coupon-content" onClick={(e) => e.stopPropagation()}>
        <button className="coupon-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
