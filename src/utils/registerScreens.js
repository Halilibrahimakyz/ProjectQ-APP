import { Navigation } from 'react-native-navigation';
import withReduxProvider from '../hoc/withReduxProvider';
import * as Screens from '@/screens';

const registerScreens = () => {
    const screenPromises = Object.entries(Screens).map(async ([screenName, ScreenComponent]) => {
      console.log("Registering screen: ", screenName);
      Navigation.registerComponent(screenName, () => withReduxProvider(ScreenComponent));
    });
  
    return Promise.all(screenPromises);
  };

export default registerScreens;
