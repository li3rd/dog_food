import { useQuery } from '@tanstack/react-query'

import { useAppContext } from '../context/AppContextProvider'
import { withQuery } from '../HOCs/witQuery'
import { ProductCard } from '../ProductCard/ProductCard'

import productsStyles from './Products.module.css'



function ProductsInner ({products}) {
  console.log(products)
  return (
    <div className={productsStyles.container}>
      {products.map(({_id: id, ...restProduct}) => (
        <ProductCard {...restProduct} id={id} key={id}/>
      ))}
    </div>
  )
  // return <p>Список пуст</p>
}


const ProductsWithQuery = withQuery(ProductsInner)

export function Products() {
  const {token} = useAppContext()
  
  


  const {data: products, isLoading, refetch, isError, error} = useQuery({
    queryKey: ['productsFetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(result => result.products)
  })
  return <ProductsWithQuery 
    isLoading={isLoading} 
    isError={isError} 
    refetch={refetch} 
    error={error} 
    products={products}/>
}