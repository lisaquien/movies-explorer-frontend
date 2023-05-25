import React, { useCallback } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import FormInput from '../FormInput/FormInput';

function SearchForm(props) {
  const { query, shortsToggleSwitch, onInputChange, onToggleChange, onSubmit, } = props;

  const submitSearchForm = useCallback((e) => {
    e.preventDefault();
    onSubmit(query);
  }, [onSubmit, query]);

  return(
    <>
      <div className="search-form">
        <form className="form form_search" noValidate onSubmit={submitSearchForm} >
          <FormInput
            componentName="search"
            id="search-input"
            type="search"
            name="search"
            placeholder="Фильм"
            required="required"
            onChange={onInputChange}
            value={query || ''}
            autoFocus
          />
          <button className="search-form__button search-form__button_color_grey" type="submit" />
          <button className="search-form__button search-form__button_color_blue" type="submit" />
        </form>
      </div>
      < FilterCheckbox onChange={onToggleChange} shortsToggleSwitch={shortsToggleSwitch} />
    </>
  );
}

export default SearchForm;