import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, savedMoviesToggle, moviesSaved, moviesRemains, handlerMore }) {
  const { pathname } = useLocation();

  return (
    <section className="movies-card-list page__movies-card-list">
      {movies.length > 0 ? (
        <ul className="movies-card-list__cards">
          {movies.map((item) => (
            <MoviesCard
              key={item.id || item.movieId}
              movie={item}
              savedMoviesToggle={savedMoviesToggle}
              moviesSaved={moviesSaved}
            />
          ))}
        </ul>
      ) : (
        <div className="movies-card-list__cards__text">Ничего не найдено</div>
      )}
  
      {pathname !== "/saved-movies" && moviesRemains.length > 0 && (
        <div className="movies-card-list__button-container">
          <button 
            aria-label="Load button" 
            className="movies-card-list__button" 
            type="button"
            onClick={handlerMore} 
          >Ещё</button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;