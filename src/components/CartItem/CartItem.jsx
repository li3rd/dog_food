import { useDispatch } from 'react-redux'

import {deleteProduct, selectProduct } from '../../store/slices/cart.slice'
import { GroupButton } from '../GroupButton/GroupButton'
import productStyles from '../ProductCard/ProductCard.module.css'
import { getCalcPrice } from '../utils/productsUtils'

import itemStyles from './CartItem.module.css'




export function CartItem({id, name, stock, price, pictures, discount, wight, count, isChecked}) {
  const dispatch = useDispatch()
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
      <div className={itemStyles.image}><img src={pictures} alt="" /></div>
      <div className={itemStyles.description}>
        <p>{name}, {wight}</p>
        <div style={{display: 'flex'}}>
          <GroupButton 
            stock={stock}
            id={id}
            count={count}
          />
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