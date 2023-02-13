import "./HamburgerMenu.css";
import { NavLink, Link } from "react-router-dom";

function HamburgerMenu({isOpenMenu, onClick}) {
  return (
    <section className="burger-menu">
      <Link className="burger-menu__logo" to="/"></Link>

      <div className={`burger-menu__overlay ${isOpenMenu ? "burger-menu__overlay_active" : ""}`}></div>

      <div className={`burger-menu__container ${isOpenMenu ? "burger-menu__container_active" : ""}`} onClick={onClick}></div>
      
      <nav className={`burger-menu__movies-links-container ${isOpenMenu ? "burger-menu__movies-links-container_active" : ""}`}>
        <ul className="burger-menu__list">
          <li className="burger-menu__item">
            <NavLink to="/" className={({isActive}) => `burger-menu__link ${isActive ? "burger-menu__link_active" : ""}`}>Главная</NavLink>
          </li>
          <li className="burger-menu__item">
            <NavLink to="/movies" className={({isActive}) => `burger-menu__link ${isActive ? "burger-menu__link_active" : ""}`}>Фильмы</NavLink>
          </li>
          <li className="burger-menu__item">
            <NavLink to="/saved-movies" className={({isActive}) => `burger-menu__link ${isActive ? "burger-menu__link_active" : ""}`}>Сохранённые фильмы</NavLink>
          </li>
          <li className="burger-menu__item">
            <NavLink to="/profile" className="burger-menu__link-acсount">Аккаунт</NavLink>
          </li>
        </ul>
      </nav>

    </section>
  );
}

export default HamburgerMenu;