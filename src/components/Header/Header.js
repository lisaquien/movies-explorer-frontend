import React from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';
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
  
  const filmPagesLinksActive = ({isActive}) => isActive ? "film-pages__link film-pages__link_active" : "film-pages__link";
  const accountPageLinkActive = location.pathname === "/profile" && "account-link__label_active";

  return(
    <header className={`header ${headerMain} ${headerMoviePages}`} >
      <div className="header__container">
        <Logo />
        {!loggedIn && (
          <div className="auth-forms">
            <Link to="/sign-up" className="auth-forms__link">Регистрация</Link>
            <button className="auth-forms__button" aria-label="Кнопка Войти" onClick={toLoginPage}>Войти</button>
          </div>
          )
        }
        {loggedIn && (
          <>
            <div className="film-pages">
              <NavLink to="/movies" className={filmPagesLinksActive}>Фильмы</NavLink>
              <NavLink to="/saved-movies" className={filmPagesLinksActive}>Сохраненные фильмы</NavLink>
            </div>
            <div className="account-link">
              <label className={`account-link__label ${accountPageLinkActive}`}>Аккаунт
                  <button className="account-link__button" type="button" onClick={toProfilePage}></button>
              </label>
            </div>
          </>
          )
        }
      </div>
    </header>
  );
}

export default Header;