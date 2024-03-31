import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../locales/i18n'; 
import {setLanguage as setLanguageAction} from '../storeReduxToolkit/languageSlice'

export const useLanguage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode).then(() => {
      dispatch(setLanguageAction(languageCode));
    });
  };

  return {
    getVal: (ref, params = {}) => t(ref, params),
    changeLanguage,
  };
};
