import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterReducer'
import themeReducer from './themeReducer'
import languageReducer from './languageReducer'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'

const counterPersistConfig = {
  key: 'counter',
  version: 1,
  storage,
};

const themePersistConfig = {
  key: 'theme',
  version: 1,
  storage,
};

const languagePersistConfig = {
  key: 'language',
  version: 1,
  storage,
};

const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedLanguageReducer = persistReducer(languagePersistConfig, languageReducer);


export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    theme: persistedThemeReducer,
    language: persistedLanguageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)