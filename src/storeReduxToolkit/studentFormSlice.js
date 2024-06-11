import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  formData: {
    profilePicture: '',
    username: 'halil',
    name: 'Halil',
    surname: 'AKYÜZ',
    email: 'h.ibrahimakyuz@outlook.com',
    password: 'Test1234',
    rePassword: 'Test1234',
    phoneNumber: '5555555555',
    idNumber: '44444444444',
    gender: 'male',
    city: 'muğla',
    school: 'mskü',
    department: 'ceng',
    country: 'TR',
    interests:['sport']
  },
  errors: {},
};

const studentFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    setError: (state, action) => {
      state.errors = {
        ...state.errors,
        ...action.payload,
      };
    },
    clearError: (state, action) => {
      const { [action.payload]: _, ...remainingErrors } = state.errors;
      state.errors = remainingErrors;
    },
    clearErrors: (state, action) => {
      action.payload.forEach(key => {
        if (state.errors[key]) {
          delete state.errors[key];
        }
      });
    },
    resetForm: (state) => {
      state.step = initialState.step;
      state.formData = initialState.formData;
      state.errors = initialState.errors;
    },
  },
});

export const { nextStep, prevStep, setFormData, setError, clearErrors, clearError, resetForm } = studentFormSlice.actions;

export default studentFormSlice.reducer;
