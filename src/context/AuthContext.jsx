import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setUserRole(decoded.role);
    }
    setIsAuthenticated(!!accessToken);
  }, []);

  const login = (accessToken) => {
    // localStorage.setItem("token", token);
    localStorage.setItem("accessToken", accessToken);
    setIsAuthenticated(true);
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setUserRole(decoded.role);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // ВАЖНО! чтобы куки отправлялись
      });

      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
