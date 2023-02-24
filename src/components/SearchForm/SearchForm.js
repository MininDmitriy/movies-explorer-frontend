import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleGetMovies, moviesSwitch, moviesInputSearch, handleGetMoviesTumbler }) {
  const [inputSearch, setInputSearch] = useState('');
  const [tumbler, setTumbler] = useState(false);
  const { pathname } = useLocation();

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }
  
  function handleTumblerChange() {
    setTumbler(!tumbler);

    if (pathname === "/movies") {
      handleGetMoviesTumbler(tumbler);
    } else if (pathname === "/saved-movies") {
      handleGetMoviesTumbler(inputSearch, tumbler);
    }
  }

  useEffect(() => {
    setTumbler(!moviesSwitch);
    setInputSearch(moviesInputSearch);
  }, [moviesSwitch, moviesInputSearch]);

  return (
    <section className="search-form page__search-form">
      
      <form className="search-form__form" name="form-search-form">
        <input 
          type="text" 
          name="search-text" 
          className="search-form__input" 
          placeholder="Фильм" 
          value={inputSearch || ''} 
          onChange={handleInputChange}
          required
        />
        <button 
          aria-label="Search button" 
          className="search-form__button-search" 
          type="submit" 
          value=""
          onClick={handleSubmit}
        ></button>
      </form>

      <div className="search-form__container-checkbox">
        <button 
          aria-label="Search checkbox" 
          className={`
            ${!tumbler 
              ? 
              "search-form__slider-checkbox_position_right"
              :
              "search-form__slider-checkbox_position_left"
            }`} 
          onClick={handleTumblerChange}></button>
        <p className="search-form__title-checkbox">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;