import 'react-native-gesture-handler';
import { StyleSheet, LogBox, SafeAreaView, Platform,StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import Navigation from './navigator/navigation';
import { AuthProvider } from './store/AuthContext';
import { LanguageProvider } from './store/LanguageContext';
// import { Provider } from 'react-redux';
import { store } from './store/store';
import Colors from '@/constants/Colors';
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { withIAPContext } from 'react-native-iap';
StatusBar.setBackgroundColor('green');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = props => {

  useEffect(() => {
    if (Platform.OS === 'android')
      SplashScreen.hide()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.green }}>
      <Provider store={store}>
            <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default withIAPContext(App);

const styles = StyleSheet.create({});
