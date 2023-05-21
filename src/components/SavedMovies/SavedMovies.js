import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const { savedMovies, handleFilmUnsave } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [queryValue, setQueryValue] = useState('');

  const [savedFilmsFiltered, setSavedFilmsFiltered] = useState([]);
  const [shortsToggleSwitch, setShortsToggleSwitch] = useState(false);

  const [resultError, setResultError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    shortsToggleSwitch ? setSavedFilmsFiltered(filterByDuration(savedMovies)) : setSavedFilmsFiltered(savedMovies);
  }, [shortsToggleSwitch, savedMovies])

  /*useEffect(() => {
    const shortsToggleFilteredFilms = filterByDuration(queryFilteredSavedFilms);

    shortsToggleSwitch ? setSavedFilmsFiltered(shortsToggleFilteredFilms) : setSavedFilmsFiltered(queryFilteredSavedFilms);
  }, [shortsToggleSwitch, queryFilteredSavedFilms])*/

  function handleSearch() {
    setResultError(false);
    setErrorMessage('');
    setIsLoading(true);

    const queryFilteredFilms = filterByQuery(savedMovies, queryValue);

    if(!queryFilteredFilms.length) {
      setResultError(true);
      setErrorMessage('Ничего не найдено');
      setIsLoading(false);
      return;
    }

    shortsToggleSwitch
      ? setSavedFilmsFiltered(filterByDuration(queryFilteredFilms))
      : setSavedFilmsFiltered(queryFilteredFilms);
  
    setIsLoading(false);
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
          </p> ) || ( savedFilmsFiltered.length && <>
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