import './AboutProject.css';

function AboutProject() {
  return(
    <section className="about-project" id="about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <ul className="about-project__columns">
        <li className="about-project__column">
          <h3 className="about-project__column-heading">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__column-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__column">
          <h3 className="about-project__column-heading">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__column-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__stats">
        <li className="about-project__stat">
          <p className="about-project__bar about-project__bar_color_blue">1 неделя</p>
          <p className="about-project__bar-title">Back-end</p>
        </li>
        <li className="about-project__stat">
          <p className="about-project__bar about-project__bar_color_grey">4 недели</p>
          <p className="about-project__bar-title">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;