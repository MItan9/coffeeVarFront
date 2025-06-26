import React from 'react';
import Header from '../components/Header';
import './ProfilePage.css';

export default function ProfilePage() {
  return (
    <div className="page-container">
      <Header title="Профиль" />
      <h2>👤 Профиль</h2>
      <p>Информация о пользователе, настройках и истории заказов.</p>
    </div>
  );
}
