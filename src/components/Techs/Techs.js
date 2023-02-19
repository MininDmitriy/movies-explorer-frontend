import "./Techs.css";

function Techs() {
  return (
    <section id="techs" className="techs main__techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      
      <ul className="techs__technology-list">
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">HTML</p>
        </li>
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">CSS</p>
        </li>
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">JS</p>
        </li>
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">React</p>
        </li>
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">Git</p>
        </li>
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">Express.js</p>
        </li>
        <li className="techs__technology">
          <p className="techs__name-technology" lang="en">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
