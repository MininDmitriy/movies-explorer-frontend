import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ films, savedMoviesToggle, filmsSaved, filmsRemains, handlerMoreFilms }) {
  const { pathname } = useLocation();

  return (
    <section className="movies-card-list page__movies-card-list">
      {films.length > 0 ? (
        <ul className="movies-card-list__cards">
          {films.map((film) => (
            <MoviesCard
              key={film.id || film.movieId}
              film={film}
              savedMoviesToggle={savedMoviesToggle}
              filmsSaved={filmsSaved}
            />
          ))}
        </ul>
      ) : (
        <div className="movies-card-list__cards__text">Ничего не найдено</div>
      )}
  
      {filmsRemains.length > 0 && pathname !== '/saved-movies' && (
        <div className="cards__button-container">
          <input 
            aria-label="Load button" 
            className="movies-card-list__button" 
            type="button" 
            value="Ещё" 
            onChange={handlerMoreFilms} 
          />
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;