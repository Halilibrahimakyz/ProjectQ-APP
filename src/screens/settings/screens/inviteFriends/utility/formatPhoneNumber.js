const formatPhoneNumber = (phoneNumber) => {
  const digits = phoneNumber.replace(/\D/g, '');
  const normalizedDigits = digits.startsWith('90') ? digits.slice(2) : digits;
  const formattedDigits = normalizedDigits.startsWith('0') ? normalizedDigits : '0' + normalizedDigits;
  const formattedNumber = formattedDigits.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  return formattedNumber;
};

export default formatPhoneNumber;