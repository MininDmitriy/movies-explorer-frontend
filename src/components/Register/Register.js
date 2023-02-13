import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="registration__container root__registration">
      <Link className="registration__logo" to="/"></Link>
      <h2 className="registration__title">Добро пожаловать!</h2>
      <form className="registration__form registration__form-registration" name="form-registration" noValidate>
        <label for="user-name" className="registration__label">Имя</label>
        <input id="user-name" type="text" name="user-name" className="registration__input" minLength="2" maxLength="40" />
        <span className="registration__input-error-text"></span>
        <label for="email" className="registration__label" lang="en">E-mail</label>
        <input id="email" type="email" name="email" className="registration__input" minLength="2" maxLength="40" />
        <span className="registration__input-error-text"></span>
        <label for="password" className="registration__label">Пароль</label>
        <input id="password" type="password" name="password" className="registration__input" minLength="2" maxLength="40" required />
        <span className="registration__input-error-text"></span>
        <input aria-label="Login button" className="registration__button-save" type="submit" value="Зарегистрироваться" />
        <p className="registration__text">Уже зарегистрированы? <Link className="registration__link" to="/signin">Войти</Link></p>
      </form>
    </section>
  );
}

export default Register;