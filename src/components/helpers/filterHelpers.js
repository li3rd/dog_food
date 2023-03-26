

const getProductRating = (product) => {
  let rating = product.reviews
    .map(el => el.rating)
    .reduce((acc, curr) => acc + curr, 0)/product.reviews.length
  if (!isNaN(rating)) return rating
  return rating = 0
}

export const makeProductsSort = ([...products], sortBy) => {
  switch (sortBy) {
  case 'price_low':
    return products.sort((a, b) => a.price - b.price)
  case 'price_high':
    return products.sort((a, b) => b.price - a.price)
  case 'rating':
    return products.sort((a, b) => getProductRating(b) - getProductRating(a))
  case 'likes':
    return products.sort((a, b) => b.likes.length - a.likes.length)
  case 'new':
    return products.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
  case 'discount':
    return products.filter((item) => item.discount)
  
  default: return products
  }
}