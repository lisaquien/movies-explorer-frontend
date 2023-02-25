import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function PageLayout(props) {
  const { loggedIn } = props;
  
  const location = useLocation();

  return(
    <>
      <Header loggedIn={loggedIn} />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
    </>
  )
};

export default PageLayout;