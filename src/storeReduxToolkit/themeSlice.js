import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
        },
        setLightTheme: state => {
            state.value = 'light';
        },

        setDarkTheme: state => {
            state.value = 'dark';
        },
    },
})

export const { setTheme, setLightTheme, setDarkTheme } = themeSlice.actions
export default themeSlice.reducer