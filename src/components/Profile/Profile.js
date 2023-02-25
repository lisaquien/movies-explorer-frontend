import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import FormInput from '../FormInput/FormInput';

function Profile(props) {
const { user } = props;

  // Стейт-переменные для инпутов Имя, Имейл, Пароль
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Функции-обработчики ввода инпутов Имя, Имейл, Пароль
  function handleNameInput(e) {
    setName(e.target.value);
  }
  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  return(
    <div className="profile">
      <div className="profile__container">
        <p className="profile__greeting">Привет, {user.name}!</p>
        <div className="profile__info">
          <form className="form form_profile">
            <div className="profile__name">
              <FormInput
                componentName="profile"
                labelText="Имя"
                type="text"
                name="name"
                id="profile-name"
                placeholder={user.name}
                onChange={handleNameInput}
                value={name || ""}
                minLength="2"
                maxLength="30"
              />       
            </div>
            <div className="profile__email">
              <FormInput
                componentName="profile"
                labelText="E-mail"
                type="email"
                name="email"
                id="profile-email"
                placeholder={user.email}
                onChange={handleEmailInput}
                value={email || ""}
              /> 
            </div>
          </form>  
        </div>
        <div className="profile__links">
          <Link to="" className="profile__link">Редактировать</Link>
          <Link to="" className="profile__link">Выйти из аккаунта</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;