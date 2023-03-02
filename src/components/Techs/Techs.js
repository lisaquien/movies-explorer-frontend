import './Techs.css';

function Techs() {
  const techList = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB']

  return(
    <section className="techs">
      <h2 className="techs__heading">Технологии</h2>
      <h3 className="techs__subheading">7 технологий</h3>
      <p className="techs__caption">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__items">
        {
          techList.map((tech, i) => {
            return(<li className="techs__item" key={i}>{tech}</li>)
          })
        }
      </ul>
    </section>
  );
}

export default Techs;