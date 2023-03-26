import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { addProductToCart, getCartProducts } from '../../store/slices/cart.slice'
import { changeFavoriteProduct, getFavoriteProducts } from '../../store/slices/favorite.slice'
import { GroupButton } from '../GroupButton/GroupButton'

import {ReactComponent as Heart} from '../icons/heart.svg'
import { getCalcPrice } from '../utils/productsUtils'

import productStyles from './ProductCard.module.css'


export function ProductCard({id, name, stock, price, pictures, discount, wight}) {

  
  const cart = useSelector(getCartProducts)
  const favorite = useSelector(getFavoriteProducts)
  const dispatch = useDispatch()
  
  const isDiscount = discount !== 0
  const liked = (id) => favorite.find(item => item.id === id) ? true : false

  const addToCartHandler = (ev) => {
    ev.preventDefault()
    dispatch(addProductToCart(id))
  }
  const ShowButtons = ({id, stock}) => {
    const isChosenItem = cart.some(item => item.id === id)
    if (isChosenItem) {
      const item = cart.find(item => item.id === id)
      return <GroupButton {...item} stock={stock} />}
    return <button onClick={addToCartHandler}>В корзину</button>
  }

  const ShowDiscount = () => {
    if (isDiscount) {return (
      <span className={productStyles.price}>{price} &#8381;</span>
    )} return null
  }
  const heartHandler = (ev) => {
    ev.preventDefault()
    dispatch(changeFavoriteProduct(id))
  }
  return (
    <div className={productStyles.container}>
      <div className={productStyles.discount_wrapper}>
        <div className={classNames([productStyles.no_discount], {[productStyles.discount]: isDiscount})}>
          <span>{isDiscount ? `-${discount}%` : null}</span>
        </div>
      </div>
      <div className={productStyles.image}>
        <img src={pictures} alt=""/>
        <Heart 
          onClick={heartHandler} 
          className={classNames([productStyles.likes], {[productStyles.liked]: liked(id)})}/>
      </div>
      <div className={productStyles.description_wrapper}>
        <span>В наличии: {stock} шт</span>
        <p>{name}, {wight}</p>
      </div>
      <div className={productStyles.price_wrapper}>
        <ShowDiscount />
        <span>{getCalcPrice(price, discount)} &#8381;</span>
        <ShowButtons id={id} stock={stock}/>
      </div>
    </div>
  )
}