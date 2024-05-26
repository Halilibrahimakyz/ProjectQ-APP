export const handleValidation = (key, value,getVal) => {
    let error = '';
    // console.log("validate, key, value",key," ",value)
    switch (key) {
      case 'name':
        if (value === '') {
            error = getVal('nameRequired') || 'Name is required';
        } else if(value.length < 5 ){
            error= 'less than 5'
        }
        break;
      case 'email':
        if (value === '') {
            error = getVal('emailRequired') || 'Email is required';
        }
        break;
        case 'name2':
        if (value === '') {
            error = getVal('nameRequired') || 'Name is required';
        }
        break;
      case 'email2':
        if (value === '') {
            error = getVal('emailRequired') || 'Email is required';
        }
        break;
        case 'country':
        if (!value) {
            error = 'country is required';
        }
        break;
      case 'password':
        if (value === '') {
            error = getVal('passwordRequired') || 'Password is required';
        }
        break;
      default:
        break;
    }
    
    return error;
  };
 
export const validateStep = (formData, keys, getVal) => {
    let isValid = true;
    let errors = {};
  
    keys.forEach((key) => {
        const error = handleValidation(key, formData[key], getVal);
      if (error) {
        isValid = false;
        errors[key] = error;
      }
    });
  
    return { isValid, errors };
  };
  