import { useContext, useState, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import { emailRegExp } from "../utils/regExp";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValueValid, setIsValueValid] = useState(false);
  const [validityValues, setValidityValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  function emailFieldValidation(name, value, nextSibling) {
    if(name === 'email') {
      if(!value.toLowerCase().match(emailRegExp)) {
        setIsValueValid(false);
        setErrors({
          ...errors,
          email: 'Некорректный адрес электронной почты'});
        nextSibling.textContent = 'Некорректный адрес электронной почты';
        setValidityValues({
          ...validityValues,
          email: false,
        })
      } else {
        setIsValueValid(true);
        setErrors({
          ...errors,
          email: '',
        });
        setValidityValues({
          ...validityValues,
          email: true,
        })
      };
    };
  }

  function checkInputValueValidity(name, validity, validationMessage, nextSibling) {
    setValidityValues({
      ...validityValues,
      [name]: validity.valid,
    })

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

    checkInputValueValidity(name, validity, validationMessage, nextSibling);

    emailFieldValidation(name, value, nextSibling);

    if(location.pathname === '/profile' && value === currentUser[name]) {
      setIsFormValid(false);
      return;
    };

    isValueValid ? setIsFormValid(form.checkValidity()) : setIsFormValid(false);
  }

  function resetForm(newValues = {}, newErrors = {}, newIsValid = false) {
      setValues(newValues);
      setErrors(newErrors);
      setIsValueValid(newIsValid);
  };

  useEffect(() => {
    !isValueValid ? setIsFormValid(false) : setIsFormValid(document.querySelector('.form').checkValidity());
  }, [isValueValid]);

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
    resetForm,
  }
}

export default useValidation;