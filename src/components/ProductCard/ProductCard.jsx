import {ReactComponent as Heart} from '../icons/heart.svg'

import productStyles from './ProductCard.module.css'


export function ProductCard({id, name, stock, price, pictures}) {

  return (
    <div className={productStyles.container}>
      <div className={productStyles.image}>
        <img src={pictures} alt=""/>
        <Heart className={productStyles.likes}/>
      </div>
      <span>{stock} шт</span>
      <p>{name}</p>
      <span>{price} &#8381;</span>
      <button>В корзину</button>
    </div>
  )
}