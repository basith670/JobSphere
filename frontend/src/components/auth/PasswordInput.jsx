import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function PasswordInput({
  value,
  onChange,
  placeholder,
  name,
}) {
  const [show, setShow] =
    useState(false);

  return (
    <div className="password-wrapper">

      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      <button
        type="button"
        className="password-toggle"
        onClick={() =>
          setShow(!show)
        }
      >
        {show ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </button>

    </div>
  );
}