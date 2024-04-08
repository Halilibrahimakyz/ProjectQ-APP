// src/hocs/withReduxProvider.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../storeReduxToolkit/store';

const withReduxProvider = (Component) => (props) =>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...props} />
        </PersistGate>
    </Provider>;

export default withReduxProvider;
