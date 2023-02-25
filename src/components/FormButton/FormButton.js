import './FormButton.css';

function FormButton(props) {
  const { componentName, buttonText } = props;

  return(
    <button className={`form__button form__button_type_${componentName} form__button_disabled`} type="submit">{buttonText}</button>
  );
}

export default FormButton;