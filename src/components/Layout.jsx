import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname.slice(1) || 'home';

  return (
    <div className="home-container">
      <Outlet /> {/* Здесь будут показываться дочерние страницы */}
      <BottomNavBar activeTab={path} onTabChange={() => {}} />
    </div>
  );
}
