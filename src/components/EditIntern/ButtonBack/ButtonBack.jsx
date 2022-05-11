import React from "react";
import { NavLink } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./ButtonBack.scss";

function ButtonBack({ title }) {
  return (
    <button className="back-container">
      <div className="icon">
        <IoArrowBack />
      </div>
      <NavLink className="back-navlink" to="/">
        {title}
      </NavLink>
    </button>
  );
}

export default ButtonBack;
