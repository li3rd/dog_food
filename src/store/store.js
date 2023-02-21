import { configureStore } from '@reduxjs/toolkit';

import { cartReducer, preloadedCartState } from './slices/cart.slice';
import { favoriteReducer, preloadedFavoriteState } from './slices/favorite.slice';
import { searchReducer } from './slices/search.slice';
import { preloadedUserState, userReducer } from './slices/user.slice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
    favorite: favoriteReducer
  },
  preloadedState: {
    user: preloadedUserState(),
    cart: preloadedCartState(),
    favorite: preloadedFavoriteState()
  }
})


store.subscribe(() => {
  localStorage.setItem('CURRENT_USER', JSON.stringify(store.getState().user))

  const cartLS = localStorage.getItem('CART')
  const parsedCartLS = cartLS ? JSON.parse(cartLS) : {}
  const favoriteLS = localStorage.getItem('FAVORITE')
  const parsedFavoriteLS = favoriteLS ? JSON.parse(favoriteLS) : {}
  if (store.getState().user.id) {
    localStorage.setItem('FAVORITE', JSON.stringify({
      ...parsedFavoriteLS,
      [store.getState().user.id]: store.getState().favorite
    }))
    localStorage.setItem('CART', JSON.stringify({
      ...parsedCartLS,
      [store.getState().user.id]: store.getState().cart
    }))
  }
})