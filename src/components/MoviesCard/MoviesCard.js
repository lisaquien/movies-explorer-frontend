import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { setMovieHours, setMovieMinutes } from '../../utils/constants';

function MoviesCard(props) {
  const { card, handleFilmSave, savedMovies, handleFilmUnsave } = props;

  const location = useLocation();

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(savedMovies.find(sMovie => sMovie.movieId === card.id));
  }, [card.id, savedMovies])

  const moviesPageDefaultIcon = location.pathname === "/movies";
  const savedMoviesPageDefaultIcon = location.pathname === "/saved-movies";
  const likedCardIcon = isAdded && "film-card__button_type_saved";

  const allMovieObj = {
    country: card.country,
    nameRU: card.nameRU,
    nameEN: card.nameEN,
    duration: card.duration,
    image: card.image,
    thumbnail: card.thumbnail,
    director: card.director,
    year: card.year,
    description: card.description,
    trailerLink: card.trailerLink,
    movieId: card.id,
  };

  const savedMovieObj = { _id: card._id, ...card};

  function onSaveButtonClick() {
    if(!isAdded) {
      handleFilmSave(allMovieObj, setIsAdded);
    } else {
      handleFilmUnsave(savedMovies.filter((m) => m.movieId === card.id)[0]);
    }
  };

  function onUnsaveButtonClick() {
    handleFilmUnsave(savedMovieObj, setIsAdded);
  };

  return(
    <li className="film-card">
      <div className="film-card__header">
        <div>
          <p className="film-card__name">{card.nameRU}</p>
          <p className="film-card__duration">{setMovieHours(card.duration)}ч {setMovieMinutes(card.duration)}м</p>
        </div>
        <div className="film-card__button-container">
          { moviesPageDefaultIcon && <button
            className={`film-card__button film-card__button_type_listed ${likedCardIcon}`}
            type="button"
            onClick={onSaveButtonClick}
            >
          </button> }
          { savedMoviesPageDefaultIcon && <button
            className={`film-card__button film-card__button_type_delete`}
            type="button"
            onClick={onUnsaveButtonClick}
            >
          </button> }
        </div>
      </div>
      <a className="film-card-link" href={card.trailerLink} rel="noreferrer" target="_blank">
        <div className="film-card__image-container">
          <img className="film-card__image" src={card.image} alt="постер к фильму" />
        </div>
      </a>
    </li>
  );
}

export default MoviesCard;