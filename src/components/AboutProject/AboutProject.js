import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about-project" className="about-project main__about-project">
      <h2 className="about-project__title">О проекте</h2>
      <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
      <p className="about-project__text about-project_text_location">
      Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
      </p>
      <h3 className="about-project__subtitle about-project__subtitle_margin">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>      
      <p className="about-project__text">
      У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
      </p>

      <div className="about-project__graph">
        <p className="about-project__graph-timeline">1 неделя</p>
        <p className="about-project__graph-timeline about-project__graph-timeline_background-color_white">4 недели</p>
        <p className="about-project__graph-text" lang="en">Back-end</p>
        <p className="about-project__graph-text" lang="en">Front-end</p>
      </div>
      
    </section>
  );
}

export default AboutProject;
