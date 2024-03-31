import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'tr',
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        
        setLanguage: (state, action) => {
            state.value = action.payload; 
        },
        
        setTurkish: state => {
            state.value = 'tr';
        },
        
        setEnglish: state => {
            state.value = 'en';
        },
    },
});

export const { setLanguage, setTurkish, setEnglish } = languageSlice.actions;
export default languageSlice.reducer;
