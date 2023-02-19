import "./Login.css";
import { Link } from "react-router-dom";
import { useFormWithValidation} from "../../hooks/useFormWithValidation";

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);
    resetForm();
    console.log({values});
  }

  return (
    <section className="authenticate__container page__authenticate">
      <Link className="authenticate__logo" to="/"></Link>
      <h2 className="authenticate__title">Рады видеть!</h2>
      <form 
        className="authenticate__form authenticate__form-autorization" 
        name="form-autorization" 
        onSubmit={onSubmit}>

        <label className="authenticate__label" lang="en">E-mail</label>
        <input 
          type="email" 
          name="email" 
          className="authenticate__input" 
          minLength="2" 
          maxLength="40" 
          value={values.email || ""} 
          onChange={handleChange} 
          required 
        />
        <span className="authenticate__input-error-text">{errors.email || ""}</span>

        <label className="authenticate__label">Пароль</label>
        <input 
          type="password" 
          name="password" 
          className="authenticate__input" 
          minLength="2" 
          maxLength="40" 
          value={values.password || ""} 
          onChange={handleChange} 
          required 
        />
        <span className="authenticate__input-error-text">{errors.password || ""}</span>

        <input 
          aria-label="Login button" 
          className={`${isValid ? "authenticate__button-save" : "authenticate__button-save_state_inactive"}`} 
          type="submit" 
          value="Войти" 
          disabled={isValid} 
        />
        <p className="authenticate__text">
          Ещё не зарегистрированы? 
          <Link className="authenticate__link" to="/signup">Регистрация</Link>
        </p>
        
      </form>
    </section>
  );
}

export default Login; 