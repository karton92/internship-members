import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./EditIntern.scss";

//COMPONENTS
import TextInput from "../TextInput/TextInput";
import InputDate from "../InputDate/InputDate";
import ButtonBack from "../ButtonBack/ButtonBack";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

//IMPORT FUNCTIONS
import { processFormTrim, checkFormValidation } from "../../helpers/validationFunctions";

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
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:3001/interns/${id}`,
        data: { ...data, id },
      });
      console.log("Intern edit successful");
    } catch (error) {
      console.error(error);
    }
  };

  const checkValidation = useCallback(() => {
    checkFormValidation(name, email, internshipStart, internshipEnd, setNameError, setEmailError, setStartDateError, setEndDateError);
  }, [email, internshipEnd, internshipStart, name]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    processFormTrim(setName, setEmail);
    checkValidation();
    updateIntern({ name, email, internshipStart, internshipEnd }, id);
  };

  useEffect(() => {
    checkValidation();
    setIsFormError(Boolean(nameError || emailError || startDateError || endDateError));
  }, [nameError, emailError, startDateError, endDateError, checkValidation]);

  return (
    <>
      <ButtonBack title="Back to list" />
      <section className="main-edit">
        <h2>Edit</h2>
        <form onSubmit={handleEditSubmit}>
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
          <ButtonSubmit title="Submit" />
        </form>
      </section>
    </>
  );
};

export default EditIntern;
