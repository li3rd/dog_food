import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { dfApi } from '../../api/DogFoodApi';
import { getUserId, getUserToken } from '../../store/slices/user.slice';
import { CommentsList } from '../Comments/List/CommentsList';
import { withQuery } from '../HOCs/witQuery';
import { Modal } from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';
import {ReactComponent as Heart} from '../icons/heart.svg'
import {ReactComponent as Star} from '../icons/star.svg'

import { changeFavoriteProduct, getFavoriteProducts } from '../../store/slices/favorite.slice';
import { addProductToCart, getCartProducts } from '../../store/slices/cart.slice';
import { GroupButton } from '../GroupButton/GroupButton';

import { getCalcPrice } from '../utils/productsUtils';

import s from './ProductPage.module.css'


function ProductPageInner ({_id: id, name, stock, price, 
  pictures, discount, wight, description, reviews, author, product}) {
  const token = useSelector(getUserToken)
  const cart = useSelector(getCartProducts)
  const favorite = useSelector(getFavoriteProducts)
  const dispatch = useDispatch()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const userId = useSelector(getUserId)
  const isYours = userId === author._id

  const openEditModal = () => {
    if (!isEditModalOpen) setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    if (isEditModalOpen) setIsEditModalOpen(false)
  }
  const openDeleteModal = () => {
    if (!isDeleteModalOpen) setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => {
    if (isDeleteModalOpen) setIsDeleteModalOpen(false)
  }
  const {mutateAsync} = useMutation({
    mutationFn: () => dfApi.deleteProductById(id, token)
  })

  const deleteHandler = async () => {
    await mutateAsync()
    await queryClient.refetchQueries({ queryKey: ['productsFetch'], type: 'active' })
    setTimeout(() => {navigate('/products')})
  }


  if (!name) {
    return (
      <div style={{margin: 'auto'}}>
        <h1>Товар не найден</h1>
        <br></br>
        <Link style={{margin: '57px'}} to="/products">Вернуться в каталог</Link>
      </div>
    )}

  const isDiscount = discount !== 0
  const liked = (id) => favorite.find(item => item.id === id) ? true : false

  const ShowDiscount = () => {
    if (isDiscount) {return (
      <span className={s.price}>{price} &#8381;</span>
    )} return null
  }

  const heartHandler = () => {
    dispatch(changeFavoriteProduct(id))
  }
  const addToCartHandler = () => {
    dispatch(addProductToCart(id))
  }
  const ShowButtons = ({id, stock}) => {
    const isChosenItem = cart.some(item => item.id === id)
    if (isChosenItem) {
      const item = cart.find(item => item.id === id)
      return <GroupButton {...item} stock={stock} />}
    return <button onClick={addToCartHandler}>В корзину</button>
  }
  let rating = (reviews.map(el => el.rating)
    .reduce((acc, curr) => acc + curr, 0)/reviews.length)
    .toFixed(1)
  rating = isNaN(rating) ? 0 : rating

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.image}>
          <img src={pictures} alt={name}/>
          <Heart
            onClick={heartHandler} 
            className={classNames([s.likes], {[s.liked]: liked(id)})}/>
          <div className={s.starRating}>
            <Star />
            <span>{rating}</span>
          </div>
          <div className={s.discount_wrapper}>
            <div className={classNames([s.no_discount], {[s.discount]: isDiscount})}>
              <span>{isDiscount ? `-${discount}%` : null}</span>
            </div>
          </div>
        </div>
        <div className={s.mainInfo}>
          <h1>{name}</h1>
          <span className={s.weight}>{wight}</span>
          <div className={s.mainForPrice}>
            <div className={s.price_wrapper}>
              <ShowDiscount />
              <span>{getCalcPrice(price, discount)} &#8381;</span>
            </div>
            <div className={s.buttons}>
              <ShowButtons id={id} stock={stock}/>
              {isYours ? <button onClick={openDeleteModal}>Удалить</button> : null}
              {isYours ? <button onClick={openEditModal}>Редактировать</button> : null}
            </div>
            <span>В наличии: {stock} шт</span>
          </div>
          <div className={s.description}>
            <span>Описание:</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <CommentsList />
      <Modal isOpen={isEditModalOpen} closeHandler={closeEditModal}>
        <ProductForm {...product}
          closeHandler={closeEditModal}
        />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} closeHandler={closeDeleteModal}>
        <div className={s.deleteInner}>
          <p>Уверены что хотите удалить данный товар?</p>
          <button onClick={deleteHandler} type="button">Ага</button>
        </div>
      </Modal>
    </>
  )
}

const ProductPageWithQuery = withQuery(ProductPageInner)

export function ProductPage() {
  const token = useSelector(getUserToken)
  const { productId } = useParams();


  const {data: product, isLoading, refetch, isError, error} = useQuery({
    queryKey:[productId],
    queryFn: () => dfApi.getProductById(productId, token)
  })



  return <ProductPageWithQuery
    isLoading={isLoading}
    isError={isError}
    refetch={refetch}
    error={error}
    {...product}
    product={product} />
}
