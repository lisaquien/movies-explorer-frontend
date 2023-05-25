import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';

function Register(props) {
  const {
    hasError,
    setHasError,
    errorMessage,
    setErrorMessage,
    requestExecuting,
    handleRegFormSubmit,
    values,
    errors,
    isFormValid,
    handleChange,
  } = props;

  useEffect(() => {
    setHasError(false);
    setErrorMessage('');
  }, [])

  return(
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <Logo />
          <p className="register__welcoming-line">Добро пожаловать!</p>
        </div>
        <form className="form form_register" noValidate onSubmit={handleRegFormSubmit}>
          <FormInput
            componentName="register"
            labelText="Имя"
            name="name"
            type="text"
            id="reg-name"
            minLength="2"
            maxLength="30"
            required="required"
            value={ values.name || ''}
            error={ errors.name || '' }
            onChange={handleChange}
          />
          <FormInput
            componentName="register"
            labelText="E-mail"
            name="email"
            type="email"
            id="reg-email"
            required="required"
            value={ values.email || ''}
            error={ errors.email || '' }
            onChange={handleChange}
          />
          <FormInput
            componentName="register"
            labelText="Пароль"
            name="password"
            type="password"
            id="reg-password"
            required="required"
            value={ values.password || ''}
            error={ errors.password || '' }
            onChange={handleChange}
            />
          <FormButton
            componentName="register"
            buttonText={requestExecuting ? "Регистрация..." : "Зарегистрироваться"}
            isFormValid={isFormValid}
            hasError={hasError}
            errorMessage={errorMessage}
            requestExecuting={requestExecuting}
          />            
        </form>
        <p className="register__caption">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;