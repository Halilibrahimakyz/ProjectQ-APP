import React, {
  useMemo,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react';

import '../translation/i18n';
import {useTranslation} from 'react-i18next';
import {setItem, getItem} from '@/utils/AsyncStorage';
const LanguageContext = createContext();

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }
  return context;
};

export const LanguageProvider = props => {
  const [activeLanguage, setActiveLanguage] = useState('tr');
  const [error, setError] = useState(null);
  const {t, i18n} = useTranslation();

  const changeLanguage = useCallback(
    async value => {
      try {
        await i18n.changeLanguage(value);
        await setItem('appLanguage', value); // Save language preference
        setActiveLanguage(value);
      } catch (err) {
        console.error('Error changing language:', err);
      }
    },
    [i18n],
  );
  useEffect(() => {
    // Load language preference from AsyncStorage on component mount
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await getItem('appLanguage');
        if (savedLanguage) {
          setActiveLanguage(savedLanguage);
          i18n.changeLanguage(savedLanguage);
        }
      } catch (e) {
        console.error('Error loading language preference:', e);
      }
    };

    loadLanguagePreference();
  }, [i18n]);
  const getVal = useCallback(
    (ref, param) => {
      try {
        // ref ve email'i kullanarak işlemler yapabilirsiniz
        
        return !param ? t(ref) : t(ref, {param});
        // İşlemler başarılı olduysa result değerini kullanabilirsiniz
       
      } catch (e) {
        console.log(e);
        setError(e);
      }
    },
    [t],
  );

  const value = useMemo(() => {
    const setters = {
      setActiveLanguage,
      setError,
    };

    const functions = {
      changeLanguage,
      getVal,
    };
    const values = {
      error,
      activeLanguage,
    };

    return {values, functions, setters};
  }, [
    getVal,
    changeLanguage,
    error,
    activeLanguage,
    setError,
    setActiveLanguage,
  ]);

  return <LanguageContext.Provider value={value} {...props} />;
};
