import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logo.css';

function Logo() {
  const navigate = useNavigate();

  function toMainPage() {
    navigate('/');
  }

  return(
    <button className="header__logo" type="button" onClick={toMainPage} />
  );
}

export default Logo;