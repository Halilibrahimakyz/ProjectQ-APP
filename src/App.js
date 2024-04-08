import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { startApp } from './navigator/navigation';
import registerScreens from './navigator/registerScreens';

registerScreens();

const App = (props) => {
  useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    startApp();
  };

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
