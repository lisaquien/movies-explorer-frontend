import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import FormInput from '../FormInput/FormInput';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormButton from '../FormButton/FormButton';

function Login() {
  let isError = false;

   // Стейт-переменные для инпутов Имя, Имейл, Пароль
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   // Функции-обработчики ввода инпутов Имя, Имейл, Пароль
  function handleEmailInput(e) {
    setEmail(e.target.value);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  return(
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <Logo />
          <p className="login__welcoming-line">Рады видеть!</p>
        </div>
        <form className="form form_login">
          <FormInput
            componentName="login"
            labelText="E-mail"
            name="email"
            type="email"
            id="log-email"
            onChange={handleEmailInput}
            value={email || ""}
            required="required"
          />
          <FormInput
            componentName="login"
            labelText="Пароль"
            name="password"
            type="password"
            id="log-password"
            onChange={handlePasswordInput}
            value={password || ""}
            required="required"
            />
          {isError && <ErrorMessage />}
          <FormButton componentName="login" buttonText="Войти" />          
        </form>
        <p className="login__caption">Еще не зарегистрированы? <Link to="/sign-up" className="login__link">Регистрация</Link></p>
      </div>
    </div>
  );
}

export default Login;