import React from "react";
import "./styles.css";

function InputComponent({
  type,
  state,
  setState,
  placeholder,
  required,
  style,
}) {
  return (
    <input
      style={style}
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="custom-input"
    />
  );
}

export default InputComponent;
