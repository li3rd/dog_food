import { Link } from 'react-router-dom';


export function Header() {
  return (
    <div>
      <img alt="logo"></img>
      <input placeholder="поиск"></input>
      <nav>
        <ul>
          <li>
            <Link to="">избранное</Link>
          </li>
          <li>
            <Link to="">корзина</Link>
          </li>
          <li>
            <Link to="signin">авторизация</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
