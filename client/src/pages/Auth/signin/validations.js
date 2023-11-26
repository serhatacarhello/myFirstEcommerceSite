import * as yup from "yup";

const REQUIRED_EMAIL = "Email is required";
const INVALID_EMAIL = "Please enter a valid email";

const PASS_REQUIRED = "Password is required";
const PASS_LENGTH = "Password must be at least 8 characters";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(INVALID_EMAIL)
    .required(REQUIRED_EMAIL)
    .matches(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, INVALID_EMAIL),

  password: yup
    .string()
    .required(PASS_REQUIRED)
    .min(8, PASS_LENGTH)
    .test(
      "isValidPass",
      "Passowrd must be 8 char (One UpperCase & One Symbol)",
      (value, context) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasSymbole = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 3;
        const conditions = [hasUpperCase, hasLowerCase, hasNumber, hasSymbole];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
});

export default validationSchema;
