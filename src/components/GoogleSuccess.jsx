import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return <p>Вход через Google... Подождите</p>;
}
