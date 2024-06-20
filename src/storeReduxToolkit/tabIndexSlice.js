import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const tabIndexSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeIndex: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {changeIndex } = tabIndexSlice.actions
export default tabIndexSlice.reducer