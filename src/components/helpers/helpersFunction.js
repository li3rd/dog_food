

export const calcTotalNumber = (cart) => {
  let total = 0
  cart.forEach(item => {
    if (item.isChecked) total += item.count
  }) 
  return total
}

export const calcTotalDiscount = (cart, products) => {
  const getItemById = (id) => products.find(product => product._id === id) 
  let acc = 0
  cart.forEach((curr) => {
    if (curr.isChecked) {
      let price = getItemById(curr.id).price
      let discount = getItemById(curr.id).discount
      acc += price*discount/100*curr.count
    }
  }) 
  return acc
}

export const calcTotalPrice = (cart, products) => {
  const getItemById = (id) => products.find(product => product._id === id)
  let acc = 0
  cart.forEach((curr) => {
    if (curr.isChecked) {
      let price = getItemById(curr.id).price
      let discount = getItemById(curr.id).discount
      acc += (price - price*discount/100)*curr.count
    }
  }) 
  return acc
}
