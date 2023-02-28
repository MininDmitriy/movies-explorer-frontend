import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { getMoviesFromBV } from "../../utils/MoviesApi";
import { addMovies, deleteMovies, getMovies } from "../../utils/MainApi";

function Movies({ openPopup }) {
  const [preloader, setPreloader] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [movies, setMovies] = useState(null);
  const [moviesSaved, setMoviesSaved] = useState(null);
  const [moviesSwitch, setMoviesSwitch] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesShowed, setMoviesShowed] = useState(null);
  const [moviesCount, setMoviesCount] = useState([]);

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, [])

  const  getMoviesCount = () => {
    let countMoviesCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      '1140': [16, 4],
      '984': [9, 3],
      '568': [8, 2],
      '350': [5, 2],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countMoviesCards = MoviesCountConfig[key];
        }
      });

    return countMoviesCards;
  }

  const handlerMore = () => {
    const spliceMovies = movies;
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, moviesCount[1]));
    setMoviesShowed(newMoviesShowed);
    setMovies(spliceMovies);
  }

  const savedMoviesToggle = async (movie, select) => {
    if (select) {
      try {
        await addMovies(movie);
        const newSaved = await getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        openPopup('Во время добавления фильма произошла ошибка');
      }
    } else {
      try {
        await deleteMovies(movie._id);
        const newSaved = await getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка');
      }
    }
  }

  const handleGetMovies = async (inputSearch, tumbler) => {
    localStorage.setItem('moviesSwitch', tumbler);

    if (!inputSearch) {
      setErrorInfo('Необходимо ввести ключевое слово в поисковик');
      return false;
    }

    setErrorInfo('');
    setPreloader(true);

    try {
      const data = await getMoviesFromBV();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      let filterDataShowed = [];

      if (tumbler) {
        let newFilterData = filterData.filter(( duration ) => duration.duration <= 40);        
        localStorage.setItem('movies', JSON.stringify(newFilterData));

      } else {
        let newFilterData = filterData.filter(( duration ) => duration.duration > 40); 
        localStorage.setItem('movies', JSON.stringify(newFilterData));
        
      }

      let newFilterData = JSON.parse(localStorage.getItem('movies'));
      filterDataShowed = newFilterData.splice(0, getMoviesCount()[0]);
      setMoviesShowed(filterDataShowed);
      setMovies(newFilterData);
      localStorage.setItem('moviesSwitch', tumbler);
      localStorage.setItem('moviesInputSearch', inputSearch);

      // const spliceData = filterData.splice(0, moviesCount[0]);
      // setMoviesShowed(spliceData);
      // setMovies(filterData);
    } catch (err) {
      setErrorInfo(
        `Во время запроса произошла ошибка. Возможно, проблема с соединением 
        или сервер недоступен. Подождите немного и попробуйте ещё раз`
      );
      setMovies([]);
      localStorage.removeItem('movies');
      localStorage.removeItem('moviesSwitch');
      localStorage.removeItem('moviesInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  const handleGetMoviesTumbler = (tumbler) => {
    const inputSearch = localStorage.getItem('moviesInputSearch');
    handleGetMovies (inputSearch, !tumbler);
  }
  
  useEffect(() => {
    getMovies()
      .then((data) => {
        setMoviesSaved(data);
      })
      .catch((err) => {
        openPopup(`Ошибка: ${err}`);
      });
 
    const localStorageMovies = localStorage.getItem('movies');

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]));
      setMovies(filterData);
      setPreloader(false);
    }
 
    const localStorageMoviesSwitch = localStorage.getItem('moviesSwitch');
    const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch');
 
    if (localStorageMoviesSwitch) {
      setMoviesSwitch(localStorageMoviesSwitch);
    } 
 
    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch === 'false');
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm 
        handleGetMovies={handleGetMovies} 
        moviesSwitch={moviesSwitch} 
        moviesInputSearch={moviesInputSearch} 
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorInfo && <div className="movies__text-error">{errorInfo}</div>}
      {!preloader && !errorInfo && movies !== null && moviesShowed !== null && moviesSaved !== null && (
        <MoviesCardList 
          handlerMore={handlerMore} 
          moviesRemains={movies} 
          movies={moviesShowed} 
          savedMoviesToggle={savedMoviesToggle} 
          moviesSaved={moviesSaved} 
        />
      )}
    </main>
  );
}

export default Movies;