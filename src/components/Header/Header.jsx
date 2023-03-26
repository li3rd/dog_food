import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { Search } from '../Search/Search';
import {ReactComponent as Logo} from '../icons/logo.svg'
import {ReactComponent as Add} from '../icons/add.svg'
import {ReactComponent as Heart} from '../icons/heart.svg'
import {ReactComponent as Cart} from '../icons/cart.svg'
import {ReactComponent as Profile} from '../icons/profile.svg'
import { getUserToken, logOut } from '../../store/slices/user.slice';
import { clearCart, getCartProducts } from '../../store/slices/cart.slice';
import { clearFavorite, getFavoriteProducts } from '../../store/slices/favorite.slice';

import { Modal } from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';

import headerStyles from './Header.module.css'




export function Header() {
  const token = useSelector(getUserToken)
  const cartProductsAmount = useSelector(getCartProducts).length
  const favoriteProductsAmount = useSelector(getFavoriteProducts).length
  const dispatch = useDispatch()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const openAddModal = () => {
    if (!isAddModalOpen) setIsAddModalOpen(true)
  }
  const closeAddModal = () => {
    if (isAddModalOpen) setIsAddModalOpen(false)
  }
  const HideSearchBar = () => {
    const location = useLocation()
    if ((location.pathname === '/' || location.pathname === '/products') && token) return <Search />
    return null
  }

  const logOutHandler = () => {
    if (token) {
      dispatch(logOut())
      dispatch(clearCart())
      dispatch(clearFavorite())
    }
  }
  const ShowFavoriteAmount = () => {
    if (favoriteProductsAmount) return (
      <span style={{right: '14px'}} className={headerStyles.amount}>{favoriteProductsAmount}</span>
    ) 
    return null
  }
  const ShowCartAmount = () => {
    if (cartProductsAmount) return (
      <span className={headerStyles.amount}>{cartProductsAmount}</span>
    ) 
    return null
  }
  return (
    <>
      <div className={headerStyles.header}>
        <Link to="/">
          <Logo className={headerStyles.logo}/>
        </Link>
        <HideSearchBar />
        <nav className={headerStyles.navigation}>
          <ul className={headerStyles.navigation_list}>
            { token ? <>
              <li>
                <Link onClick={openAddModal}>
                  <span><Add className={headerStyles.add}/>
                  </span>
                  <span>Добавить</span>
                </Link>
              </li>
              <li>
                <Link to="/favorite">
                  <span><Heart className={headerStyles.heart}/>
                    <ShowFavoriteAmount />
                  </span>
                  <span>Избранное</span>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <span><Cart className={headerStyles.cart}/>
                    <ShowCartAmount />
                  </span>
                  <span>Корзина</span>
                </Link>
              </li></> : null}
            <li>
              <Link to="/signin" onClick={token ? logOutHandler : null}>
                <span><Profile className={headerStyles.profile}/></span>
                <span>{token ? 'Выйти' : 'Войти'}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Modal isOpen={isAddModalOpen} closeHandler={closeAddModal}>
        <ProductForm closeHandler={closeAddModal}/>
      </Modal>
    </>
  );
}
