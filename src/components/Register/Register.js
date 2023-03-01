import "./Register.css";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const onSubmit = (evt) => {
    evt.preventDefault();
    
    onRegister(values.email, values.password, values.name);
    resetForm();
  }

  return (
    <section className="registration__container page__registration">
      <Link className="registration__logo" to="/"></Link>
      <h2 className="registration__title">Добро пожаловать!</h2>
      <form 
        className="registration__form registration__form-registration" 
        name="form-registration" 
        onSubmit={onSubmit}
        noValidate>

        <label className="registration__label">Имя</label>
        <input 
          type="text" 
          name="name" 
          className="registration__input" 
          minLength="2" 
          maxLength="40" 
          value={values.name || ""} onChange={handleChange} 
          required 
        />
        <span className="registration__input-error-text">{errors.name || ""}</span>
        
        <label className="registration__label" lang="en">E-mail</label>
        <input 
          type="email" 
          name="email" 
          className="registration__input" 
          minLength="2" 
          maxLength="40" 
          value={values.email || ""} 
          onChange={handleChange} 
          required 
        />
        <span className="registration__input-error-text">{errors.email || ""}</span>
        
        <label className="registration__label">Пароль</label>
        <input 
          type="password" 
          name="password" 
          className="registration__input" 
          minLength="2" 
          maxLength="40" 
          value={values.password || ""} 
          onChange={handleChange} 
          required 
        />
        <span className="registration__input-error-text">{errors.password || ""}</span>

        <button 
          aria-label="Register button" 
          className={`${isValid ? "registration__button-save" : "registration__button-save_state_inactive"}`}
          type="submit" 
          disabled={!isValid ? true : ''}
        >Зарегистрироваться</button>
        <p className="registration__text">
          Уже зарегистрированы?
          <Link className="registration__link" to="/signin">Войти</Link>
        </p>
        
      </form>
    </section>
  );
}

export default Register;
