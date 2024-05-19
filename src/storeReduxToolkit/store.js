import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import themeReducer from './themeSlice'
import languageReducer from './languageSlice'
import userSupporterReducer from './userSupporterSlice'
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

// Define persist configurations
const persistConfig = (key) => ({
  key,
  version: 1,
  storage,
});

// Persisted reducers
const persistedCounterReducer = persistReducer(persistConfig('counter'), counterReducer);
const persistedThemeReducer = persistReducer(persistConfig('theme'), themeReducer);
const persistedLanguageReducer = persistReducer(persistConfig('language'), languageReducer);
const persistedUserSupporterReducer = persistReducer(persistConfig('userSupporter'), userSupporterReducer);
const persistedUserStudentReducer = persistReducer(persistConfig('userStudent'), userStudentReducer);


// Configure store with persisted reducers and middleware
export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    theme: persistedThemeReducer,
    language: persistedLanguageReducer,
    userSupporter: persistedUserSupporterReducer,
    userStudent: persistedUserStudentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)