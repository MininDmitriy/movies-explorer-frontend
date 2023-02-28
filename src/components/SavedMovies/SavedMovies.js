import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState, useCallback } from 'react';
import Preloader from '../Preloader/Preloader';
import { getMovies, deleteMovies } from "../../utils/MainApi";

function SavedMovies({ openPopup }) {
  const [movies, setMovies] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleGetMovies = async (inputSearch, tumbler) => {
    setErrorText('');
    setPreloader(true);

    try {
      const data = await getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (tumbler) {        
        let newFilterData = filterData.filter(({ duration }) => duration <= 40);
        setMovies(newFilterData);    
      } else {
        setMovies(filterData);
      }

      if (inputSearch) {
        localStorage.setItem('savedMovies', JSON.stringify(filterData));
      } else {
        localStorage.removeItem('savedMovies');
      }
    } catch (err) {
      setErrorText(
        'Произошла ошибка. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('savedMovies');
    } finally {
      setPreloader(false);
    }
  }

  const handleGetMoviesTumbler = useCallback ((inputSearch, tumbler) => {
    handleGetMovies(inputSearch, tumbler)
  }, []);

  const savedMoviesToggle = async (movie, favorite) => {
    if (!favorite) {
      try {
        await deleteMovies(movie._id);
        const newMovies = await getMovies();
        setMovies(newMovies);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка');
      }
    }
  }

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        openPopup(`Ошибка: ${err}`);
      })
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm 
        handleGetMovies={handleGetMovies} 
        moviesSwitch={true} 
        moviesInputSearch={''} 
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && (
        <MoviesCardList 
          moviesRemains={[]} 
          savedMoviesToggle={savedMoviesToggle} 
          movies={movies} 
        />
      )}
    </main>
  );
}

export default SavedMovies;
