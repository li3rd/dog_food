import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'

import { addProductToCart, removeProductFromCart } from '../../store/slices/cart.slice'

import s from './GroupButton.module.css'



export function GroupButton ({count, id, stock}) {
  const dispatch = useDispatch()
  return (
    <div className={s.buttonContainer}>
      <button 
        onClick={() => dispatch(removeProductFromCart(id))}>
        {count === 1 ? <FontAwesomeIcon icon={faTrashCan} /> : <FontAwesomeIcon icon={faMinus}/>}
      </button>
      <span>{count}</span>
      <button 
        disabled={count >= stock} onClick={() => dispatch(addProductToCart(id))}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}