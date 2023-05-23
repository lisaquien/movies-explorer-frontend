import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { mainApi } from '../../utils/MainApi';
import useValidation from '../../hooks/useValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const {
    setCurrentUser,
    handleLogout,
    hasError,
    setHasError,
    errorMessage,
    setErrorMessage,
    requestExecuting,
    setRequestExecuting,
   } = props;

   const currentUser = useContext(CurrentUserContext);

  const { values, setValues, errors, isFormValid, handleChange } = useValidation();

  const [inputsEnabled, setInputsEnabled] = useState(false);

  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [messageSuccessful, setMessageSuccessful] = useState('');

  function toggleInputs() {
    setInputsEnabled(!inputsEnabled);
  }

  function onProfileUpdateFormSubmit(event) {
    event.preventDefault();
    setRequestExecuting(true);
    mainApi.updateMyInfo(values)
      .then((res) => {
        setUpdateSuccessful(true);
        setMessageSuccessful('Профиль успешно обновлен');
        setValues(res);
        setCurrentUser(res);
        toggleInputs();
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        setHasError(true);
        if(Number(err) === 409) {
          setErrorMessage('Пользователь с таким email уже существует.')
        } else {
          setErrorMessage('При обновлении профиля произошла ошибка. Токен не передан или передан не в том формате.');
        }
      })
      .finally(() => setRequestExecuting(false));
  }

  return(
    <div className="profile">
      <div className="profile__container">
        <p className="profile__greeting">Привет, {currentUser.name}!</p>
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
                value={values.name || currentUser.name}
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
                value={values.email || currentUser.email}
                error={errors.email || ""}
                disabled={!inputsEnabled && "disabled"}
              /> 
            </div>
            <div className="profile__ctrl-panel">
              {inputsEnabled
              ? <FormButton
                  componentName="profile"
                  buttonText={requestExecuting ? 'Сохранение...' : "Сохранить"}
                  isFormValid={isFormValid}
                  hasError={hasError}
                  errorMessage={errorMessage}
                  requestExecuting={requestExecuting}
                />
              :
                <>
                  {updateSuccessful && <span className="profile__link-message">{messageSuccessful}</span>}
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