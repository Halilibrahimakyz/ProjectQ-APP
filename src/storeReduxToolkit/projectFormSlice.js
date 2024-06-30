import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  formData: {
    Photos:[]
  },
  errors: {
    Photos:[]
  },
  isDraft: false,
};

const projectFormSlice = createSlice({
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
    setPhotoData: (state, action) => {
      const { index, photo } = action.payload;
      const newPhotos = [...state.formData.Photos]; // Fotos dizisinin bir kopyasını oluştur
      newPhotos[index] = photo; // İlgili indekse yeni fotoğrafı ekle
      state.formData.Photos = newPhotos; // Yeni diziyi state'e atayarak güncelle
    },
    setError: (state, action) => {
      state.errors = {
        ...state.errors,
        ...action.payload,
      };
    },
    setErrors(state, action) {
      state.errors = { ...state.errors, ...action.payload };
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
      state.isDraft = false;  // Reset the draft flag
    },
    setIsDraft: (state, action) => {  // Add this action
      state.isDraft = action.payload;
    },
  },
});

export const { nextStep, prevStep, setFormData, setError,setErrors, clearErrors, clearError, resetForm,setPhotoData,setIsDraft  } = projectFormSlice.actions;

export default projectFormSlice.reducer;
