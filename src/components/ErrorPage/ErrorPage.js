import "./ErrorPage.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="error-page__container root__error-page">
      <h2 className="error-page__title">404</h2>
      <h3 className="error-page__subtitle">Страница не найдена</h3>
      <Link className="error-page__link" to="/">Назад</Link>
    </section>
  );
}

export default ErrorPage;