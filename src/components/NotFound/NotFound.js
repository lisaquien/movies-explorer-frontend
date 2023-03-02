import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return(
    <div className="not-found">
      <div className="not-found__container">
        <p className="not-found__code">404</p>
        <p className="not-found__message">Страница не найдена</p>
        <Link to={-1} className="not-found__link">Назад</Link>
      </div>
    </div>
  );
}

export default NotFound;