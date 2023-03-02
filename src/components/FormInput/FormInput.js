import './FormInput.css';

function Input(props) {
  const {
    componentName,
    labelText,
    name,
    type,
    id,
    placeholder,
    onChange,
    value,
    minLength,
    maxLength,
    required,
    disabled,
  } = props;

  return(
    <>
      <label htmlFor={id} className={`form__label form__label_type_${componentName}`}>{labelText}</label>
      <input className={`form__input form__input_type_${componentName}`}
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
      />
      <span className={`${id}-error form__input-error`}></span>
    </>
  );
}

export default Input;