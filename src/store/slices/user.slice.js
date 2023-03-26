import { createSlice } from '@reduxjs/toolkit'


const userState = {
  name:'',
  email: '',
  group: '',
  token: '',
  id: '',
  avatar: ''
}

export const preloadedUserState = () => {
  const currentUser = localStorage.getItem('CURRENT_USER')
  return currentUser ? JSON.parse(currentUser) : userState
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    logIn: {
      reducer(state, action) {
        return {...state, ...action.payload}
      },
      prepare(res) {
        return {
          payload: {
            name: res.data.name,
            email: res.data.email,
            group: res.data.group,
            token: res.token,
            id: res.data._id,
            avatar: res.data.avatar
          }
        }
      }
    },
    logOut() {
      return userState
    }
  }
})

export const { logIn, logOut } = userSlice.actions
export const getUserToken = state => state.user.token
export const getUserId = state => state.user.id
export const userReducer = userSlice.reducer