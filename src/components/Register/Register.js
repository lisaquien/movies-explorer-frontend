import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import FormInput from '../FormInput/FormInput';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormButton from '../FormButton/FormButton';

function Register() {
  let isError = false;

  // Стейт-переменные для инпутов Имя, Имейл, Пароль
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Функции-обработчики ввода инпутов Имя, Имейл, Пароль
  function handleNameInput(e) {
    setName(e.target.value);
  }
  function handleEmailInput(e) {
    setEmail(e.target.value);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  return(
    <div className="register">
      <div className="register__container">
        <Logo />
        <p className="register__welcoming-line">Добро пожаловать!</p>
        <form className="form form_register">
          <FormInput
            componentName="register"
            labelText="Имя"
            name="name"
            type="text"
            id="reg-name"
            onChange={handleNameInput}
            value={name || ""}
            minLength="2"
            maxLength="30"
            required="required"
          />
          <FormInput
            componentName="register"
            labelText="E-mail"
            name="email"
            type="email"
            id="reg-email"
            onChange={handleEmailInput}
            value={email || ""}
            required="required"
          />
          <FormInput
            componentName="register"
            labelText="Пароль"
            name="password"
            type="password"
            id="reg-password"
            onChange={handlePasswordInput}
            value={password || ""}
            required="required"
            />
          {isError && <ErrorMessage />}
          <FormButton componentName="register" buttonText="Зарегистрироваться" />            
        </form>
        <p className="register__caption">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;