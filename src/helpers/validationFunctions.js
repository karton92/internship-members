const EMAIL_REGEXP = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const WHITESPACES_REGEXP = new RegExp(/\s{2,}/);

export const isValidEmail = (email) => EMAIL_REGEXP.test(email);
export const isWhiteSpacesBetween = (text) => WHITESPACES_REGEXP.test(text);

export const processFormTrim = (setName, setEmail) => {
  setName((previousState) => previousState.trim());
  setEmail((previousState) => previousState.trim());
};

export const checkFormValidation = (name, email, internshipStart, internshipEnd, setNameError, setEmailError, setStartDateError, setEndDateError) => {
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
};
