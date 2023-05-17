import './FilterCheckbox.css';

function FilterCheckbox({ onChange, shortsToggleSwitch }) {

  return(
    <div className="tumbler">
      <label className="tumbler__container">
        <input className="tumbler__input" type="checkbox" name="short-film-tmblr" checked={shortsToggleSwitch ? true : false} onChange={onChange} />
        <span className={`tumbler__pseudo-input ${shortsToggleSwitch ? "tumbler__pseudo-input_checked" : null}`}></span>
        <span className="tumbler__label">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;