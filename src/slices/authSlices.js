import { createSlice } from '@reduxjs/toolkit';
import LSKeys from '../constants/LSKeys';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,
    password: null,
    token: null,
    user: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    loginSuccess: (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.token = user.token;
      },
  },
});

export const { setUser, setEmail, setToken, setPassword } = authSlice.actions;

export const loginUser = (usr) => async (dispatch) => {
    dispatch(loginSuccess({ user: usr }));
  
    // Diğer asenkron işlemleri burada gerçekleştirin
    try {
      await setItem(LSKeys.sessionInfo, JSON.stringify(usr));
      await setItem(LSKeys.token, JSON.stringify(usr.token));
    } catch (error) {
      console.error('Login error:', error);
      // Hata durumunu ele alabilirsiniz
    }
  };

  export const logoutUser = () => async (dispatch) => {
    dispatch(logoutSuccess());
  
    // Diğer asenkron işlemleri burada gerçekleştirin
    try {
      await removeItem(LSKeys.sessionInfo);
      await removeItem(LSKeys.token);
    } catch (error) {
      console.error('Logout error:', error);
      // Hata durumunu ele alabilirsiniz
    }
  };

export default authSlice.reducer;
