
import { StyleSheet, LogBox, SafeAreaView, Platform,StatusBar, View,Text } from 'react-native';
import React, { useEffect } from 'react';
import {
  HomeScreen,
} from '@/screens';
import Colors from '@/constants/Colors';
import { store } from './storeReduxToolkit/store';
import { Provider } from 'react-redux';
import { persistor } from './storeReduxToolkit/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = props => {

 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{flex:1,backgroundColor:Colors.darkWhite}}>
          <HomeScreen/>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
