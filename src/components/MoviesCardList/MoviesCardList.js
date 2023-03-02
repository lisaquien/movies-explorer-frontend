import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import card1 from '../../images/cards/card1.png';
import card2 from '../../images/cards/card2.png';
import card3 from '../../images/cards/card3.png';
import card4 from '../../images/cards/card4.png';
import card5 from '../../images/cards/card5.png';

function MoviesCardList() {
  let [ isLiked, setIsLiked ] = useState(false);

  function toggleLikeCard() {
    setIsLiked(!isLiked);
  }

  const cardsList = [
    {
      name: "33 слова о дизайне",
      duration: "1ч 47м",
      image: card1,
    },
    {
      name: "33 слова о дизайне",
      duration: "1ч 47м",
      image: card2,
    },
    {
      name: "33 слова о дизайне",
      duration: "1ч 47м",
      image: card3,
    },
    {
      name: "33 слова о дизайне",
      duration: "1ч 47м",
      image: card4,
    },
    {
      name: "33 слова о дизайне",
      duration: "1ч 47м",
      image: card5,
    },
  ]

  return(
    <ul className="film-cards">
      {cardsList.map((card, i) => {
        return(<MoviesCard card={card} key={i} isLiked={isLiked} likeCard={toggleLikeCard} />)
      })
      }
    </ul>
  );
}

export default MoviesCardList;