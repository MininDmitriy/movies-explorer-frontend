import "./SearchForm.css";
import { useState } from "react";

function SearchForm() {
  const [shortFilms, setShortFilms] = useState(false);

  const handlerCheckBox = () => {
    setShortFilms(!shortFilms);
  }

  return (
    <section className="search-form page__search-form">
      <form className="search-form__form" name="form-search-form">
        <input type="text" name="search-text" className="search-form__input" placeholder="Фильм" />
        <button aria-label="Search button" className="search-form__button-search" type="submit" value=""></button>
      </form>
      <div className="search-form__container-checkbox">
        <button aria-label="Search checkbox" className={`${shortFilms ? "search-form__slider-checkbox_position_right" : "search-form__slider-checkbox_position_left"}`} onClick={handlerCheckBox}></button>
        <h2 className="search-form__title-checkbox">Короткометражки</h2>
      </div>
    </section>
  );
}

export default SearchForm;