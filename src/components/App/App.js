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
          setErrorMessage('При проверке токена авторизации произошла ошибка, попробйте авторизоваться снова');
          navigate('/sign-in');
          console.log(`Ошибка: ${err}`);
        });
    };
  }, [token]);

  useEffect(() => {
    if(loggedIn) {
      mainApi.getSavedMovies()
        .then(res => {
          setSavedMovies(res);
          localStorage.setItem("ownSavedMovies", JSON.stringify(res));
        })
        .catch(err => `Error: ${err}`);
    }
  }, [loggedIn]);

  function handleLoginState() {
    setLoggedIn(true);
  };

  function handleLogOutState() {
    localStorage.removeItem('queryValue');
    localStorage.removeItem('shortsToggleSwitch');
    localStorage.removeItem('queryFilteredFilms');
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
        .catch((err) => console.log(err));
  };

  function handleFilmUnsave(movie, setIsAdded) {
    mainApi.unsaveMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter(m => m._id !== movie._id));
        setIsAdded(false);
      })
      .catch(err => console.log(`Error: ${err}`))
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
              />} />
              <Route path="/saved-movies" element={<SavedMovies
                savedMovies={savedMovies}
                handleFilmUnsave={handleFilmUnsave}
              />} />     
              <Route path="/profile" element={<Profile
                user={currentUser}
                setCurrentUser={setCurrentUser}
                handleLogout={handleLogOutState}
              />} />
            </Route>
          </Route>
          <Route path="/sign-up" element={!loggedIn
            ? <Register
              hasError={hasError}
              setHasError={setHasError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            /> : <Navigate to="/movies" replace />} />
          <Route path="/sign-in" element={!loggedIn
            ? <Login
            handleLoginState={handleLoginState}
            hasError={hasError}
            setHasError={setHasError}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            />
            : <Navigate to="/movies" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
