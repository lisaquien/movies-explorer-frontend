import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { mainApi } from '../../utils/MainApi';
import useValidation from '../../hooks/useValidation';

function Profile(props) {
  const { user, setCurrentUser, handleLogout } = props;

  const { values, setValues, errors, isFormValid, handleChange } = useValidation();

  const [inputsEnabled, setInputsEnabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState('');

  function toggleInputs() {
    setInputsEnabled(!inputsEnabled);
  }

  function onProfileUpdateFormSubmit(event) {
    event.preventDefault();
    mainApi.updateMyInfo(values)
      .then((res) => {
        setValues(res);
        setCurrentUser(res);
        toggleInputs();
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        setHasError(true);
        setHasErrorMessage('При обновлении профиля произошла ошибка');
      });
  }

  return(
    <div className="profile">
      <div className="profile__container">
        <p className="profile__greeting">Привет, {user.name}!</p>
        <div className="profile__info">
          <form className="form form_profile" noValidate onSubmit={onProfileUpdateFormSubmit}>
            <div className="profile__name">
              <FormInput
                componentName="profile"
                labelText="Имя"
                type="text"
                name="name"
                id="profile-name"
                onChange={handleChange}
                value={values.name || user.name}
                error={errors.name || ""}
                minLength="2"
                maxLength="30"
                disabled={!inputsEnabled && "disabled"}
              />       
            </div>
            <div className="profile__email">
              <FormInput
                componentName="profile"
                labelText="E-mail"
                type="email"
                name="email"
                id="profile-email"
                onChange={handleChange}
                value={values.email || user.email}
                error={errors.email || ""}
                disabled={!inputsEnabled && "disabled"}
              /> 
            </div>
            <div className="profile__ctrl-panel">
              {inputsEnabled
              ? <FormButton
                  componentName="profile"
                  buttonText="Сохранить"
                  isFormValid={isFormValid}
                  hasError={hasError}
                  hasErrorMessage={hasErrorMessage}
                />
              :
                <>
                  <Link to="" className="profile__link" onClick={toggleInputs}>Редактировать</Link>
                  <Link to="" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</Link>
                </>
              }
            </div>
          </form>  
        </div>
      </div>
    </div>
  );
}

export default Profile;