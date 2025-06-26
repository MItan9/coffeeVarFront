import React from 'react';
import './Header.css';

export default function Header({ title = 'Заголовок' }) {
  return (
    <div className="header">
      <div className="header-left">
        <img src="/logo.png" alt="Логотип CoffeeVAR" className="header-logo" />
      </div>
      <h1 className="header-title">{title}</h1>
    </div>
  );
}
