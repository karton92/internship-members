import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./EditIntern.scss";

//COMPONENTS
import TextInput from "./TextInput/TextInput";
import InputDate from "./InputDate/InputDate";
import ButtonBack from "./ButtonBack/ButtonBack";
import ButtonSubmit from "./ButtonSubmit/ButtonSubmit";

//IMPORT FUNCTIONS
import { isValidEmail, isWhiteSpacesBetween } from "../../helpers/validationFunctions";

const EditIntern = () => {
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

  useEffect(() => {
    const fetchIntern = async (id) => {
      const response = await axios({
        method: "get",
        url: `http://localhost:3001/interns/${id}`,
      });

      console.log(response?.data);
      const { name, email, internshipStart, internshipEnd } = response.data;
      setName(name);
      setEmail(email);
      setInternshipStart(internshipStart.slice(0, 10));
      setInternshipEnd(internshipEnd.slice(0, 10));
    };

    fetchIntern(id);
  }, [id]);

  const updateIntern = async (data, id) => {
    if (isFormError) return console.log("You have some error in form!");
    const response = await axios({
      method: "put",
      url: `http://localhost:3001/interns/${id}`,
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    processFormTrim();
    checkFormValidation();
    updateIntern({ name, email, internshipStart, internshipEnd }, id);
  };

  useEffect(() => {
    checkFormValidation();
    setIsFormError(Boolean(nameError || emailError || startDateError || endDateError));
  }, [nameError, emailError, startDateError, endDateError, checkFormValidation]);

  return (
    <>
      <ButtonBack title="Back to list" />
      <section className="main-edit">
        <h2>Edit</h2>
        <form onSubmit={handleEditSubmit}>
          <TextInput labelName={"Full name *"} isFocus={true} error={nameError} value={name} setValue={setName} />
          <TextInput labelName={"Email address *"} isFocus={false} error={emailError} value={email} setValue={setEmail} />
          <div className="date-container">
            <InputDate labelName={"Internship start *"} error={startDateError} value={internshipStart} setValue={setInternshipStart} />
            <InputDate labelName={"Internship end *"} error={endDateError} value={internshipEnd} setValue={setInternshipEnd} />
          </div>
          <ButtonSubmit title="Submit" />
        </form>
      </section>
    </>
  );
};

export default EditIntern;
