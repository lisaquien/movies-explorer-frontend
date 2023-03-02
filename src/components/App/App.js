import { Routes, Route } from 'react-router-dom';
import './App.css';
import PageLayout from '../PageLayout/PageLayout';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import React from 'react';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';

function App() {
  let loggedIn = true;

  const userInfo = {
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  }

  return (
    <div className="page">
      <Routes>
        <Route element={<PageLayout loggedIn={loggedIn} />}>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies /> } />     
          <Route path="/profile" element={<Profile user={userInfo}/>} />
        </Route>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
