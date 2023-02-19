import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ film, savedMoviesToggle, filmsSaved }) {
  const { pathname } = useLocation();
  const [select, setSelect] = useState(false);

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedFilm = filmsSaved.filter((obj) => {
        return obj.movieId === film.id;
      });

      if (savedFilm.length > 0) {
        setSelect(true);
      } else {
        setSelect(false);
      }
    }
  }, [pathname, filmsSaved, film.id]);

  function handlerSelectToogle() {
    const newSelect = !select;
    const savedFilm = filmsSaved.filter((obj) => {
      return obj.movieId === film.id;
    });
    savedMoviesToggle({ ...film, _id: savedFilm.length > 0 ? savedFilm[0]._id : null }, newSelect);
  }

  function handlerSelectDelete() {
    savedMoviesToggle(film, false);
  }

  function changeMovieDuration(minute) {
    return `${Math.floor(minute / 60)}ч ${minute % 60}м`;
  }
 
  return (
    <li className="card">
      <a 
        className="card__image-content" 
        href={pathname === '/saved-movies' ? film.trailer : film.trailerLink} 
        target="_blank"  
        rel="noreferrer"
      ><img 
          className="card__image" 
          src={pathname === '/saved-movies' ? `${film.image}` : `https://api.nomoreparties.co/beatfilm-movies${film.image.url}`} 
          alt={film.nameRU}
        ></img>
      </a>

      <div className="card__body">
        
        <div className="card__container-info-card">
          <p className="card__title">{film.nameRU}</p>
          <div className="card__buttons">
            {pathname === '/saved-movies' ? (
              <button 
                aria-label="Button select movie"
                type="button" 
                className="card__button card__button_delete" 
                onClick={handlerSelectDelete} 
              />
            ) : (
              <button 
                type="button" 
                className={`card__button card__button${select ? '_active' : '_inactive'}`} 
                onClick={handlerSelectToogle} 
              />
            )}          
          </div>
          <p className="card__duration">{changeMovieDuration(film.duration)}</p>
        </div>

      </div>
    </li>
  );
}

export default MoviesCard;