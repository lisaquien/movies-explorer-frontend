import './FilterCheckbox.css';

function FilterCheckbox() {

  return(
    <div className="tumbler">
      <label className="tumbler__container">
        <input className="tumbler__input" type="checkbox" name="short-film-tmblr" />
        <span className="tumbler__pseudo-input tumbler__pseudo-input_checked"></span>
        <span className="tumbler__label">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;