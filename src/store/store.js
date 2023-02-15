import { configureStore } from '@reduxjs/toolkit';

import { cartReducer, preloadedCartState } from './slices/cart.slice';
import { searchReducer } from './slices/search.slice';
import { preloadedUserState, userReducer } from './slices/user.slice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    search: searchReducer
  },
  preloadedState: {
    user: preloadedUserState(),
    cart: preloadedCartState()
  }
})


store.subscribe(() => {
  localStorage.setItem('CURRENT_USER', JSON.stringify(store.getState().user))

  const cartLS = localStorage.getItem('CART')
  const parsedCartLS = cartLS ? JSON.parse(cartLS) : {}
  if (store.getState().user.id) {
    localStorage.setItem('CART', JSON.stringify({
      ...parsedCartLS,
      [store.getState().user.id]: store.getState().cart
    }))
  }
})