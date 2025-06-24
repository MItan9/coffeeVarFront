import { useState } from "react";
import "./InputField.css"; // Импорт стилей для компонента

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : "text";

  const EyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 14 14"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <path d="M7 3.625c-4.187 0-5.945 3.766-5.945 3.844S2.813 11.312 7 11.312s5.945-3.765 5.945-3.843S11.187 3.625 7 3.625M2.169 5.813L.61 4.252m4.525-.354L4.5 1.843m7.331 3.97l1.559-1.56m-4.525-.355L9.5 1.843" />
        <path d="M5.306 7.081a1.738 1.738 0 1 0 3.388.776a1.738 1.738 0 1 0-3.388-.776" />
      </g>
    </svg>
  );

  const EyeClosedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 9q-3.6 4-9 4T3 9m0 6l2.5-3.8M21 14.976L18.508 11.2M9 17l.5-4m5.5 4l-.5-4"
      />
    </svg>
  );

  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <div className="input-with-icon">
        <input
          className={`input-field ${error ? "input-error" : ""}`}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          required
        />

        {isPassword && (
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? EyeIcon : EyeClosedIcon}
          </span>
        )}
      </div>
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
}
