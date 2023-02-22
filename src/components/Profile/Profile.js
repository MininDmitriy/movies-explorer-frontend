import "./Profile.css";
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { changeProfile } from "../../utils/MainApi";

function Profile({ onSignOut, openPopup }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = useState(false);

  const handlerSubmit = (evt) => {
    evt.preventDefault();

    changeProfile({ newName: name, newEmail: email })
      .then(() => {
        setVisibleButton(false);
        setLastName(name);
        setLastEmail(email);
        openPopup('Данные успешно изменены');
      })
      .catch((err) => {
        console.log(err);
        openPopup('Что-то пошло не так');
      });
  };

  function handlerChangeName(evt) {
    const value = evt.target.value;
    setName(value);

    if (value !== lastName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handlerChangeEmail(evt) {
    const value = evt.target.value;    
    setEmail(value);

    if (value !== lastEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  return (
    <section className="profile page__profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form" onSubmit={handlerSubmit}>

        <div className="profile__container-inputs">
          <div className="profile__conainer-name">
            <h3 className="profile__subtitle">Имя</h3>
            <input 
              type="text" 
              name="name"
              className="profile__input-info" 
              value={name} 
              onChange={handlerChangeName}
              required 
            />
          </div>

          <div className="profile__conainer-email">
            <h3 className="profile__subtitle" lang="en">E-mail</h3>
            <input 
              type="email" 
              name="email"
              className="profile__input-info" 
              value={email} 
              onChange={handlerChangeEmail} 
              required
            />
          </div>
        </div>
         
        <button 
          aria-label="Redact button" 
          className={`${isVisibleButton ? "profile__button-redact" : "profile__button-redact_inactive"}`} 
          disabled={!isVisibleButton}
        >Редактировать
        </button>

        <button 
          aria-label="Logout button" 
          className="profile__button-logout" 
          type="button" 
          onClick={onSignOut}
        >Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;