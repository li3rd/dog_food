import classNames from 'classnames'
import { useState } from 'react'

import {ReactComponent as Heart} from '../icons/heart.svg'

import productStyles from './ProductCard.module.css'


export function ProductCard({id, name, stock, price, pictures, discount, wight}) {

  const [liked, setLiked] = useState(false)
  const isDiscount = discount !== 0

  const heartHandler = () => {
    setLiked((prev) => !prev)
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
        <Heart onClick={heartHandler} className={classNames([productStyles.likes], {[productStyles.liked]: liked})}/>
      </div>
      <div className={productStyles.description_wrapper}>
        <span>В наличии: {stock} шт</span>
        <p>{name}, {wight}</p>
      </div>
      <div className={productStyles.price_wrapper}>
        <span>{price} &#8381;</span>
        <button>В корзину</button>
      </div>
    </div>
  )
}