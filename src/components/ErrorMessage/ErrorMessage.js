import './ErrorMessage.css';

function ErrorMessage({ errorMessage }) {
  return(
    <span className="error-message__text">{errorMessage}</span>
  );
}

export default ErrorMessage;