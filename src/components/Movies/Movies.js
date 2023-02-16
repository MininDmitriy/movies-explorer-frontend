import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <main className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <input aria-label="Load button" className="movies__button" value="Ещё" />
      <Footer />
    </main>
  );
}

export default Movies;