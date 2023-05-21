import React, { useState, useEffect, useCallback } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';

function Movies(props) {
  const { handleFilmSave, savedMovies, handleFilmUnsave } = props;

  const windowWidth = document.documentElement.clientWidth;

  const [isLoading, setIsLoading] = useState(false);

  const [queryValue, setQueryValue] = useState(
    localStorage.getItem('queryValue') || ''
  );
  const [renderedFilms, setRenderedFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState(
    JSON.parse(localStorage.getItem('filteredFilms')) || []
  );
  const [shortsToggleSwitch, setShortsToggleSwitch] = useState(
    JSON.parse(localStorage.getItem('shortsToggleSwitch')) || false
  );

  const [resultError, setResultError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [filmsPerLoad, setFilmsPerLoad] = useState(0);

  function handleFilmsPerRowLoaded() {
    setTimeout(() => {
      if(windowWidth >= 1088) {
        setFilmsPerLoad(12);
      } else if (windowWidth >= 684) {
        setFilmsPerLoad(8);
      } else {
        setFilmsPerLoad(5);
      };
    }, 1000);
  }

  function handleLoadMoreButtonClick() {
    setTimeout(() => {
      if(windowWidth >= 1088) {
        setFilmsPerLoad(filmsPerLoad + 3);
      } else {
        setFilmsPerLoad(filmsPerLoad + 2);
      };
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', handleFilmsPerRowLoaded(windowWidth));

    return() => {
      window.removeEventListener('resize', handleFilmsPerRowLoaded(windowWidth));
    };
  }, [windowWidth]);

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
    localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
  }, [filteredFilms]);

  useEffect(() => {
    localStorage.setItem('shortsToggleSwitch', shortsToggleSwitch);
  }, [shortsToggleSwitch])

  useEffect(() => {
    const shortsToggleFilteredFilms = filterByDuration(filteredFilms);

    shortsToggleSwitch ? setRenderedFilms(shortsToggleFilteredFilms) : setRenderedFilms(filteredFilms);
  }, [shortsToggleSwitch, filteredFilms]);

  const handleSearch = useCallback(() => {
    setResultError(false);
    setErrorMessage('');
    setIsLoading(true);

    if (!queryValue) {
      setResultError(true);
      setErrorMessage('Нужно ввести ключевое слово');
      setIsLoading(false);
      return;
    }

    moviesApi.getAllBeatMovies()
      .then(res => res.map(item => ({
          country: item.country,
          description: item.description,
          director: item.director,
          duration: item.duration,
          id: item.id,
          image: `https://api.nomoreparties.co${item.image.url}`,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
          trailerLink: item.trailerLink,
          year: item.year,
      })))
      .then((res) => {
        const queryFilteredFilms = filterByQuery(res, queryValue);

        if(!queryFilteredFilms.length) {
          setResultError(true);
          setErrorMessage('Ничего не найдено');
          return;
        }

        setFilteredFilms(queryFilteredFilms);

        localStorage.setItem('queryValue', queryValue);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`)
        setResultError(true);
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      })
      .finally(setIsLoading(false));
    
  }, [queryValue]);
  
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
      </p> ) || ( renderedFilms.length && <>
                  <MoviesCardList
                    cards={renderedFilms.slice(0, filmsPerLoad)}
                    handleFilmSave={handleFilmSave}
                    savedMovies={savedMovies}
                    handleFilmUnsave={handleFilmUnsave}
                  />
                  { !(filmsPerLoad >= renderedFilms.length) && <div className="all-movies__container">
                        <button className="all-movies__button " type="button" onClick={handleLoadMoreButtonClick}>Еще</button>
                      </div> }
                </> ) || null
      }
    </section>
  );
}

export default Movies;