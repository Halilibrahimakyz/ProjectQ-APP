import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '../storeReduxToolkit/store';
import translationEN from './en/translation.json';
import translationTR from './tr/translation.json'; 

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};

export const initI18n = () => {
  const defaultLanguage = 'en';
  const language = store.getState()?.language.value || defaultLanguage;
  
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: language,
    fallbackLng: defaultLanguage,
    interpolation: { escapeValue: false },
  });
};
initI18n();

export default i18n;
