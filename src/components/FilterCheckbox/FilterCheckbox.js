import './FilterCheckbox.css';

function FilterCheckbox() {

  return(
    <div className="tumbler">
      <label className="tumbler__label">
        <input className="tumbler__input" type="checkbox" name="short-film-tmblr" />
        <span className="tumbler__pseudo-input tumbler__pseudo-input_checked"></span>
        <span>Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;