import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return <p>Вход через Google... Подождите</p>;
}
