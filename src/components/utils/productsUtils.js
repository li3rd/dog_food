

export const getCalcPrice = (price, discount) => {
  price -= price*discount/100
  return Number.parseInt(price).toString()
}