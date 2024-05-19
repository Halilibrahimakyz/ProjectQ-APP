import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './navigator/registerScreens';
import { useAuth } from '@/functions/authenticate';
import { useDefaultOptions } from './navigator/navigationConfig';
import { setRootScreen } from './navigator/navigationFunctions';

registerScreens();

const App = (props) => {

  const { userType, isLoggedIn } = useAuth();
  const defaultOptions = useDefaultOptions();

  useEffect(() => {   

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
