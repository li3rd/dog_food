import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './AuthNavBar.module.css'

export function AuthNavBar() {

  return (
    <div>
      <NavLink className={({isActive}) => classNames({[styles.activeLink]: isActive})} to={'/signin'}>
        Войти</NavLink>
      <NavLink className={({isActive}) => classNames({[styles.activeLink]: isActive})} to={'/signup'}>
        Зарегистрироваться</NavLink>
    </div>
  )
}