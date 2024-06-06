import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  formData: {
    profilePicture: '',
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    rePassword: '',
    phoneNumber: '',
    identificationNumber: '',
    gender: '',
    city: '',
    school: '',
    department: '',
    country: '',
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
