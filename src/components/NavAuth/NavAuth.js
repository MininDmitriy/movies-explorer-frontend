import "./NavAuth.css";
import { Link } from "react-router-dom";

const NavAuth = () => {

  return (
    <section className="header__container">
      <Link className="header__logo" to="/"></Link>
      <div className="header__registration-and-login-links-container">
        <Link className="header__registration-link" to="/signup">Регистрация</Link>
        <Link className="header__login-link" to="/signin">Войти</Link>
      </div>
    </section>
  );
}

export default NavAuth;