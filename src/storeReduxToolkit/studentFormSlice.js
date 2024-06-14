import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   step: 1,
//   formData: {
//     username: 'halil',
//     name:'halil ibrahim',
//     surname: 'AKYÜZ',
//     password: 'Test1234',
//     rePassword: 'Test1234',
//     email: 'h.ibrahimakyuz@outlook.com',
//     profilePicture: '',
//     idNumber: '44444444444',
//     phoneNumber: '5555555555',
//     gender: 'male',
//     country: 'TR',
//     city: 'muğla',
//     birthDate: '',
//     bio: '',
//     identificate: false,
//     isActive: true,
//     userType: 'student',
//     interests: ['sport'],
//     school: 'mskü',
//     studentClass: '',
//     department: 'ceng',
//     gpa: '',
//     verification: false,
//     goals: '',
//   },
//   errors: {},
// };

const initialState = {
  step: 1,
  formData: {
    username: '',
    name:'',
    surname: '',
    password: '',
    rePassword: '',
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
    isActive: true,
    userType: 'student',
    interests: [],
    school: '',
    studentClass: '',
    department: '',
    gpa: null,
    verification: false,
    goals: '',
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
