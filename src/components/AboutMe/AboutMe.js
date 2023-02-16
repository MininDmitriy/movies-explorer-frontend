import "./AboutMe.css";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section id="student" className="about-me main__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__photo"></div>
      <h3 className="about-me__name">Дмитрий</h3>
      <p className="about-me__subtitle">Фронтенд-разработчик, 33 года</p>
      <p className="about-me__info-me">Я родился в Новотроицке и живу в Москве, закончил инженерно-технологический факультет РХТУ им. Менделеева. Я люблю слушать музыку, а ещё увлекаюсь спортом. Недавно начал кодить и удаленно посещать курсы Яндекс.Практикума. С 2011 года работал в государственных компаниях, входящих в ГК Ростех. После того, как пройду курс по веб-разработке, планирую сменить работу или заниматься фриланс-заказами.</p>
      <Link className="about-me__link-to-github" to={{ pathname: "https://github.com/MininDmitriy" }} target="_blank" lang="en">Github</Link>
    </section>
  );
}

export default AboutMe;