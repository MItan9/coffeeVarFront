import React from 'react';
import Header from '../components/Header';
import './CouponsPage.css';

export default function CouponsPage() {
  return (
    <div className="page-container">
      <Header title="Купоны" />
      <h2>🎁 Купоны</h2>
      <p>Здесь отображаются твои доступные и использованные купоны.</p>
    </div>
  );
}
