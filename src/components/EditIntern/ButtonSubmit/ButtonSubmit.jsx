import React from "react";
import "./ButtonSubmit.scss";

function ButtonSubmit({ title }) {
  return (
    <button className="submit" type="submit">
      {title}
    </button>
  );
}

export default ButtonSubmit;
