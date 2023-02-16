import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <section className="navigation">
      <Link className="navigation__logo" to="/"></Link>
      <div className="navigation__container">
        <div className="navigation__movies-links-container">
          <Link className="navigation__movies" to="/movies">Фильмы</Link>
          <Link className="navigation__saved-movies" to="/saved-movies">Сохранённые фильмы</Link>
        </div>
        <Link className="navigation__account-link" to="/profile">Аккаунт</Link>
      </div>
    </section>        
  );
}

export default Navigation;