import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    changeSearchState(state, action) {
      return action.payload
    }
  }
})

export const {changeSearchState} = searchSlice.actions
export const getSearch = state => state.search
export const searchReducer = searchSlice.reducer