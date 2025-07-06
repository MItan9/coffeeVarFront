import React, { useState, useEffect } from "react";
import HeaderWelcome from "../components/HeaderWelcome";
import BottomNavBar from "../components/BottomNavBar";
import QrPopup from "../components/QrPopup";
import { authFetch } from "../context/authFetch";

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
          В самом сердце города, на улице Пушкина, 40А, прячется уютное место,
          где кофе — это не просто напиток, а ритуал. CoffeeVAR — это
          пространство, где каждый гость чувствует себя как дома: мягкий свет,
          аромат свежеобжаренных зёрен и доброжелательная атмосфера создают
          идеальные условия для утреннего старта или неспешного вечера.
        </p>
        <p>
          Мы варим самый вкусный кофе — и делаем это с душой. От классического
          эспрессо до авторских напитков — каждую чашку мы готовим с вниманием к
          деталям и заботой о вашем настроении. Здесь можно укрыться от суеты,
          поработать за ноутбуком или просто поболтать с бариста, который уже
          знает ваш любимый заказ.
        </p>
        <p>
          Загляните к нам с понедельника по пятницу с 08:00 до 21:00, а в
          выходные — с 09:00. CoffeeVAR — это не просто кофейня, это место, куда
          хочется возвращаться.
        </p>
        <img src="/coffee_img.png" alt="Coffee" className="about-image" />
      </div>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} couponCount={3} />


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
