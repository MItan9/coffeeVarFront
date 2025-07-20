import React, { useState, useEffect } from "react";
import HeaderWelcome from "../components/HeaderWelcome";
import BottomNavBar from "../components/BottomNavBar";
import QrPopup from "../components/QrPopup";
import { authFetch } from "../context/authFetch";
import { FaMapMarkerAlt, FaInstagramSquare } from "react-icons/fa";

import "./HomePage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserName = async () => {
    try {
      const res = await authFetch("http://localhost:3000/user/profile", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User data:", data);
        setName(data.name || data.username || "Пользователь");
      } else {
        console.error("Ошибка при получении имени пользователя:", res.status);
      }
    } catch (err) {
      console.error("Сетевая ошибка:", err);
    }
  };
  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchQRCode = async () => {
    try {
      setLoading(true);
      setError("");
      setQrCode(null);
      setCode(null);

      const res = await authFetch("http://localhost:3000/user/qrcode");

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Ошибка при получении QR-кода");
        return;
      }

      const data = await res.json();
      setQrCode(data.qr);
      setCode(data.code);
    } catch (err) {
      console.error("Ошибка сети при получении QR-кода:", err);
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <HeaderWelcome
        username={name}
        onQrClick={() => {
          setShowPopup(true);
          fetchQRCode();
        }}
      />

      <div className="home-content">
        <h2 className="about-title">О нас</h2>
        <p>
  В самом сердце Комрата, на улице Пушкина, 40А, прячется наше уютное место — CoffeeVAR. 
  Для нас кофе — это не просто напиток, а настоящий ритуал. Мы стараемся, чтобы каждый 
  гость чувствовал себя как дома: тёплый свет, аромат свежеобжаренных зёрен и спокойная атмосфера 
  создают идеальный фон для утреннего начала или неспешного вечера.
</p>
<p>
  Мы действительно варим вкусный кофе — с душой. От классических эспрессо и капучино до авторских напитков — 
  каждую чашку готовим с вниманием к деталям и заботой о настроении. Здесь можно укрыться от городской суеты, 
  поработать за ноутбуком или просто пообщаться с бариста, который наверняка помнит ваш любимый напиток.
  CoffeeVAR — это место, куда возвращаются.
</p>

        
      </div>
<div className="recommendations-section">
  <h2 className="recommend-title">CoffeeVAR рекомендует</h2>

  <div className="menu-cards">
    <div className="menu-item">
      <img src="/coffee cup.jpg" alt="Латте с круасаном" className="menu-img" />
      <div className="menu-info">
        <h3 className="menu-name">Латте & Круассан</h3>
        <p className="menu-desc">Классическое утро: нежный кофе и свежая французская выпечка.</p>
      </div>
    </div>

    <div className="menu-item">
      <img src="/bubble tea.jpg" alt="Бабл Ти" className="menu-img" />
      <div className="menu-info">
        <h3 className="menu-name">Новинка: Bubble Tea</h3>
        <p className="menu-desc">Освежающий чай с тапиокой — модный акцент в твоём дне.</p>
      </div>
    </div>

    <div className="menu-item">
      <img src="/pizza.jpg" alt="Выпечка" className="menu-img" />
      <div className="menu-info">
        <h3 className="menu-name">Свежая выпечка</h3>
        <p className="menu-desc">Чиабатта, мини-пицца и хот-доги — вкусно, сытно и уютно.</p>
      </div>
    </div>
  </div>
</div>

<div className="location-section">
  <h2 className="location-title">Где нас найти</h2>

  <img src="/location.JPG" alt="Location" className="about-image" />
<p className="map-title">Карта</p>

  <div className="map-embed">
    <iframe
      title="CoffeeVAR Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d272.2020361312811!2d28.6525695!3d46.3013621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b621e5be179d07%3A0x924fbfa2eb1c7ac9!2sCoffeeVAR%20Comrat!5e0!3m2!1sru!2smd!4v1711457451527!5m2!1sru!2smd"
      width="100%"
      height="200"
      style={{ border: "0", borderRadius: "8px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>


      <div className="footer-links">
  <a
    href="https://www.google.com/maps/place/CoffeeVAR+%D0%9A%D0%BE%D0%BC%D1%80%D0%B0%D1%82/@46.3013621,28.6525695,20z/data=!4m6!3m5!1s0x40b621e5be179d07:0x924fbfa2eb1c7ac9!8m2!3d46.3013903!4d28.6526882!16s%2Fg%2F11vwwp_fwz?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-item"
  >
    <FaMapMarkerAlt className="footer-icon" />
    <span>Strada Pușkin 40А, Comrat, Молдова</span>
  </a>

  <a
    href="https://www.instagram.com/best_coffee_var/"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-item"
  >
    <FaInstagramSquare className="footer-icon instagram-rounded"  />
    <span>CoffeeVAR</span>
  </a>
</div>




      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        couponCount={3}
      />

      <QrPopup
        show={showPopup}
        qrCode={qrCode}
        code={code}
        loading={loading}
        error={error}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
