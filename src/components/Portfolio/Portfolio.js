import './Portfolio.css';

function Portfolio() {
  return(
    <section className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__item-link" href="https://github.com/lisaquien/how-to-learn" target="_blank" rel="noreferrer">
            <p className="portfolio__project">Статичный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__item-link" href="https://github.com/lisaquien/russian-travel" target="_blank" rel="noreferrer">
            <p className="portfolio__project">Адаптивный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__item-link" href="https://github.com/lisaquien/react-mesto-api-full" target="_blank" rel="noreferrer">
            <p className="portfolio__project">Одностраничное приложение</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;