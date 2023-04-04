import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { dfApi } from '../../api/DogFoodApi'
import { getSearch } from '../../store/slices/search.slice'
import { getUserToken } from '../../store/slices/user.slice'
import { FilterBar } from '../Filters/FilterBar'
import { makeProductsSort } from '../helpers/filterHelpers'
import { withQuery } from '../HOCs/witQuery'
import { ProductCard } from '../ProductCard/ProductCard'

import productsStyles from './Products.module.css'



function ProductsInner ({products}) {
  const [seacrhParams] = useSearchParams()
  const sortBy = seacrhParams.get('sort')


  if (sortBy) {
    products = makeProductsSort(products, sortBy)
  }
  if (products.length === 0) {
    const emptyResult = true
    return (
      <>
        <FilterBar emptyResult={emptyResult}/>
        <div style={{display: 'flex',
          flexDirection: 'column',
          margin: 'auto'
        }}>
          <h1>По Вашему запросу ничего не найдено</h1>
          <br></br>
          <Link style={{fontSize: '17px', textAlign: 'center'}} to="/">На главную</Link>
        </div>
      </>
    )}
  else return (
    <>
      <FilterBar />
      <div className={productsStyles.container}>
        {products.map(({_id: id, ...restProduct}) => (
          <Link key={id} to={`/products/${id}`}><ProductCard {...restProduct} id={id} /> </Link>
        ))}
      </div>
    </>
  )
}


const ProductsWithQuery = withQuery(ProductsInner)

export function Products() {
  const token = useSelector(getUserToken)
  const search = useSelector(getSearch)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!token) navigate('/signin')
  })

  const {data: products, isLoading, refetch, isError, error} = useQuery({
    queryKey: ['productsFetch', search],
    queryFn: () => dfApi.getAllProducts(search, token)
  })
  return <ProductsWithQuery 
    isLoading={isLoading} 
    isError={isError} 
    refetch={refetch} 
    error={error} 
    products={products}/>
}