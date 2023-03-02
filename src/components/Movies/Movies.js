import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  let isLoading = false;

  return(
    <section className="all-movies">
      <SearchForm />
      {isLoading && <Preloader />}
      <MoviesCardList />
      <div className="all-movies__container">
      <button className="all-movies__button " type="button">Еще</button>
      </div>
    </section>
  );
}

export default Movies;