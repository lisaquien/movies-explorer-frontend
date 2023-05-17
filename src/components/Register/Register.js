import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { mainApi } from '../../utils/MainApi';
import useValidation from '../../hooks/useValidation';

function Register() {

  const [hasError, setHasError] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState('');

  const navigate = useNavigate();

  const { values, errors, isFormValid, handleChange } = useValidation();

  function handleRegFormSubmit(event) {
    event.preventDefault();

    const { name, email, password } = values;
    mainApi.register({ name, email, password })
      .then((res) => {
        console.log(res);
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setHasError(true);
        if(Number(err) === 409) {
          setHasErrorMessage('Пользователь с таким e-mail уже существует');
        } else {
          setHasErrorMessage(`При регистрации произошла ошибка`);
        }
      });
  }

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
            buttonText="Зарегистрироваться"
            isFormValid={isFormValid}
            hasError={hasError}
            hasErrorMessage={hasErrorMessage}
          />            
        </form>
        <p className="register__caption">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;