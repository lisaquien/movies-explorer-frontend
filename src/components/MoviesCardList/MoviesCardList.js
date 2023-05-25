import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { cards, handleFilmSave, savedMovies, handleFilmUnsave } = props;

  return(
    <ul className="film-cards">
      {cards.map((card, index) => <MoviesCard
          card={card}
          key={card.id || index}
          savedMovies={savedMovies}
          handleFilmSave={handleFilmSave}
          handleFilmUnsave={handleFilmUnsave}
        />)
      }
    </ul>
  );
}

export default MoviesCardList;