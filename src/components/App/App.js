import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import PageLayout from '../PageLayout/PageLayout';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import { mainApi } from '../../utils/MainApi';
import useValidation from '../../hooks/useValidation';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  const [loggedIn, setLoggedIn] = useState(!token ? false : true);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  })

  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem('searchFilteredFilms')) || []
  );

  const [requestExecuting, setRequestExecuting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(!token) {
      if(location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') {
        navigate('/');
        return;
      }
    }
    if(token) {
      mainApi.checkToken(token)
        .then((res) => {
          const { name, email } = res;
          handleLoginState();
          setCurrentUser({ name, email });
          navigate(location.pathname);
        })
        .catch((err) => {
          setHasError(true);
          setErrorMessage('При авторизации произошла ошибка. Переданный токен некорректен.');
          navigate('/sign-in');
          console.log(`Ошибка: ${err}`);
        });
    };
  }, [token]);

  useEffect(() => {
    if(loggedIn && location.pathname === '/saved-movies') {
      mainApi.getSavedMovies()
        .then(res => res.map(item => ({
          country: item.country,
          description: item.description,
          director: item.director,
          duration: item.duration,
          image: item.image,
          movieId: item.movieId,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          thumbnail: item.thumbnail,
          trailerLink: item.trailerLink,
          year: item.year,
          _id: item._id,
        })))
        .then(res => {
          setSavedMovies(res);
          localStorage.setItem("ownSavedMovies", JSON.stringify(res));
        })
        .catch(err => {
          console.log(`Error: ${err}`);
          if (Number(err) === 404) {
            setHasError(true);
            setErrorMessage('У вас нет сохраненных фильмов');
          } else {
            setHasError(true);
            setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
          
          }
        });
    }
  }, [loggedIn, location.pathname]);

  function handleLoginState() {
    setLoggedIn(true);
  };

  const { values, setValues, errors, isFormValid, handleChange } = useValidation();

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    setRequestExecuting(true);
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
      })
      .finally(() => {setRequestExecuting(false)});
  }

  function handleRegFormSubmit(event) {
    event.preventDefault();
    setRequestExecuting(true);
    setHasError(false);
    setErrorMessage('');

    const { name, email, password } = values;
    mainApi.register({ name, email, password })
      .then((res) => {
        handleLoginFormSubmit(event);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setHasError(true);
        if(Number(err) === 409) {
          setErrorMessage('Пользователь с таким e-mail уже существует.');
        }  else if(Number(err) === 400) {
          setErrorMessage('Данные вводятся некорректно.');
        } else {
          setErrorMessage('При регистрации произошла ошибка.');
        }
      })
      .finally(() => setRequestExecuting(false));
  }

  function handleLogOutState() {
    localStorage.removeItem('queryValue');
    localStorage.removeItem('shortsToggleSwitch');
    localStorage.removeItem('allFilms');
    localStorage.removeItem('renderedFilms');
    localStorage.removeItem('ownSavedMovies');
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  function handleFilmSave(movie, setIsAdded) {
    mainApi.addNewMovie(movie)
        .then((data) => {
          setSavedMovies([...savedMovies, data]);
          setIsAdded(true);
        })
        .catch((err) => console.log(`Error: ${err}`));
  };

  function handleFilmUnsave(movie, setIsAdded) {
    mainApi.unsaveMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter(m => m._id !== movie._id));
        setIsAdded(false);
      })
      .catch(err => console.log(`Error: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route element={<PageLayout loggedIn={loggedIn} />}>
            <Route path="/" element={<Main />} />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route path="/movies" element={<Movies
                handleFilmSave={handleFilmSave}
                savedMovies={savedMovies}
                handleFilmUnsave={handleFilmUnsave}
                hasError={hasError}
                setHasError={setHasError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />} />
              <Route path="/saved-movies" element={<SavedMovies
                savedMovies={savedMovies}
                handleFilmUnsave={handleFilmUnsave}
                hasError={hasError}
                setHasError={setHasError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />} />     
              <Route path="/profile" element={<Profile
                setCurrentUser={setCurrentUser}
                handleLogout={handleLogOutState}
                hasError={hasError}
                setHasError={setHasError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                requestExecuting={requestExecuting}
                setRequestExecuting={setRequestExecuting}
              />} />
            </Route>
          </Route>
          <Route path="/sign-up" element={!loggedIn
            ? <Register
              hasError={hasError}
              setHasError={setHasError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              requestExecuting={requestExecuting}
              handleRegFormSubmit={handleRegFormSubmit}
              values={values}
              errors={errors}
              isFormValid={isFormValid}
              handleChange={handleChange}
            /> : <Navigate to="/movies" replace />} />
          <Route path="/sign-in" element={!loggedIn
            ? <Login
            hasError={hasError}
            setHasError={setHasError}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            requestExecuting={requestExecuting}
            handleLoginFormSubmit={handleLoginFormSubmit}
            values={values}
            errors={errors}
            isFormValid={isFormValid}
            handleChange={handleChange}
            />
            : <Navigate to="/movies" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
