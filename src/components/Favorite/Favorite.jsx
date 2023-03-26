import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { dfApi } from '../../api/DogFoodApi'
import { getFavoriteProducts } from '../../store/slices/favorite.slice'
import { getUserToken } from '../../store/slices/user.slice'
import { withQuery } from '../HOCs/witQuery'
import { ProductCard } from '../ProductCard/ProductCard'

import productsStyles from '../Products/Products.module.css'



function FavoriteInner ({favoriteProducts}) {
  const favorite = useSelector(getFavoriteProducts)
  if (favorite.length === 0) {
    return (
      <div style={{margin:'auto'}}>
        <h1>В избранном пусто</h1>
        <br></br>
        <Link style={{margin: '82px'}} to="/products">Перейти в каталог</Link>
      </div>
    )}

  return (
    <div className={productsStyles.container}>
      {favoriteProducts.map(({_id: id, ...restProduct}) => (
        <Link key={id} to={`/products/${id}`}><ProductCard {...restProduct} id={id} key={id}/></Link>
      ))}
    </div>
  )
}

const FavoriteWithQuery = withQuery(FavoriteInner)

export function Favorite() {
  
  const token = useSelector(getUserToken)
  const favorite = useSelector(getFavoriteProducts)
  const ids = favorite.map((item) => item.id)

  const {data, isLoading, refetch, isError, error} = useQuery({
    queryKey: ['favorite', ids],
    queryFn: () => dfApi.getProductsByIds(ids, token),
    keepPreviousData: true, 
  })

  const favoriteProducts = data && data.filter((product) => ids.includes(product._id))

  return <FavoriteWithQuery 
    isLoading={isLoading} 
    isError={isError} 
    refetch={refetch} 
    error={error} 
    favoriteProducts={favoriteProducts}/>
}