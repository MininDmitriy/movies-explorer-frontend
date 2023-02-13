import "./SearchForm.css";
import { useState } from "react";

function SearchForm() {
  const [shortFilms, setShortFilms] = useState(false);

  const handlerCheckBox = () => {
    setShortFilms(!shortFilms);
  }

  return (
    <section className="search-form root__search-form">
      <form className="search-form__form" name="form-search-form" noValidate>
        <input type="text" name="search-text" className="search-form__input" placeholder="Фильм" />
        <button aria-label="Search button" className="search-form__button-search" type="submit" value=""></button>
      </form>
      <div className="search-form__container-checkbox">
        <button aria-label="Search checkbox" className={`${shortFilms ? "search-form__checkbox_active" : "search-form__checkbox_inactive"}`} onClick={handlerCheckBox}></button>
        <h2 className="search-form__title-checkbox">Короткометражки</h2>
      </div>
    </section>
  );
}

export default SearchForm;