import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
  return (
    <>
      <Header />
      <section className="profile__container page__profile">
        <h2 className="profile__title">Привет, Дмитрий!</h2>
        <div className="profile__info-user">
          <h3 className="profile__subtitle-name">Имя</h3>
          <p className="profile__info-user-text-name">Дмитрий</p>
          <h3 className="profile__subtitle-email" lang="en">E-mail</h3>
          <p className="profile__info-user-text-email" lang="en">dbminin@yandex.ru</p>
        </div>
        <input aria-label="Redact button" className="profile__button-redact" value="Редактировать" />
        <input aria-label="Logout button" className="profile__button-logout" value="Выйти из аккаунта" />
      </section>
    </>
  );
}

export default Profile; 