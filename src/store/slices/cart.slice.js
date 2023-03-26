import { createSlice } from '@reduxjs/toolkit'



const cartState = []

export const preloadedCartState = () => {
  const cartLS = localStorage.getItem('CART')
  const currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'))
  if (currentUser) {
    return cartLS ? JSON.parse(cartLS)[currentUser.id] : cartState
  } return cartState
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartState,
  reducers: {
    cartInitialize: {
      reducer(state, action) {
        return action.payload
      },
      prepare(res) {
        const cartLS = localStorage.getItem('CART')
        if (cartLS) {
          const currentUserCart = JSON.parse(cartLS)[res.data._id]
          if (currentUserCart) return {
            payload: currentUserCart
          }
        }
        return {
          payload: []
        }
      }
    },
    addProductToCart: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload.id)
        if (currentProduct) currentProduct.count++
        else state.push(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            count: 1,
            isChecked: false
          }
        }
      }
    },
    removeProductFromCart(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct.count !== 1) {
        currentProduct.count--
      }
      else return state.filter(product => product.id !== action.payload)
    },
    deleteProduct(state, action) {
      return state.filter(product => product.id !== action.payload)
    },
    deleteAllCheckedProducts(state, action) {
      return state.filter(product => !product.isChecked)
    },
    clearCart() {
      return []
    },
    selectProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isChecked = !currentProduct.isChecked
    },
    selectAllProducts(state) {
      state.forEach((product) => product.isChecked = true)
    },
    deselectAllProducts(state) {
      state.forEach(product => product.isChecked = false)
    }
  }
})

export const {addProductToCart, clearCart, selectAllProducts, 
  selectProduct, cartInitialize, removeProductFromCart, deselectAllProducts,
  deleteProduct, deleteAllCheckedProducts} = cartSlice.actions
export const getCartProducts = state => state.cart
export const cartReducer = cartSlice.reducer