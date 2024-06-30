import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './navigation/registerScreens';
import { useAuth } from '@/functions/authenticate';
import { useDefaultOptions } from './navigation/navigationConfig';
import { setRootScreen } from './navigation/navigationFunctions';
import {useTheme} from '@/constants/colors';
import DrawerLeft from './components/DrawerLeft';
import { CustomLoader } from './components';
import { refreshToken } from './services';
// import { enableScreens } from 'react-native-screens';

// enableScreens();
Navigation.registerComponent('DrawerLeft', () => DrawerLeft);
registerScreens();

const App = (props) => {

  const { userType, isLoggedIn } = useAuth();
  const theme = useTheme();

  useEffect(() => {   
    const token = refreshToken()
    const defaultOptions = useDefaultOptions(theme);
    Navigation.setDefaultOptions(defaultOptions);
    setRootScreen({ isLoggedIn: isLoggedIn, userType: userType});
  }, []);

  return (
    <CustomLoader/>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
