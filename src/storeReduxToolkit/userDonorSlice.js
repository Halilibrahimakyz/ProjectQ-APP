import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: null, // Kullanıcı bilgileri için
    isAuthenticated: false, // Oturum açma durumu
    error: null, // Hata mesajları için
};

export const userDonorSlice = createSlice({
    name: 'userDonor',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { loginSuccess, logout, loginFailure } = userDonorSlice.actions;
export default userDonorSlice.reducer;