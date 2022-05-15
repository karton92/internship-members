import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./AddIntern.scss";
import { v4 as uuidv4 } from "uuid";

// MATERIAL UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//COMPONENTS
import TextInput from "../TextInput/TextInput";
import InputDate from "../InputDate/InputDate";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

//IMPORT FUNCTIONS
import { processFormTrim, checkFormValidation } from "../../helpers/validationFunctions";

const AddIntern = ({ title, fetchInterns }) => {
  //INPUT VALUE HOOKS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [internshipStart, setInternshipStart] = useState("");
  const [internshipEnd, setInternshipEnd] = useState("");

  //ERROR VALIDATION HOOKS
  const [isFormError, setIsFormError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const addIntern = async (data, id) => {
    if (isFormError) return console.log("You have some error in form!");

    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:3001/interns/`,
        data: { ...data, id },
      });
      console.log("New intern add successful");
    } catch (error) {
      console.error(error);
    }
    setName("");
    setEmail("");
    setInternshipStart("");
    setInternshipEnd("");
    fetchInterns();
  };

  const checkValidation = useCallback(() => {
    checkFormValidation(name, email, internshipStart, internshipEnd, setNameError, setEmailError, setStartDateError, setEndDateError);
  }, [email, internshipEnd, internshipStart, name]);

  const handleAddIntern = (e) => {
    e.preventDefault();
    processFormTrim(setName, setEmail);
    checkValidation();
    addIntern({ name, email, internshipStart, internshipEnd }, uuidv4());
  };

  useEffect(() => {
    checkValidation();
    setIsFormError(Boolean(nameError || emailError || startDateError || endDateError));
  }, [nameError, emailError, startDateError, endDateError, checkValidation]);

  return (
    <Accordion className="add-intern">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddIntern}>
          <TextInput labelName={"Full name *"} type={"text"} id={"name"} isFocus={true} error={nameError} value={name} setValue={setName} />
          <TextInput labelName={"Email address *"} type={"email"} id={"email"} isFocus={false} error={emailError} value={email} setValue={setEmail} />
          <div className="date-container">
            <InputDate
              labelName={"Internship start *"}
              type={"date"}
              id={"internStart"}
              error={startDateError}
              value={internshipStart}
              setValue={setInternshipStart}
            />
            <InputDate
              labelName={"Internship end *"}
              type={"date"}
              id={"internEnd"}
              error={endDateError}
              value={internshipEnd}
              setValue={setInternshipEnd}
            />
          </div>
          <ButtonSubmit title="Add new intern" />
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddIntern;
