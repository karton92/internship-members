import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./AddIntern.scss";

// MATERIAL UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//COMPONENTS
import TextInput from "../EditIntern/TextInput/TextInput";
import InputDate from "../EditIntern/InputDate/InputDate";
import ButtonSubmit from "../EditIntern/ButtonSubmit/ButtonSubmit";

//IMPORT FUNCTIONS
import { isValidEmail, isWhiteSpacesBetween } from "../../helpers/validationFunctions";

const AddIntern = ({ title }) => {
  const { id } = useParams();

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
    const response = await axios({
      method: "post",
      url: `http://localhost:3001/interns/`,
      data: { ...data, id },
    }).catch((error) => {
      console.log("Error:", error.message);
    });
    console.log("Form send successful");
  };

  const processFormTrim = () => {
    setName((previousState) => previousState.trim());
    setEmail((previousState) => previousState.trim());
  };

  const checkFormValidation = useCallback(() => {
    //VALIDATION SECTION
    setNameError(!name ? "This field is required" : isWhiteSpacesBetween(name) ? "There is some white spaces" : "");
    setEmailError(!email ? "This field is required" : !isValidEmail(email) ? "Incorrect email address" : "");
    setStartDateError(
      !internshipStart
        ? "This data field is required"
        : new Date(internshipStart).getTime() > new Date(internshipEnd).getTime()
        ? "This date is not correct"
        : ""
    );
    setEndDateError(
      !internshipEnd
        ? "This data field is required"
        : new Date(internshipEnd).getTime() < new Date(internshipStart).getTime()
        ? "This date is not correct"
        : ""
    );
  }, [email, internshipEnd, internshipStart, name]);

  const handleAddIntern = (e) => {
    e.preventDefault();
    processFormTrim();
    checkFormValidation();
    addIntern({ name, email, internshipStart, internshipEnd }, id);
  };

  useEffect(() => {
    checkFormValidation();
    setIsFormError(Boolean(nameError || emailError || startDateError || endDateError));
  }, [nameError, emailError, startDateError, endDateError, checkFormValidation]);

  return (
    <Accordion className="add-intern">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddIntern}>
          <TextInput labelName={"Full name *"} isFocus={true} error={nameError} value={name} setValue={setName} />
          <TextInput labelName={"Email address *"} isFocus={false} error={emailError} value={email} setValue={setEmail} />
          <div className="date-container">
            <InputDate labelName={"Internship start *"} error={startDateError} value={internshipStart} setValue={setInternshipStart} />
            <InputDate labelName={"Internship end *"} error={endDateError} value={internshipEnd} setValue={setInternshipEnd} />
          </div>
          <ButtonSubmit title="Add new intern" />
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddIntern;
