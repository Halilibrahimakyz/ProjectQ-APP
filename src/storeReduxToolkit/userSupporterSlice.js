import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {
        username: '',
        name:'',
        surname: '',
        email: '',
        profilePicture: '',
        idNumber: '',
        phoneNumber: '',
        gender: '',
        country: '',
        city: '',
        birthDate: '',
        bio: '',
        identificate: false,
        isActive: false,
        userType: '',
        interests: [],
        verification: false,
        occupation: '',
        company: '',
        behalfCompany: '',
        wantsAnonymous: '',
    }, // Kullanıcı bilgileri için
    isAuthenticated: false, // Oturum açma durumu
    error: null, // Hata mesajları için
};

export const userSupporterSlice = createSlice({
    name: 'userSupporter',
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

export const { loginSuccess, logout, loginFailure } = userSupporterSlice.actions;
export default userSupporterSlice.reducer;