import React from "react";
import { NavLink } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import "./Intern.scss";

function Intern({ id, name }) {
  return (
    <li>
      {name}
      <button>
        <div>
          <FiEdit3 />
        </div>
        <NavLink to={`/interns/${id}`}>Edit</NavLink>
      </button>
    </li>
  );
}

export default Intern;
