import './Promo.css';
import logoPromo from '../../images/logo-landing.svg';

function Promo() {

  function toAboutProject() {
    window.location.href = '#about-project';
  }
  
  return(
    <section className="promo">
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      <p className="promo__subheading">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <button className="promo__button" type="button" aria-label="Кнопка Узнать больше" onClick={toAboutProject}>Узнать больше</button>
      <img className="promo__logo" src={logoPromo} alt="Лого лендинга" />
    </section>
  );
}

export default Promo;