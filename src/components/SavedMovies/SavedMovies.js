import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';

function SavedMovies(props) {
  const { savedMovies, handleFilmUnsave } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [queryValue, setQueryValue] = useState('');

  const [allSavedFilms, setAllSavedFilms] = useState([]);
  const [savedFilmsFiltered, setSavedFilmsFiltered] = useState([]);
  const [shortsToggleSwitch, setShortsToggleSwitch] = useState(false);
  const [resultError, setResultError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filmsLoaded, setFilmsLoaded] = useState(false);

  function handleSearchFormInput(event) {
    setQueryValue(event.target.value);
  }

  function handleShortsToggleSwitchState() {
    setShortsToggleSwitch(!shortsToggleSwitch);
  }

  function filterByDuration(films) {
    return films.filter(film => Number(film.duration) <= 40);
  }

  function filterByQuery(films, queryValue) {
    return films.filter((film) => (
      film.nameRU.toLowerCase().includes(queryValue.toLowerCase())
      || film.nameEN.toLowerCase().includes(queryValue.toLowerCase())
    ));
  }

  useEffect(() => {
    setSavedFilmsFiltered(savedMovies);
  }, [savedMovies]);

  function handleSearch() {
    setResultError(false);
    setErrorMessage('');
    setFilmsLoaded(false);
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then(filmsArr => filmsArr.map(film => ({
          country: film.country,
          movieId: film.movieId,
          nameRU: film.nameRU,
          nameEN: film.nameEN,
          duration: film.duration,
          image: film.image,
          thumbnail: film.thumbnail,
          director: film.director,
          year: film.year,
          description: film.description,
          trailerLink: film.trailerLink,
          _id: film._id,
         })))
      .then((res) => {
        shortsToggleSwitch ? setAllSavedFilms(filterByDuration(res)) : setAllSavedFilms(res);
        setSavedFilmsFiltered(filterByQuery(allSavedFilms, queryValue));

        if(!savedFilmsFiltered.length) {
          setResultError(true);
          setErrorMessage('Ничего не найдено');
        } else {
          setFilmsLoaded(true);
        };
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`)
        setResultError(true);
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      })
      .finally(setIsLoading(false));
  }

  return(
    <section className="all-movies">
      <SearchForm
        query={queryValue}
        onInputChange={handleSearchFormInput}
        shortsToggleSwitch={shortsToggleSwitch}
        onToggleChange={handleShortsToggleSwitchState}
        onSubmit={handleSearch}
        />
      { isLoading
        ? <Preloader />
        : ( resultError && <p className="all-movies__message">
            <span className="all-movies__message-none">{errorMessage}</span>
          </p> ) || ( (filmsLoaded || savedFilmsFiltered.length) && <>
                      <MoviesCardList
                        cards={savedFilmsFiltered}
                        savedMovies={savedMovies}
                        handleFilmUnsave={handleFilmUnsave}
                      />
                    </> ) || null
      }
    </section>
  );
}

export default SavedMovies;