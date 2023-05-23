import { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import { emailRegExp } from "../utils/regExp";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValueValid, setIsValueValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  function emailFieldValidation(name, value, nextSibling) {
    if(name === 'email') {
      if(!value.toLowerCase().match(emailRegExp)) {
        setIsValueValid(false);
        setErrors({
          ...errors,
          [name]: 'Некорректный адрес электронной почты'});
          nextSibling.textContent = 'Некорректный адрес электронной почты';
      } else {
        setIsValueValid(true);
        setErrors({
          ...errors,
          [name]: '',
        });
      };
    };
  }

  function checkValidity(name, validity, validationMessage, nextSibling) {
    if (!validity.valid) {
      setIsValueValid(false);
      setErrors({
        ...errors,
        [name]: validationMessage,
      })

      nextSibling.textContent = validationMessage;
    } else {
      setIsValueValid(true);
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  };

  function handleChange(event) {
    const { name, value, validity, validationMessage, nextSibling } = event.target;
    const form = event.target.closest('.form');

    setValues({
      ...values,
      [name]: value,
    });

    checkValidity(name, validity, validationMessage, nextSibling);

    emailFieldValidation(name, value, nextSibling);

    if(location.pathname === '/profile' && value === currentUser[name]) {
      setIsFormValid(false);
      return;
    }
    
    setIsFormValid(form.checkValidity());
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    isValueValid,
    setIsValueValid,
    isFormValid,
    setIsFormValid,
    handleChange,
  }
}

export default useValidation;