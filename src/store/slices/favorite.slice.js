import { createSlice } from '@reduxjs/toolkit'


const favoriteState = []


export const preloadedFavoriteState = () => {
  const favoriteLS = localStorage.getItem('FAVORITE')
  const currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'))
  if (currentUser) {
    return favoriteLS ? JSON.parse(favoriteLS)[currentUser.id] : favoriteState
  } return favoriteState
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: favoriteState,
  reducers: {
    favoriteInitialize: {
      reducer(state, action) {
        return action.payload
      },
      prepare(res) {
        const favoriteLS = localStorage.getItem('FAVORITE')
        if (favoriteLS) {
          const currentUserFavorite = JSON.parse(favoriteLS)[res.data._id]
          if (currentUserFavorite) return {
            payload: currentUserFavorite
          }
        }
        return {
          payload: []
        }
      }
    },
    changeFavoriteProduct: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload.id)
        if (currentProduct) return state.filter((product) => product.id !== action.payload.id)
        else state.push(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id
          }
        }
      }
    },
    clearFavorite() {
      return []
    }
  }})

export const {favoriteInitialize, changeFavoriteProduct, clearFavorite} = favoriteSlice.actions
export const getFavoriteProducts = (state) => state.favorite
export const favoriteReducer = favoriteSlice.reducer