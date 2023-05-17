import './FormButton.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function FormButton(props) {
  const { componentName, buttonText, isFormValid, hasError, errorMessage } = props;

  return(
    <div className="form-button__container">
      {hasError && <ErrorMessage errorMessage={errorMessage} />}
      <button
        className={`form__button form__button_type_${componentName} ${!isFormValid ? 'form__button_disabled' : null}`}
        type="submit"
      >{buttonText}</button>
    </div>
  );
}

export default FormButton;