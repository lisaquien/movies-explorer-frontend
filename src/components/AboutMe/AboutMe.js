import React from 'react';
import './AboutMe.css';
import photoStudent from '../../images/student-img.png';

function AboutMe() {
  return(
    <section className="student">
      <h2 className="student__heading">Студент</h2>
      <div className="student__info">
        <img className="student__image" alt="фото студента" src={photoStudent} />
        <p className="student__name">Виталий</p>
        <p className="student__occupation">Фронтенд-разработчик, 30 лет</p>
        <p className="student__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className="student__portfolio-link" href="https://github.com/lisaquien" target="_blank" rel="noreferrer">Github</a>
      </div>
    </section>
  );
}

export default AboutMe;