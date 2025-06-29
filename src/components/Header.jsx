import React from 'react';
import './Header.css';

export default function Header({ title = 'Заголовок' }) {
  return (
    <div className="header">
      <img src="/logo.png" alt="Логотип CoffeeVAR" className="header-logo" />
      <h1 className="header-title">{title}</h1>
    </div>
  );
}
