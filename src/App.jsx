import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage";
import GoogleSuccess from "./components/GoogleSuccess";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CupsPage from "./pages/CupsPage";
import CouponsPage from "./pages/CouponsPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPassword from "./pages/ResetPassword";
import BaristaPage from "./pages/BaristaPage";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            (isAuthenticated && userRole === "user" ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthPage />
            ),
            isAuthenticated && userRole === "barista" ? (
              <Navigate to="/barista" replace />
            ) : (
              <AuthPage />
            ))
          }
        />

        <Route
          path="/barista"
          element={
            isAuthenticated ? <BaristaPage /> : <Navigate to="/" replace />
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            path="home"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="cups"
            element={
              isAuthenticated ? <CupsPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="coupons"
            element={
              isAuthenticated ? <CouponsPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="profile"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/" replace />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
