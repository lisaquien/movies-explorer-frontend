import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { mainApi } from '../../utils/MainApi';
import useValidation from '../../hooks/useValidation';

function Login({ handleLoginState, hasError, setHasError, errorMessage, setErrorMessage }) {

  const navigate = useNavigate();

  const { values, setValues, errors, isFormValid, handleChange } = useValidation();

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    setHasError(false);
    setErrorMessage('');

    if (!values.email || !values.password) {
      return;
    }

    const { email, password } = values;
    
    mainApi.authorise({ email, password })
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setValues({
            email: '',
            password: '',
          });
          handleLoginState();
          navigate('/movies', {replace: true});
        } else {
          return;
        };
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setHasError(true);
        if(Number(err) === 401) {
          setErrorMessage('Вы ввели неправильный логин или пароль.');
        } else if(Number(err) === 400) {
          setErrorMessage('Данные вводятся некорректно.');
        } else {
          setErrorMessage('При авторизации произошла ошибка.');
        }
      });
  }

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
            buttonText="Войти"
            isFormValid={isFormValid}
            hasError={hasError}
            errorMessage={errorMessage}
          />          
        </form>
        <p className="login__caption">Еще не зарегистрированы? <Link to="/sign-up" className="login__link">Регистрация</Link></p>
      </div>
    </div>
  );
}

export default Login;