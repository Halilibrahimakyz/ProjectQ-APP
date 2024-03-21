import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Bir hook olarak getVal işlevselliğini sağlayın
export const useGetVal = () => {
  const { t } = useTranslation();

  const getVal = (ref, params = {}) => {
    // i18next kullanarak çeviriyi gerçekleştirin
    return t(ref, params);
  };

  return getVal;
};
