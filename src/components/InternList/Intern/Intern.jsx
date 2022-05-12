import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Intern.scss";

const Intern = ({ id, name, fetchInterns }) => {
  const deleteIntern = async () => {
    const response = await axios.delete(`http://localhost:3001/interns/${id}`);
    await fetchInterns();
  };

  return (
    <li>
      {name}
      <button>
        <div>
          <DeleteOutlineIcon onClick={deleteIntern} />
        </div>
        <div>
          <FiEdit3 />
        </div>
        <NavLink to={`/interns/${id}`}>Edit</NavLink>
      </button>
    </li>
  );
};

export default Intern;
