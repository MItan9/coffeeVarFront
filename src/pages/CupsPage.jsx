import React from 'react';
import Header from '../components/Header';
import './CupsPage.css';

export default function CupsPage() {
  return (
    <div className="page-container">
      <Header title="Чашки" />

      <div className="page-content">
        <p>Здесь будет информация о полученных и доступных чашках.</p>
      </div>
    </div>
  );
}
