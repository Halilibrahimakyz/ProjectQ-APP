/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import { store } from './src/storeReduxToolkit/store';
import { Provider } from 'react-redux';
import { persistor } from './src/storeReduxToolkit/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './src/App';
import { name as appName } from './app.json';

Navigation.registerComponent(appName, () => (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App {...props} />
    </PersistGate>
  </Provider>
));

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: appName,
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
          },
        },
      }
    }
  });
});