import { useState } from "react";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValueValid, setIsValueValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(event) {
    const { name, value, validity, validationMessage, nextSibling } = event.target;
    const form = event.target.closest('.form');
    setValues({
        ...values,
        [name]: value,
    })

    checkValidity(name, validity, validationMessage, nextSibling);
    
    setIsFormValid(form.checkValidity());
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
        [name]: ''
      })
    }
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