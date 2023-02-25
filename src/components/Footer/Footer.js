import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__textline">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <ul className="footer__container">
        <li className="footer__copyright">&copy;2023</li>
        <div className="footer__links">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/lisaquien" target="_blank" rel="noreferrer">Github</a>
          </li>
        </div>
      </ul>
    </footer>
  );
}

export default Footer;