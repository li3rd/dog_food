import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {deleteProduct, selectProduct } from '../../store/slices/cart.slice'
import { changeFavoriteProduct, getFavoriteProducts } from '../../store/slices/favorite.slice'
import { GroupButton } from '../GroupButton/GroupButton'
import productStyles from '../ProductCard/ProductCard.module.css'
import { getCalcPrice } from '../utils/productsUtils'

import itemStyles from './CartItem.module.css'




export function CartItem({id, name, stock, price, pictures, discount, wight, count, isChecked}) {
  const dispatch = useDispatch()
  const favorite = useSelector(getFavoriteProducts)
  const isFavorite = favorite.find(el => el.id === id) ? true : false

  if (!name) {
    return (
      <div className={itemStyles.wrapper}>
        <h3>Товар не найден</h3>
        <span onClick={() => dispatch(deleteProduct(id))}>Удалить</span>
      </div>
    )}

  const ShowDiscount = () => {
    if (discount !== 0) {return (
      <span className={productStyles.price}>{price*count} &#8381;</span>
    )} return null
  }

  return (
    <div className={itemStyles.wrapper}>
      <div>
        <input checked={isChecked} onChange={() => dispatch(selectProduct(id))} type="checkbox"></input>
      </div>
      <Link to={`/products/${id}`}><div className={itemStyles.image}><img src={pictures} alt="" /></div></Link>
      <div className={itemStyles.description}>
        <p>{name}, {wight}</p>
        <div style={{display: 'flex'}}>
          <GroupButton 
            stock={stock}
            id={id}
            count={count}
          />
          <span className={classNames(itemStyles.addFavorite, {[itemStyles.isFavorite]: isFavorite})} 
            onClick={() => dispatch(changeFavoriteProduct(id))}>{isFavorite ? 'В избранном' : 'В избранное' }</span>
          <span onClick={() => dispatch(deleteProduct(id))}>Удалить</span>
        </div>
      </div>
      <div className={itemStyles.price}>
        <ShowDiscount />
        <span>{getCalcPrice(price, discount)*count} &#8381;</span>
      </div>
    </div>
  )
}