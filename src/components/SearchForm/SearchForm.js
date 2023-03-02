import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import FormInput from '../FormInput/FormInput';

function SearchForm() {
  return(
    <>
      <div className="search-form">
        <form className="form form_search">
          <FormInput
            componentName="search"
            id="search-input"
            type="search"
            name="search"
            placeholder="Фильм"
            required="required"
          />
          <button className="search-form__button search-form__button_color_grey" type="submit" />
          <button className="search-form__button search-form__button_color_blue" type="submit" />
        </form>
      </div>
      < FilterCheckbox />
    </>
  );
}

export default SearchForm;