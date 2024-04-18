import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import themeReducer from './themeSlice'
import languageReducer from './languageSlice'
import userDonorReducer from './userDonorSlice'
import userStudentReducer from './userStudentSlice'
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

const userDonorPersistConfig = {
  key: 'userDonor',
  version: 1,
  storage,
};

const userStudentPersistConfig = {
  key: 'userStudent',
  version: 1,
  storage,
};

const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedLanguageReducer = persistReducer(languagePersistConfig, languageReducer);
const persistedUserDonorReducer = persistReducer(userDonorPersistConfig, userDonorReducer);
const persistedUserStudentReducer = persistReducer(userStudentPersistConfig, userStudentReducer);


export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    theme: persistedThemeReducer,
    language: persistedLanguageReducer,
    userDonor:persistedUserDonorReducer,
    userStudent:persistedUserStudentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)