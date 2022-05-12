import React, { useEffect, useState, useCallback } from "react";
import "./InternList.scss";

// COMPONENTS
import Intern from "./Intern/Intern";
import AddIntern from "../AddIntern/AddIntern";

const InternList = () => {
  const [interns, setInterns] = useState([]);

  const fetchInterns = useCallback(async () => {
    const response = await fetch("http://localhost:3001/interns/");
    const interns = await response.json();
    setInterns(interns);
  }, []);

  useEffect(() => {
    fetchInterns();
  }, [fetchInterns]);

  return (
    <section>
      <AddIntern title={"Add new Intern"} fetchInterns={fetchInterns} />
      <h1>Internship List</h1>
      <ul>
        {interns.map(({ name, id }) => (
          <Intern key={name} id={id} name={name} fetchInterns={fetchInterns} />
        ))}
      </ul>
    </section>
  );
};

export default InternList;
