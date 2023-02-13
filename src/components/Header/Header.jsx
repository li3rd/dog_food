import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {ReactComponent as Logo} from '../icons/logo.svg'
import {ReactComponent as Heart} from '../icons/heart.svg'
import {ReactComponent as Cart} from '../icons/cart.svg'
import {ReactComponent as Profile} from '../icons/profile.svg'
import { getUserToken, logOut } from '../../store/slices/user.slice';
import { clearCart, getCartProducts } from '../../store/slices/cart.slice';

import headerStyles from './Header.module.css'




export function Header() {
  const token = useSelector(getUserToken)
  const cartProductsAmount = useSelector(getCartProducts).length
  const dispatch = useDispatch()
  
  const logOutHandler = () => {
    if (token) {
      dispatch(logOut())
      dispatch(clearCart())
    }
  }
  const ShowAmount = () => {
    if (cartProductsAmount) return (
      <span className={headerStyles.amount}>{cartProductsAmount}</span>
    ) 
    return null
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
            <Link to="/cart">
              <span><Cart className={headerStyles.cart}/>
                <ShowAmount />
              </span>
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
