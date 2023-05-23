import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const {savedMovies,
    handleFilmSave,
    handleFilmUnsave,
    hasError,
    setHasError,
    errorMessage,
    setErrorMessage,
  } = props;

  const [queryValue, setQueryValue] = useState('');

  const [savedFilmsFiltered, setSavedFilmsFiltered] = useState([]);
  const [shortsToggleSwitch, setShortsToggleSwitch] = useState(false);

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
    setHasError(false);
    setErrorMessage('');
    
    const queryFilteredFilms = filterByQuery(savedMovies, queryValue);
    const shortsToggleFilteredFilms = filterByDuration(queryFilteredFilms);

    shortsToggleSwitch ? setSavedFilmsFiltered(shortsToggleFilteredFilms) : setSavedFilmsFiltered(queryFilteredFilms);
  }, [shortsToggleSwitch, savedMovies, queryValue]);

  function handleSearch() {
    setHasError(false);
    setErrorMessage('');

    if (!queryValue) {
      setHasError(true);
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }

    const queryFilteredFilms = filterByQuery(savedMovies, queryValue);

    if(!queryFilteredFilms.length) {
      setHasError(true);
      setErrorMessage('Ничего не найдено');
      return;
    }

    const shortsToggleFilteredFilms = filterByDuration(queryFilteredFilms);

    shortsToggleSwitch ? setSavedFilmsFiltered(shortsToggleFilteredFilms) : setSavedFilmsFiltered(queryFilteredFilms);
  };

  return(
    <section className="all-movies">
      <SearchForm
        query={queryValue}
        onInputChange={handleSearchFormInput}
        shortsToggleSwitch={shortsToggleSwitch}
        onToggleChange={handleShortsToggleSwitchState}
        onSubmit={handleSearch}
        />
      { ( hasError && <p className="all-movies__message">
            <span className="all-movies__message-none">{errorMessage}</span>
          </p> ) || ( savedFilmsFiltered.length && <>
                      <MoviesCardList
                        cards={savedFilmsFiltered}
                        savedMovies={savedMovies}
                        handleFilmSave={handleFilmSave}
                        handleFilmUnsave={handleFilmUnsave}
                      />
                    </> ) || null
      }
    </section>
  );
}

export default SavedMovies;