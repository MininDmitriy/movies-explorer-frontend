import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, savedMoviesToggle, moviesSaved }) {
  const { pathname } = useLocation();
  const [select, setSelect] = useState(false);

  useEffect(() => {
    if (pathname !== "/saved-movies") {
      const savedMovie = moviesSaved.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedMovie.length > 0) {
        setSelect(true);
      } else {
        setSelect(false);
      }
    }
  }, [pathname, moviesSaved, movie.id]);

  function handlerSelectToogle() {
    const newSelect = !select;
    const savedMovie = moviesSaved.filter((obj) => {
      return obj.movieId === movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null }, newSelect);
  }

  function handlerSelectDelete() {
    savedMoviesToggle(movie, false);
  }
  
  function changeMovieDuration(minute) {
    return `${Math.floor(minute / 60)}ч ${minute % 60}м`;
  }
 
  return (
    <li className="card">
      <a 
        className="card__image-content" 
        href={movie.trailerLink} 
        target="_blank"  
        rel="noreferrer"
      ><img 
          className="card__image" 
          src={pathname === "/saved-movies" ? `${movie.image}` : `https://api.nomoreparties.co/${movie.image.url}`} 
          alt={movie.nameRU}
        ></img>
      </a>

      <div className="card__body">
        
        <div className="card__container-info-card">
          <p className="card__title">{movie.nameRU}</p>

          <div className="card__buttons">
            {pathname === "/saved-movies" ? (
              <button 
                aria-label="Button delete movie"
                type="button" 
                className="card__button card__button_delete" 
                onClick={handlerSelectDelete} 
              />
            ) : (
              <button 
                aria-label="Button like or dislike movie"
                type="button" 
                className={`card__button card__button_like${select ? "_active" : "_inactive"}`} 
                onClick={handlerSelectToogle} 
              />
            )}          
          </div>
        </div>

        <p className="card__duration">{changeMovieDuration(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;