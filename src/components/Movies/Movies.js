import "../SavedMovies/SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <section className="saved-movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <input aria-label="Load button" className="movies__button" value="Ещё" />
      <Footer />
    </section>
  );
}

export default Movies;