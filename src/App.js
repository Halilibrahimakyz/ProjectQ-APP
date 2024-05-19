import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './navigation/registerScreens';
import { useAuth } from '@/functions/authenticate';
import { useDefaultOptions } from './navigation/navigationConfig';
import { setRootScreen } from './navigation/navigationFunctions';
import {useTheme} from '@/constants/colors';

registerScreens();

const App = (props) => {

  const { userType, isLoggedIn } = useAuth();
  const theme = useTheme();
  // const defaultOptions = useDefaultOptions();

  useEffect(() => {   
    const defaultOptions = useDefaultOptions(theme);
    Navigation.setDefaultOptions(defaultOptions);
    setRootScreen({ isLoggedIn: isLoggedIn, userType: userType});
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
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
