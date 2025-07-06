import React from 'react';
import Header from '../components/Header';
import './CouponsPage.css';

const coupons = [
  { id: 1, name: 'Бесплатный кофе', expiresIn: '31 дней' },
  { id: 2, name: 'Бесплатный кофе', expiresIn: '29 дней' },
  { id: 3, name: 'Бесплатный кофе', expiresIn: '27 дней' },
];

export default function CouponsPage() {
  return (
    <div className="page-container">
      <Header title="Купоны" />

      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-image" />
            <div className="coupon-info">
              <span className="coupon-title">{coupon.name}</span>
              <span className="coupon-expire">Срок действия: {coupon.expiresIn}</span>
              <button className="coupon-button">ИСПОЛЬЗОВАТЬ</button>
            </div>
          </div>
        ))}
      </div>

      <p className="coupon-note">
        Максимальное количество купонов: 3<br />
        Срок действия каждого купона — 1 месяц
      </p>
    </div>
  );
}
