import React, { useState, useEffect } from "react";
import HeaderWelcome from "../components/HeaderWelcome";
import BottomNavBar from "../components/BottomNavBar";
import "./HomePage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });

      console.log("Response status:", res.status);

      // Если accessToken истёк
      if (res.status === 403) {
        const refreshRes = await fetch("http://localhost:3000/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("accessToken", data.accessToken);

          // Повторный запрос с обновлённым токеном
          return fetchUserName();
        } else {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return;
        }
      }

      if (res.ok) {
        const data = await res.json();
        console.log("User data:", data);
        setName(data.name || data.username || "Пользователь");
      } else {
        console.error("Ошибка при получении имени пользователя");
      }
    } catch (err) {
      console.error("Сетевая ошибка", err);
    }
  };
  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <div className="home-container">
      <HeaderWelcome username={name} />

      <div className="home-content">
        <h2 className="about-title">О нас</h2>
        <p>
          Добро пожаловать в CoffeeVAR — ваш уютный уголок кофе и хорошего
          вкуса. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
          ipsum vivamus velit lorem amet. Tincidunt cras volutpat aliquam
          porttitor molestie. Netus neque, habitasse id vulputate proin cras.
          Neque, vel duis sit vel pellentesque tempor. A commodo arcu tortor
          arcu, elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Id ipsum vivamus velit lorem amet. Tincidunt cras volutpat aliquam
          porttitor molestie. Netus neque, habitasse id vulputate proin cras.
          Neque, vel duis sit vel pellentesque tempor. A commodo arcu tortor
          arcu, elit
        </p>
        <img src="/coffee_img.png" alt="Coffee" className="about-image" />
      </div>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
