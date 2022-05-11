const EMAIL_REGEXP = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const WHITESPACES_REGEXP = new RegExp(/\s{2,}/);

export const isValidEmail = (email) => EMAIL_REGEXP.test(email);
export const isWhiteSpacesBetween = (text) => WHITESPACES_REGEXP.test(text);
