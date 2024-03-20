import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import HEADER_EN from './main/en.json';
import HEADER_TR from './main/tr.json';


const en = {
  ...HEADER_EN,
};

const tr = {
  ...HEADER_TR,
};

i18n.use(initReactI18next).init({
  lng: 'tr',
  compatibilityJSON: 'v3',
  fallbackLng: 'tr',
  returnObjects: true,
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
