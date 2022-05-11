import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import "./InputDate.scss";

function InputDate({ labelName, error, value, setValue }) {
  return (
    <>
      <fieldset className="date-input">
        <label>{labelName}</label>
        <input className={error ? "error" : ""} type="date" name="intership-start" value={value} onChange={(e) => setValue(e.target.value)} />
        <RiErrorWarningLine className={`warning-icon ${error ? "" : "hide"}`} />
        <p className={error ? "" : "hide"}>{error}</p>
      </fieldset>
    </>
  );
}

export default InputDate;
