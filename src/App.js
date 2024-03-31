import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import {
  HomeScreen,
} from '@/screens';
import { store } from './storeReduxToolkit/store';
import { Provider } from 'react-redux';
import { persistor } from './storeReduxToolkit/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = props => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
