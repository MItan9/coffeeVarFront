import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CupsPage from './pages/CupsPage';
import CouponsPage from './pages/CouponsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cups" element={<CupsPage />} />
          <Route path="coupons" element={<CouponsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
