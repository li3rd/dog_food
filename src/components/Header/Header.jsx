import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../context/AppContextProvider';

import {ReactComponent as Logo} from '../icons/logo.svg'
import {ReactComponent as Heart} from '../icons/heart.svg'
import {ReactComponent as Cart} from '../icons/cart.svg'
import {ReactComponent as Profile} from '../icons/profile.svg'

import headerStyles from './Header.module.css'



export function Header() {

  const {token, setToken} = useContext(AppContext)
  const logOutHandler = () => {
    if (token) {
      setToken('')
    }
  }
  return (
    <div className={headerStyles.header}>
      <Link to="/">
        <Logo className={headerStyles.logo}/>
      </Link>
      <input placeholder="поиск"></input>
      <nav className={headerStyles.navigation}>
        <ul className={headerStyles.navigation_list}>
          <li>
            <Link to="">
              <span><Heart className={headerStyles.heart} /></span>
              <span>Избранное</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <span><Cart className={headerStyles.cart}/></span>
              <span>Корзина</span>
            </Link>
          </li>
          <li>
            <Link to="/signin" onClick={token ? logOutHandler : null}>
              <span><Profile className={headerStyles.profile}/></span>
              <span>{token ? 'Выйти' : 'Войти'}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
