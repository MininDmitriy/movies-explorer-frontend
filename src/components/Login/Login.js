import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="authenticate__container root__authenticate">
      <Link className="authenticate__logo" to="/"></Link>
      <h2 className="authenticate__title">Рады видеть!</h2>
      <form className="authenticate__form authenticate__form-autorization" name="form-autorization" noValidate>
        <label for="email" className="authenticate__label" lang="en">E-mail</label>
        <input id="email" type="email" name="email" className="authenticate__input" minLength="2" maxLength="40" />
        <span className="authenticate__input-error-text"></span>
        <label for="password" className="authenticate__label">Пароль</label>
        <input id="password" type="password" name="password" className="authenticate__input" minLength="2" maxLength="40" required />
        <span className="authenticate__input-error-text"></span>
        <input aria-label="Login button" className="authenticate__button-save" type="submit" value="Войти" />
        <p className="authenticate__text">Ещё не зарегистрированы? <Link className="authenticate__link" to="/signup">Регистрация</Link></p>
      </form>
    </section>
  );
}

export default Login;