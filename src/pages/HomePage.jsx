import React, { useState, useEffect } from "react";
import HeaderWelcome from "../components/HeaderWelcome";
import BottomNavBar from "../components/BottomNavBar";
import QrPopup from "../components/QrPopup";

import "./HomePage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserName = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      setName(payload.username || "Гость");
    } catch {
      setName("Гость");
    }
  };

  const fetchQRCode = async () => {
    try {
      setLoading(true);
      setError("");
      setQrCode(null);
      setCode(null);

      const res = await fetch("http://localhost:3000/user/qrcode", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });

      if (res.status === 403) {
        const refreshRes = await fetch("http://localhost:3000/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("accessToken", data.accessToken);
          return await fetchQRCode();
        } else {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return;
        }
      }

      const data = await res.json();
      if (res.ok) {
        setQrCode(data.qr);
        setCode(data.code);
      } else {
        setError(data.error || "Ошибка при получении QR-кода");
      }
    } catch {
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

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
          В самом сердце города, на улице Пушкина, 40А, прячется уютное место, где кофе — это не просто напиток, а ритуал. CoffeeVAR — это пространство, где каждый гость чувствует себя как дома: мягкий свет, аромат свежеобжаренных зёрен и доброжелательная атмосфера создают идеальные условия для утреннего старта или неспешного вечера.
        </p>
        <p>
          Мы варим самый вкусный кофе — и делаем это с душой. От классического эспрессо до авторских напитков — каждую чашку мы готовим с вниманием к деталям и заботой о вашем настроении. Здесь можно укрыться от суеты, поработать за ноутбуком или просто поболтать с бариста, который уже знает ваш любимый заказ.
        </p>
        <p>
          Загляните к нам с понедельника по пятницу с 08:00 до 21:00, а в выходные — с 09:00. CoffeeVAR — это не просто кофейня, это место, куда хочется возвращаться.
        </p>
        <img src="/coffee_img.png" alt="Coffee" className="about-image" />
      </div>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />

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
