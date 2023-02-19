import "./AboutMe.css";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section id="student" className="about-me main__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__photo"></div>
      <h3 className="about-me__name">Дмитрий</h3>
      <p className="about-me__subtitle">Фронтенд-разработчик, 33 года</p>
      <p className="about-me__info-me">
      Я&nbsp;родился в&nbsp;Новотроицке и&nbsp;живу в&nbsp;Москве, закончил инженерно-технологический факультет РХТУ им. Менделеева. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь спортом. Недавно начал кодить и&nbsp;удаленно посещать курсы Яндекс.Практикума. С&nbsp;2011 года работал в&nbsp;государственных компаниях, входящих в&nbsp;ГК&nbsp;Ростех. После того, как пройду курс по&nbsp;веб-разработке, планирую сменить работу или заниматься фриланс-заказами.
      </p>
      <Link className="about-me__link-to-github" to={{ pathname: "https://github.com/MininDmitriy" }} target="_blank" lang="en">Github</Link>
    </section>
  );
}

export default AboutMe; 