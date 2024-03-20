
import { StyleSheet, LogBox, SafeAreaView, Platform,StatusBar, View,Text } from 'react-native';
import React, { useEffect } from 'react';
import {
  HomeScreen,
} from '@/screens';
import Colors from '@/constants/Colors';
const App = props => {

 
  return (
   <View style={{flex:1,backgroundColor:Colors.darkWhite}}>
    <HomeScreen/>
   </View>
  );
};

export default App;

const styles = StyleSheet.create({});
