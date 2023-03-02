import React from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';
import Media from 'react-media'
import './Header.css';
import Logo from '../Logo/Logo';

function Header(props) {
  const { loggedIn } = props;

  const location = useLocation();
  const navigate = useNavigate();

  function toLoginPage() {
    navigate('/sign-in');
  }

  function toProfilePage() {
    navigate('/profile');
  }

  const headerMain = location.pathname === "/" && "header_color_grey";
  const headerMoviePages = (location.pathname === "/movies" || location.pathname === "/saved-movies") && "header_color_light-grey";
  
  const filmPagesLinksActive = ({isActive}) => isActive ? "film-pages__link page-link_active" : "film-pages__link";

  return(
    <header className={`header ${headerMain} ${headerMoviePages}`} >
      <div className="header__container">
        <Logo />
        {!loggedIn && (
          <div className="auth-forms">
            <Link to="/sign-up" className="auth-forms__link">Регистрация</Link>
            <button className="auth-forms__button" aria-label="Кнопка Войти" onClick={toLoginPage}>Войти</button>
          </div>
        )}
        {loggedIn && <Media queries={{
          desktop: "(min-width: 769px)",
          mobile: "(max-width: 768px)"
        }}>
          {matches => (
            <>
              {matches.desktop && (
                <>
                  <div className="film-pages">
                    <NavLink to="/movies" className={filmPagesLinksActive}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={filmPagesLinksActive}>Сохраненные фильмы</NavLink>
                  </div>
                  <div className="account-link">
                    <label className="account-link__label">Аккаунт
                      <button className="account-link__button" type="button" onClick={toProfilePage}></button>
                    </label>
                  </div>
                </>
              )}
              {matches.mobile && (
                <div className="links-menu">
                  <label className="links-menu__container">
                    <input className="links-menu__input" type="checkbox" />
                    <span className="links-menu__pseudo-input links-menu__pseudo-input_checked"></span>
                  </label>
                  <div className="popup popup_opened">
                    <ul className="links-menu__items">
                      <div className="links-menu__items-container">
                        <li className="links-menu__item">
                          <NavLink to="/" className={filmPagesLinksActive}>Главная</NavLink>
                        </li>
                        <li className="links-menu__item">
                          <NavLink to="/movies" className={filmPagesLinksActive}>Фильмы</NavLink>
                        </li>
                        <li className="links-menu__item">
                          <NavLink to="/saved-movies" className={filmPagesLinksActive}>Сохраненные фильмы</NavLink>
                        </li>
                        <li className="links-menu__item">
                          <label className="account-link__label">Аккаунт
                            <button className="account-link__button" type="button" onClick={toProfilePage}></button>
                          </label>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </Media>
        }
      </div>
    </header>
  );
}

export default Header;