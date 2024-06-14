import {checkUsernameAvailability} from '@/services/validateService'
export const handleValidation = async  (formData, key, value, getVal) => {
  let error = '';

  switch (key) {
    case 'country':
      if (!value) {
        error = getVal('countryRequired') || 'Country is required';
      }
      break;
    case 'profilePicture':
      if (!value) {
        error = getVal('profilePictureRequired') || 'Profile picture is required';
      }
      break;
    case "username":
      if (value === '') {
        error = getVal('usernameRequired') || 'Username is required';
      } else if (value.length < 5) {
        error = getVal('usernameTooShort') || 'Username must be at least 5 characters long';
      } else if (!/^[a-zA-Z0-9.]+$/.test(value)) {
        error = getVal('usernameInvalid') || 'Username can only contain letters, numbers, and dots';
      } else {
        const isAvailable = await checkUsernameAvailability(value);
        console.log("isAvailable: ",isAvailable)
        if (!isAvailable) {
          error = getVal('usernameAlreadyTaken') || 'Username is already taken';
        }
      }
      break;
    case 'name':
      if (value === '') {
        error = getVal('nameRequired') || 'name is required';
      }
      break;
    case 'surname':
      if (value === '') {
        error = getVal('surnameRequired') || 'surname is required';
      }
      break;
    case 'email':
      if (value === '') {
        error = getVal('emailRequired') || 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = getVal('emailInvalid') || 'Email address is invalid';
      }
      break;
    case 'password':
      if (value === '') {
        error = getVal('passwordRequired') || 'Password is required';
      } else if (value.length < 8) {
        error = getVal('passwordTooShort') || 'Password must be at least 8 characters long';
      } else if (!/[A-Z]/.test(value)) {
        error = getVal('passwordUppercase') || 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(value)) {
        error = getVal('passwordLowercase') || 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(value)) {
        error = getVal('passwordNumber') || 'Password must contain at least one number';
      }
      break;
    case 'rePassword':
      if (value === '') {
        error = getVal('rePasswordRequired') || 'Please confirm your password';
      } else if (value !== formData.password) {
        error = getVal('passwordsMismatch') || 'Passwords do not match';
      }
      break;
    case 'phoneNumber':
      if (value === '') {
        error = getVal('phoneNumberRequired') || 'Phone number is required';
      } else if (!/^\+?\d{10,15}$/.test(value)) {
        error = getVal('phoneNumberInvalid') || 'Phone number is invalid';
      }
      break;
    case 'idNumber':
      if (value === '') {
        error = getVal('identificationNumberRequired') || 'Identification number is required';
      } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
        error = getVal('identificationNumberInvalid') || 'Identification number is invalid';
      }
      break;
    case 'gender':
      if (!value) {
        error = getVal('genderRequired') || 'Gender is required';
      }
      break;
    case 'birthDate':
      if (!value) {
        error = getVal('birthDateRequired') || 'Birth date is required';
      } else {
        const today = new Date();
        const birthDate = new Date(value);
        var age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          error = getVal('ageRestriction') || 'You must be at least 18 years old';
        }
      }
      break;
    case 'city':
      if (value === '') {
        error = getVal('cityRequired') || 'City is required';
      }
      break;
    case 'school':
      if (!value) {
        error = getVal('schoolRequired') || 'School is required';
      }
      break;
    case 'department':
      if (value === '') {
        error = getVal('departmentRequired') || 'Department is required';
      }
      break;
    case 'interests':
      if (value.length <= 2) {
        error = getVal('interestMinRequired');
      }
      break;
    default:
      break;
  }

  return error;
};

export const validateStep = async (formData, keys, getVal) => {
  let isValid = true;
  let errors = {};

  for (const key of keys) {
    const error = await handleValidation(formData, key, formData[key], getVal);
    if (error) {
      isValid = false;
      errors[key] = error;
    }
  };

  return { isValid, errors };
};
