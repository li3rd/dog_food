import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { dfApi } from '../../api/DogFoodApi'
import { deleteAllCheckedProducts, 
  deselectAllProducts, getCartProducts, selectAllProducts} from '../../store/slices/cart.slice'
import { getUserToken } from '../../store/slices/user.slice'
import { CartItem } from '../CartItem/CartItem'
import { calcTotalDiscount, calcTotalNumber, calcTotalPrice } from '../helpers/cartHelpers'
import { withQuery } from '../HOCs/witQuery'

import cartStyles from './Cart.module.css'


function CartInner ({cartProducts}) {
  const cart = useSelector(getCartProducts)
  const dispatch = useDispatch()
  const allChecked = cart.every(item => item.isChecked)
  const getItemFromStateById = (id) => cart.find(product => product.id === id)
  const selectAllHandler = () => {
    if (allChecked) dispatch(deselectAllProducts())
    else dispatch(selectAllProducts())
  } 

  const ShowTotalNumber = () => {
    const total = calcTotalNumber(cart)
    if (/[1]$/.test(total.toString()) && total !== 11) return (
      <span style={{opacity: 0.7}}>{total} товар</span>
    )
    if (/[2,3,4]$/.test(total.toString()) && !/[1]+[2,3,4]$/.test(total.toString())) return (
      <span style={{opacity: 0.7}}>{total} товара</span>
    )
    return (<span style={{opacity: 0.7}}>{total} товаров</span>)
  }

  const ShowPurchaseInfo = () => {
    if (cart.some(item => item.isChecked)) {
      return (
        <>
          <div>
            <span>Ваша корзина </span>
            <ShowTotalNumber />
          </div>
          <div>
            <span>Скидка </span>
            <span style={{color: 'red'}}>- {calcTotalDiscount(cart, cartProducts)} &#8381;</span>
          </div>
          <div style={{fontSize: '17px'}}>
            <span>Общая стоимость </span>
            <span>{calcTotalPrice(cart, cartProducts)} &#8381;</span>
          </div>
          <button>Перейти к оформлению</button>
        </>
      )
    } return (
      <p>Выберите товары, чтобы перейти к оформлению</p>
    )
  }

  if (cart.length === 0) {
    return (
      <div style={{margin: 'auto'}}>
        <h1>Корзина пуста</h1>
        <br></br>
        <Link style={{margin: '45px'}} to="/products">Перейти в каталог</Link>
      </div>
    )}
  return (
    <div className={cartStyles.container}>
      <div className={cartStyles.items_container}>
        <div className={cartStyles.head}>
          <h2>Корзина</h2>
        </div>
        <div className={cartStyles.head}>
          <input id="selectAll" checked={allChecked} onChange={selectAllHandler} type="checkbox" />
          <label htmlFor="selectAll">Выбрать все</label>
          <span onClick={() => dispatch(deleteAllCheckedProducts())}>Удалить выбранные</span>
        </div>
        {cartProducts.map(({_id: id, ...restProduct}) => (
          <CartItem {...restProduct} 
            id={id} 
            {...getItemFromStateById(id)} 
            key={id}/>
        ))}
      </div>
      <div className={cartStyles.info_wrapper}>
        <div className={cartStyles.info_container}>
          <ShowPurchaseInfo />
        </div>
      </div>
    </div>
  )
}

const CartWithQuery = withQuery(CartInner)

export function Cart() {
  const token = useSelector(getUserToken)
  const cart = useSelector(getCartProducts)
  const ids = cart.map((item) => item.id)
  const {data, isLoading, refetch, isError, error} = useQuery({
    queryKey: ['cart', ids],
    queryFn: () => dfApi.getProductsByIds(ids, token),
    keepPreviousData: true, 
  })

  const cartProducts = data && data.filter((product) => ids.includes(product._id))

  return <CartWithQuery 
    isLoading={isLoading} 
    isError={isError} 
    refetch={refetch} 
    error={error} 
    cartProducts={cartProducts}/>
}