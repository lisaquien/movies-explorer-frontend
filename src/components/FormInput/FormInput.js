import React from 'react';
import './FormInput.css';

function Input(props) {
  const {
    componentName,
    labelText,
    name,
    type,
    id,
    placeholder,
    minLength,
    maxLength,
    required,
    disabled,
    autoFocus,
    onChange,
    value,
    error,
    pattern,
  } = props;

  return(
    <>
      <label htmlFor={id} className={`form__label form__label_type_${componentName}`}>{labelText}
        <input className={`form__input form__input_type_${componentName} ${error ? 'form__input_type_error' : null}`}
          name={name}
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          autoFocus={autoFocus}
          pattern={pattern}
        />
        <span className={`${id}-error form__input-error ${error ? 'form__input-error_active' : null}`}></span>
      </label>
    </>
  );
}

export default Input;