import React, { useState } from "react";
import "./BaristaPage.css";
import Header from "../components/Header";
import { authFetch } from "../context/authFetch";
import { toast } from "react-toastify";

export default function BaristaPage() {
  const [code, setCode] = useState("");
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const [cupsDelta, setCupsDelta] = useState(0);
  const [couponsDelta, setCouponsDelta] = useState(0);
  const [selectedCups, setSelectedCups] = useState(null);
  const [selectedCoupons, setSelectedCoupons] = useState(null);

  const IconArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="60"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995z"
      />
    </svg>
  );

  const handleSearch = async () => {
    if (!code.trim()) return;

    try {
      const response = await authFetch(`http://localhost:3000/find-client`, {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      if (!response.ok) throw new Error("Не найден");
      const data = await response.json();
      setClient(data.client);
      setError(null);
      setCupsDelta(0);
      setCouponsDelta(0);
    } catch (error) {
      console.error("Ошибка при поиске кода:", error.message);
      setClient(null);
      setError("Клиент не найден");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const updateCups = (n) => {
    const newValue = client.cups_number + n;

    if (newValue < 0) {
      toast.error("Нельзя уменьшить чашки ниже 0");
    } else {
      setCupsDelta(n);
      setSelectedCups(n);
    }
  };

  const updateCoupons = (n) => {
    const newValue = client.coupons_number + n;
    // console.log("New coupons value:", newValue);
    if (newValue < 0) {
      toast.error("Нельзя уменьшить купоны ниже 0");
    } else if (newValue > 3) {
      toast.error("Максимум 3 купона");
    } else {
      setCouponsDelta(n);
      console.log("Selected coupons:", n);
      setSelectedCoupons(n);
    }
  };

  const handleSubmitChanges = async () => {
    if (cupsDelta === 0 && couponsDelta === 0) {
      toast.info("Нет изменений для отправки");
      setClient(null);
      setCupsDelta(0);
      setCouponsDelta(0);
      setSelectedCups(null);
      setSelectedCoupons(null);
      setError(null);
      setCode("");
      return;
    }

    try {
      const res = await authFetch(
        `http://localhost:3000/barista/apply-changes`,
        {
          method: "POST",
          body: JSON.stringify({
            code,
            cupsDelta,
            couponsDelta,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setClient(data.client);
        setCupsDelta(0);
        setCouponsDelta(0);
        setSelectedCups(null);
        setSelectedCoupons(null);
        setError(null);
        setCode("");
        toast.success("Изменения сохранены");
      } else {
        const data = await res.json();
        toast.error(data.error || "Ошибка при обновлении");
      }
    } catch (err) {
      console.error(err);
      toast.error("Серверная ошибка");
    }
  };

  const handleBack = () => {
    setClient(null);
    setCode("");
    setError(null);
    setCupsDelta(0);
    setCouponsDelta(0);
    setSelectedCups(null);
    setSelectedCoupons(null);
  };

  return (
    <div>
      <Header title="CoffeeVar" />
      <div className="barista-container">
        {client ? (
          <div className="barista-layout">
            <h2>{code}</h2>
            <table className="barista-table">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Чашки</th>
                  <th>Купоны</th>
                  <th>Добавить/Убрать чашку</th>
                  <th>Добавить/Убрать купон</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{client.name}</td>
                  <td>{client.surname}</td>
                  <td>{client.cups_number}</td>
                  <td>{client.coupons_number}</td>

                  <td className="action-cell">
                    <div className="circle-buttons">
                      {[1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          className={`circle-btn add ${selectedCups === n ? "selected" : ""}`}
                          onClick={() => updateCups(n)}
                        >
                          +{n}
                        </button>
                      ))}
                      <button
                        key={0}
                        className={`circle-btn subtract ${selectedCups === 0 ? "selected" : ""}`}
                        onClick={() => updateCups(0)}
                      >
                        {0}
                      </button>

                      <button
                        key={-1}
                        className={`circle-btn subtract ${selectedCups === -1 ? "selected" : ""}`}
                        onClick={() => updateCups(-1)}
                      >
                        -{1}
                      </button>
                    </div>
                  </td>

                  <td className="action-cell">
                    <div className="circle-buttons">
                      {[1, 2, 3].map((n) => (
                        <button
                          key={-n}
                          className={`circle-btn subtract ${selectedCoupons === -n ? "selected" : ""}`}
                          onClick={() => updateCoupons(-n)}
                        >
                          -{n}
                        </button>
                      ))}
                      <button
                        key={0}
                        className={`circle-btn add ${selectedCoupons === 0 ? "selected" : ""}`}
                        onClick={() => updateCoupons(0)}
                      >
                        {0}
                      </button>
                      <button
                        key={1}
                        className={`circle-btn add ${selectedCoupons === 1 ? "selected" : ""}`}
                        onClick={() => updateCoupons(1)}
                      >
                        +{1}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="barista-navigation">
              <button className="btn-backward" onClick={handleBack}>
                {IconArrow}
              </button>
              <button className="btn-forward" onClick={handleSubmitChanges}>
                {IconArrow}
              </button>
            </div>
          </div>
        ) : (
          <div className="barista-container">
            <div className="barista-instruction">
              <input
                type="text"
                className="barista-input"
                placeholder="Введите код клиента"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="barista-search-btn" onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="rgba(129, 129, 129, 1)"
                    d="M456.69 421.39L362.6 327.3a173.8 173.8 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.8 173.8 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8"
                  />
                </svg>
              </button>
            </div>

            <img
              src="/logo.png"
              alt="CoffeeVAR logo"
              className="barista-logo"
            />
          </div>
        )}
        {error && <p className="barista-error">{error}</p>}
      </div>
    </div>
  );
}
