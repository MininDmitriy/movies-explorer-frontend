import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio main__portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolion__navigation">
        <il className="portfolio__item">
          <Link className="portfolio__link" to={{ pathname: "https://github.com/MininDmitriy/how-to-learn" }} target="_blank"><h3 className="portfolio__subtitle">Статичный сайт</h3><p className="portfolio__symbol">&#129125;</p></Link>
        </il>
        <il className="portfolio__item">
          <Link className="portfolio__link" to={{ pathname: "https://github.com/MininDmitriy/russian-travel" }} target="_blank"><h3 className="portfolio__subtitle">Адаптивный сайт</h3><p className="portfolio__symbol">&#129125;</p></Link>
        </il>
        <il className="portfolio__item portfolio__item_border_none">
          <Link className="portfolio__link" to={{ pathname: "https://github.com/MininDmitriy/react-mesto-api-full" }} target="_blank"><h3 className="portfolio__subtitle portfolio__subtitle_margin_none">Одностраничное приложение</h3><p className="portfolio__symbol">&#129125;</p></Link>
        </il>
      </ul>
    </section>
  );
}

export default Portfolio;