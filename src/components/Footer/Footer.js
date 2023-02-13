import "./Footer.css";

function Footer() {
  return (
    <footer className="footer root__footer">
      <div className="footer__name-of-project">
        <p className="footer__text footer__text_color_gray">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>      
      <div className="footer__info-about-project-container">
        <p className="footer__text footer__text_color-copyright_grey footer__text_location">&#169; 2022</p>
        <div className="footer__other-info-container">
          <p className="footer__text">Яндекс.Практикум</p>
          <p className="footer__text" lang="en">Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;