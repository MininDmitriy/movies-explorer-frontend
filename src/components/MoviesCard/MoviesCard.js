import "./MoviesCard.css";
import examplePicture from '../../images/example.jpg';

function MoviesCard() {
  return(
    <li className="card">
      <img className="card__image" src={examplePicture} alt="Обложка к фильму"/>
      <div className="card__body">
        <div className="card__container-info-card">
          <h2 className="card__title">Название карточки</h2>
          <button aria-label="Like or Delete" className="card__button" type="button"></button>
        </div>
      <p className="card__duration">Продолжительность фильма</p>
      </div>
    </li>
  );
}

export default MoviesCard; 