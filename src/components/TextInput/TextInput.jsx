import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import "./TextInput.scss";

function TextInput({ labelName, isFocus, id, type, value, setValue, error }) {
  return (
    <fieldset className="text-input">
      <label htmlFor={id}>{labelName}</label>
      <input
        className={error ? "error" : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        type={type}
        id={id}
        name={id}
        autoFocus={isFocus}
      />
      <RiErrorWarningLine className={`warning-icon ${error ? "" : "hide"}`} />
      <p className={error ? "" : "hide"}>{error}</p>
    </fieldset>
  );
}

export default TextInput;
