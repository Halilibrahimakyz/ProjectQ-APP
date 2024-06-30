import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: 'your-static-access-token',
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        removeAccessToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setAccessToken, removeAccessToken } = authorizationSlice.actions;
export default authorizationSlice.reducer;