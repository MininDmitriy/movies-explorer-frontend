import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { getMovies } from "../../utils/MoviesApi";
import { addMovies, deleteMovies } from "../../utils/MainApi";

function Movies({ openPopup }) {
  const [movies, setMovies] = useState(null);
  const [moviesSaved, setMoviesSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [moviesSwitch, setMoviesSwitch] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesCount, setMoviesCount] = useState([]);
  const [moviesShowed, setMoviesShowed] = useState(null);
  const [moviesWithSwitch, setMoviesWithSwitch] = useState([]);
  const [moviesShowedWithSwitch, setMoviesShowedWithSwitch] = useState([]);

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      '1280': [16, 4],
      '1140': [9, 3],
      '984': [8, 2],
      '568': [5, 2],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const spliceFilms = movies;
    const newFilmsShowed = moviesShowed.concat(spliceFilms.splice(0, moviesCount[1]));
    setMoviesShowed(newFilmsShowed);
    setMovies(spliceFilms);
  }

  async function handleGetMovies(inputSearch) {
    setMoviesSwitch(false);
    localStorage.setItem('filmsTumbler', false);

    if (!inputSearch) {
      setErrorInfo('Нужно ввести ключевое слово');
      return false;
    }

    setErrorInfo('');
    setPreloader(true);

    try {
      const data = await getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      localStorage.setItem('films', JSON.stringify(filterData));
      localStorage.setItem('filmsInputSearch', inputSearch);

      const spliceData = filterData.splice(0, moviesCount[0]);
      setMoviesShowed(spliceData);
      setMovies(filterData);
      setMoviesShowedWithSwitch(spliceData);
      setMoviesWithSwitch(filterData);
    } catch (err) {
      setErrorInfo(
        'Произошла ошибка. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
    } finally {
      setPreloader(false);
    }
  }

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];

    if (tumbler) {
      setMoviesShowedWithSwitch(moviesShowed);
      setMoviesWithSwitch(movies);
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40);
      filterData = movies.filter(({ duration }) => duration <= 40);
    } else {
      filterDataShowed = moviesShowedWithSwitch;
      filterData = moviesWithSwitch;
    }

    localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('filmsTumbler', tumbler);
    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  async function savedMoviesToggle(film, favorite) {
    if (favorite) {
      const objFilm = {
        image: 'https://api.nomoreparties.co/' + film.image.url,
        trailer: film.trailerLink,
        thumbnail: 'https://api.nomoreparties.co/' + film.image.url,
        movieId: film.id,
        country: film.country || 'Неизвестно',
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await addMovies(objFilm);
        const newSaved = await getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        openPopup('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await deleteMovies(film._id);
        const newSaved = await getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
   getMovies()
      .then((data) => {
        setMoviesSaved(data);
      })
      .catch((err) => {
        openPopup(`Ошибка: ${err}`);
      });

    const localStorageFilms = localStorage.getItem('films');

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]));
      setMovies(filterData);
      setPreloader(false);
    }

    const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
    const localStorageFilmsInputSearch = localStorage.getItem('filmsInputSearch');

    if (localStorageFilmsTumbler) {
      setMoviesSwitch(localStorageFilmsTumbler === 'true');
    }

    if (localStorageFilmsInputSearch) {
      setMoviesInputSearch(localStorageFilmsInputSearch);
    }
  }, [openPopup]);

  return (
    <main className="movies">
      <SearchForm 
        handleGetMovies={handleGetMovies} 
        filmsTumbler={moviesSwitch} 
        filmsInputSearch={moviesInputSearch} 
        handleGetMoviesTumbler={handleGetMoviesTumbler} 
      />
      {preloader && <Preloader />}
      {errorInfo && <div className="movies__text-error">{errorInfo}</div>}
      {!preloader && !errorInfo && movies !== null && moviesSaved !== null && moviesShowed !== null && (
        <MoviesCardList 
          handleMore={handleMore} 
          filmsRemains={movies} 
          films={moviesShowed} 
          savedMoviesToggle={savedMoviesToggle} 
          filmsSaved={moviesSaved} 
        />
      )}
    </main>
  );
}

export default Movies;