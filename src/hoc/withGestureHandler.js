// src/hocs/withGestureHandler.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../storeReduxToolkit/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const withGestureHandler = (Component) => (props) =>
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...props} />
        </PersistGate>
    </Provider>;
  </GestureHandlerRootView>

export default withGestureHandler;
