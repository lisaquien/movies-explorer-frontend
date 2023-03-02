import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const { card, isLiked, likeCard } = props;

  const location = useLocation();

  const moviesPageDefaultIcon = location.pathname === "/movies" && "film-card__button_type_listed";
  const savedMoviesPageDefaultIcon = location.pathname === "/saved-movies" && "film-card__button_type_delete";
  const likedCardIcon = isLiked && "film-card__button_type_saved";

  return(
    <li className="film-card">
      <div className="film-card__header">
        <div>
          <p className="film-card__name">{card.name}</p>
          <p className="film-card__duration">{card.duration}</p>
        </div>
        <div className="film-card__button-container">
          <button
            className={`film-card__button ${moviesPageDefaultIcon} ${savedMoviesPageDefaultIcon} ${likedCardIcon}`}
            type="button"
            onClick={likeCard}>
          </button>
        </div>
      </div>
      <img className="film-card__image" src={card.image} alt="постер к фильму" />
    </li>
  );
}

export default MoviesCard;