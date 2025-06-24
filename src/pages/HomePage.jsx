import React, { useState } from 'react';
import './HomePage.css';
import BottomNavBar from '../components/BottomNavBar';

const HomePage = () => {
  const userName = 'Татьяна';
  const [activeTab, setActiveTab] = useState('home');
  const [showQRPopup, setShowQRPopup] = useState(false);

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-top">
          <button className="logo-btn" onClick={() => alert('На главную')}>
            CaffeVAR
          </button>
        </div>
        <div className="greeting">Привет, {userName}! С возвращением</div>
        <div className="qr-section" onClick={() => setShowQRPopup(true)}>
          <div className="qr-placeholder"></div>
          <div>Отсканируй свой QR</div>
        </div>
      </div>

      <div className="main-content">
        <div className="about-title">О Нас</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt cras volutpat aliquam porttitor molestie...
        </div>
        <div className="image-placeholder"></div>
      </div>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />

      {showQRPopup && (
        <div className="popup-overlay" onClick={() => setShowQRPopup(false)}>
          <div className="popup-content">
            <div>Здесь появится всплывающее окно для QR</div>
            <button onClick={() => setShowQRPopup(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
