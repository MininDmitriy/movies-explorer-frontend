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
  const [moviesSwitch, setMoviesSwitch] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesShowed, setMoviesShowed] = useState([]);

  const handleGetMovies = async (inputSearch, tumbler) => {
    setErrorText('');
    setPreloader(true); 

    try {
      const data = await getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (!tumbler) {
        filterData = filterData.filter(({ duration }) => duration <= 40);
      }

      setMoviesShowed(filterData);

      if (inputSearch) {
        localStorage.setItem('savedMovies', JSON.stringify(filterData));
        localStorage.setItem('savedMoviesSwitch', tumbler);
        localStorage.setItem('savedMoviesInputSearch', inputSearch);
      } else {
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('savedMoviesSwitch');
        localStorage.removeItem('savedMoviesInputSearch');
      }
    } catch (err) {
      setErrorText(
        'Произошла ошибка. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('savedMovies');
      localStorage.removeItem('savedMoviesSwitch');
      localStorage.removeItem('savedMoviesInputSearch');
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
        setMoviesShowed(newMovies);
        setMovies(newMovies);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка');
      }
    }
  }

  useEffect( () => {
    const localStorageMovies = localStorage.getItem('savedMovies');
    if (localStorageMovies) {
      setMovies(JSON.parse(localStorageMovies));
      setMoviesShowed(JSON.parse(localStorageMovies));
      const localStorageMoviesSwitch = localStorage.getItem('savedMoviesSwitch');
      const localStorageMoviesInputSearch = localStorage.getItem('savedMoviesInputSearch');

      if (localStorageMoviesSwitch) {
        setMoviesSwitch(localStorageMoviesSwitch === 'false');
      }
      if (localStorageMoviesInputSearch) {
        setMoviesInputSearch(localStorageMoviesInputSearch);
      }
    } else {
      getMovies()
        .then((data) => {
          setMovies(data);
          setMoviesShowed(data);
        })
        .catch((err) => {
          openPopup(`Ошибка: ${err}`);
        })
    }
  }, [openPopup]);

  return (
    <main className="saved-movies">
      <SearchForm 
        handleGetMovies={handleGetMovies} 
        moviesSwitch={moviesSwitch} 
        moviesInputSearch={moviesInputSearch} 
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && (
        <MoviesCardList 
          moviesRemains={[]} 
          savedMoviesToggle={savedMoviesToggle} 
          movies={moviesShowed} 
        />
      )}
    </main>
  );
}

export default SavedMovies;
