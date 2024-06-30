import { checkUsernameAvailability } from '@/services/validateService'
export const handleValidation = async (formData, key, value, getVal) => {
  let error = '';

  switch (key) {
    case 'coverPhoto':
      if (!value) {
        error = getVal('coverPhotoRequired') || 'Cover Photo picture is required';
        console.log("validate cover photo required")
      }
      break;
    case 'title':
      if (!value) {
        error = getVal('titleRequired') || 'Title is required';
      } else if (value.length < 10) {
        error = getVal('titleTooShort') || 'Title must be at least 200 characters long';
      }
      break;
    case 'description':
      if (!value) {
        error = getVal('descriptionRequired') || 'Description is required';
      } else if (value.length < 80) {
        error = getVal('descriptionTooShort') || 'Description must be at least 80w characters long';
      }
      break;
    case 'category':
      if (!value) {
        error = getVal('categoryRequired') || 'Category is required';
      }
      break;
    case 'expirationDate':
      if (!value) {
        error = getVal('expirationDateRequired') || 'Expiration date is required';
      }
      break;
    case 'goalAmount':
      if (!value) {
        error = getVal('goalAmountRequired') || 'Goal amount is required';
      } else if (isNaN(value)) {
        error = getVal('goalAmountInvalid') || 'Goal amount must be a number';
      }
      break;
    case 'privacy':
      if (!value) {
        error = getVal('privacyRequired') || 'Privacy agreement is required';
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
