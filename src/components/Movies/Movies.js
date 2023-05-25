import React, { useState, useEffect, useCallback } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import {
  THREE_CARD_W_WIDTH,
  TWO_CARD_W_WIDTH,
  CARDS_LOADED_MAX,
  CARDS_LOADED_MEDIUM,
  CARDS_LOADED_MIN,
  CARDS_PER_LOAD_MAX,
  CARDS_PER_LOAD_MIN,
  SHORT_FILMS_DURATION,
 } from '../../utils/constants';

function Movies(props) {
  const { handleFilmSave,
    savedMovies,
    handleFilmUnsave,
    hasFilmResultError,
    setHasFilmResultError,
    filmResultErrorMessage,
    setFilmResultErrorMessage,
  } = props;

  const windowWidth = document.documentElement.clientWidth;

  const [isLoading, setIsLoading] = useState(false);

  const [queryValue, setQueryValue] = useState(
    localStorage.getItem('queryValue') || ''
  );
  const [shortsToggleSwitch, setShortsToggleSwitch] = useState(
    JSON.parse(localStorage.getItem('shortsToggleSwitch')) || false
  );

  const [allFilms, setAllFilms] = useState(
    JSON.parse(localStorage.getItem('allFilms')) || []);
  const [renderedFilms, setRenderedFilms] = useState(
    JSON.parse(localStorage.getItem('renderedFilms')) || []);

  const [filmsPerLoad, setFilmsPerLoad] = useState(0);

  const [firstRequestSent, setFirstRequestSent] = useState(false);

  function handleFilmsPerRowLoaded() {
    if(windowWidth >= THREE_CARD_W_WIDTH) {
      setFilmsPerLoad(CARDS_LOADED_MAX);
    } else if (windowWidth >= TWO_CARD_W_WIDTH) {
      setFilmsPerLoad(CARDS_LOADED_MEDIUM);
    } else {
      setFilmsPerLoad(CARDS_LOADED_MIN);
    };
  }

  function handleLoadMoreButtonClick() {
    if(windowWidth >= THREE_CARD_W_WIDTH) {
      setFilmsPerLoad(filmsPerLoad + CARDS_PER_LOAD_MAX);
    } else {
      setFilmsPerLoad(filmsPerLoad + CARDS_PER_LOAD_MIN);
    };
  };

  useEffect(() => {
    handleFilmsPerRowLoaded();
  }, [windowWidth])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', function() {
        handleFilmsPerRowLoaded();
      });
    }, 1000);

    return() => {
      window.removeEventListener('resize', function() {
        handleFilmsPerRowLoaded();
      })};
  }, [windowWidth]);

  function handleSearchFormInput(event) {
    setQueryValue(event.target.value);
  }

  function handleShortsToggleSwitchState() {
    setShortsToggleSwitch(!shortsToggleSwitch);
  }

  function filterByDuration(films) {
    return films.filter(film => Number(film.duration) <= SHORT_FILMS_DURATION);
  }

  function filterByQuery(films, queryValue) {
    return films.filter((film) => (
      film.nameRU.toLowerCase().includes(queryValue.toLowerCase())
      || film.nameEN.toLowerCase().includes(queryValue.toLowerCase())
    ));
  }

  useEffect(() => {
    localStorage.setItem('allFilms', JSON.stringify(allFilms));
  }, [allFilms]);

  useEffect(() => {
    localStorage.setItem('renderedFilms', JSON.stringify(renderedFilms));
  }, [renderedFilms]);

  useEffect(() => {
    localStorage.setItem('shortsToggleSwitch', shortsToggleSwitch);
  }, [shortsToggleSwitch])

  useEffect(() => {
    const queryFilteredFilms = filterByQuery(allFilms, queryValue);
    const shortsToggleFilteredFilms = filterByDuration(queryFilteredFilms);

    shortsToggleSwitch ? setRenderedFilms(shortsToggleFilteredFilms) : setRenderedFilms(queryFilteredFilms);

    localStorage.setItem('queryValue', queryValue);
  }, [filmResultErrorMessage, setHasFilmResultError, setFilmResultErrorMessage, allFilms, queryValue, firstRequestSent, shortsToggleSwitch]);

  const handleSearch = useCallback(() => {
    setHasFilmResultError(false);
    setFilmResultErrorMessage('');
    setIsLoading(true);

    if (!queryValue) {
      setFirstRequestSent(true);
      setHasFilmResultError(true);
      setFilmResultErrorMessage('Нужно ввести ключевое слово');
      setIsLoading(false);
      return;
    }

    if(!allFilms.length) {
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
            setFirstRequestSent(true);
            setHasFilmResultError(true);
            setFilmResultErrorMessage('Ничего не найдено');
            return;
          }

          const shortsToggleFilteredFilms = filterByDuration(queryFilteredFilms);

          setAllFilms(res);

          shortsToggleSwitch ? setRenderedFilms(shortsToggleFilteredFilms) : setRenderedFilms(queryFilteredFilms);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`)
          setHasFilmResultError(true);
          setFilmResultErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        })
        .finally(() => setIsLoading(false));
    } else {
      setFirstRequestSent(true);

      const queryFilteredFilms = filterByQuery(allFilms, queryValue);

      if(!queryFilteredFilms.length) {
        setFirstRequestSent(true);
        setHasFilmResultError(true);
        setFilmResultErrorMessage('Ничего не найдено');
      };

      const shortsToggleFilteredFilms = filterByDuration(queryFilteredFilms);

      shortsToggleSwitch ? setRenderedFilms(shortsToggleFilteredFilms) : setRenderedFilms(queryFilteredFilms);

      setIsLoading(false);
    }
  }, [queryValue, shortsToggleSwitch, allFilms, setFilmResultErrorMessage, setHasFilmResultError]);
  
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
        : ( (hasFilmResultError && firstRequestSent) && <p className="all-movies__message">
        <span className="all-movies__message-none">{filmResultErrorMessage}</span>
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