import React, { useState, useEffect } from "react";
import HeaderWelcome from "../components/HeaderWelcome";
import BottomNavBar from "../components/BottomNavBar";
import "./HomePage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState("");

  const getUserName = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const payload = JSON.parse(atob(accessToken?.split(".")[1]));
    const userName = payload.username;
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
