import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { addProductToCart, removeProductFromCart } from '../../store/slices/cart.slice'

import s from './GroupButton.module.css'



export function GroupButton ({count, id, stock}) {
  const dispatch = useDispatch()

  const reduceAmountHandler = (ev) => {
    ev.preventDefault()
    dispatch(removeProductFromCart(id))
  }

  const increaseAmountHandler = (ev) => {
    ev.preventDefault()
    dispatch(addProductToCart(id))
  }
  return (
    <div className={s.buttonContainer}>
      <button 
        onClick={reduceAmountHandler}>
        {count === 1 ? <FontAwesomeIcon icon={faTrashCan} /> : <FontAwesomeIcon icon={faMinus}/>}
      </button>
      <span>{count}</span>
      <button
        className={classNames({[s.disabled]: count === stock})}
        disabled={count >= stock} onClick={increaseAmountHandler}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}