import React, { useState, useEffect } from "react";
import HeaderWelcome from "../components/HeaderWelcome";
import BottomNavBar from "../components/BottomNavBar";
import "./HomePage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState("");

  const getUserName = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Полученный accessToken:", accessToken);
    const payload = JSON.parse(atob(accessToken?.split(".")[1]));
    const userName = payload.username;
    console.log("Полученное имя пользователя:", userName);
    setName(userName);
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="home-container">
      <HeaderWelcome username={name} />

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
    </div>
  );
}
