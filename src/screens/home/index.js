import {Button,ScrollView,Text, View} from 'react-native';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../storeReduxToolkit/counterSlice';
import { setDarkTheme, setLightTheme } from '../../storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '../../storeReduxToolkit/userDonorSlice';
import {useTheme} from '@/constants/colors';
import {useLanguage} from '@/constants/language'
import { Navigation } from "react-native-navigation";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = props => {

  const counterNum = useSelector((state) => state.counter.value);
  const language= useSelector((state) => state.language.value);
  const theme= useSelector((state) => state.theme.value);
  const userDonor= useSelector((state) => state.userDonor);
  const userStudent= useSelector((state) => state.userStudent.userInfo);
  console.log("userDonor: ",userDonor)
  const { getVal, changeLanguage } = useLanguage();

  const dispatch = useDispatch();
  goToSecondScreen = () => {
    console.log("props.componentId: ",props.componentId)
    Navigation.push(props.componentId, {
      component: {
        name: 'TestScreen'
      }
    });
  };

  return (
    <ScrollView style={{flex: 1,backgroundColor:useTheme().background, width: "100%", height: "100%"}}>
        <Text style={{color:useTheme().primary,fontSize:34}}>Counter: {counterNum} (using redux and persist)</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>Language: {language} {getVal("welcome")}</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>userDonor: {userDonor.userInfo?.name} </Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>isAuthenticated: {userDonor.isAuthenticated ? "true": "false"} </Text>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="setTurkish" onPress={() => changeLanguage('tr')} />
        <Button title="setEnglish" onPress={() => changeLanguage('en')} />
        <Button title="setDarkTheme" onPress={() => dispatch(setDarkTheme())} />
        <Button title="setLightTheme" onPress={() => dispatch(setLightTheme())} />
        <Button title="loginSuccess" onPress={() => dispatch(loginSuccess({name:"test",surname:"test2"}))} />
        <Button title="logout" onPress={() => dispatch(logout())} />
        <Button title="goToSecondScreen" onPress={() => goToSecondScreen()} />
        </ScrollView>
  );
};

export default HomeScreen;