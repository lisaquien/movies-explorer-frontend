import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';

function Login(props) {
  const {
    hasError,
    setHasError,
    errorMessage,
    setErrorMessage,
    requestExecuting,
    handleLoginFormSubmit,
    values,
    errors,
    isFormValid,
    handleChange,
    resetForm,
  } = props;

  useEffect(() => {
    setHasError(false);
    setErrorMessage('');
    
    return() => {
      resetForm();
    }
  }, []);

  return(
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <Logo />
          <p className="login__welcoming-line">Рады видеть!</p>
        </div>
        <form className="form form_login" noValidate onSubmit={handleLoginFormSubmit}>
          <FormInput
            componentName="login"
            labelText="E-mail"
            name="email"
            type="email"
            id="log-email"
            onChange={handleChange}
            value={values.email || ""}
            error={errors.email || ""}
            required="required"
          />
          <FormInput
            componentName="login"
            labelText="Пароль"
            name="password"
            type="password"
            id="log-password"
            onChange={handleChange}
            value={values.password || ""}
            error={errors.password || ""}
            required="required"
            />
          <FormButton
            componentName="login"
            buttonText={requestExecuting ? "Вход..." : "Войти"}
            isFormValid={isFormValid}
            hasError={hasError}
            errorMessage={errorMessage}
            requestExecuting={requestExecuting}
          />          
        </form>
        <p className="login__caption">Еще не зарегистрированы? <Link to="/sign-up" className="login__link">Регистрация</Link></p>
      </div>
    </div>
  );
}

export default Login;