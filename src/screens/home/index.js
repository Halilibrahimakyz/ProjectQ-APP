import {Button,ScrollView,Text, View} from 'react-native';
import React,{ useEffect, useState }  from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../storeReduxToolkit/counterSlice';
import { setDarkTheme, setLightTheme } from '../../storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '../../storeReduxToolkit/userSupporterSlice';
import {useTheme} from '@/constants/colors';
import {useLanguage} from '@/constants/language'
import { Navigation } from "react-native-navigation";
import { defaultOptions } from '../../navigation/navigationConfig';
import RNRestart from 'react-native-restart';
import { useDefaultOptions } from '../../navigation/navigationConfig';
import { setRootScreen } from '../../navigation/navigationFunctions';
import { Container } from '@/components';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = props => {

  const counterNum = useSelector((state) => state.counter.value);
  const language= useSelector((state) => state.language.value);
  
  const theme = useTheme();
  const userDonor= useSelector((state) => state.userDonor);
  const userStudent= useSelector((state) => state.userStudent.userInfo);
  // const [themeUpdated, setThemeUpdated] = useState(false);
  // console.log("userDonor: ",userDonor)
  
  const defaultOptions = useDefaultOptions();
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



  const handleSetDarkTheme = () => {
    dispatch(setDarkTheme());
    // console.log("themetype: ", theme.type);
    // Navigation.setDefaultOptions(defaultOptions);
    // setRootScreen({ isLoggedIn: true, userType: 'supporter', initialTab: 4 });
    // setThemeUpdated(true);
    RNRestart.restart()
  };

  const handleSetLightTheme = () => {
    dispatch(setLightTheme());
    // Navigation.setDefaultOptions(defaultOptions);
    // setRootScreen({ isLoggedIn: true, userType: 'supporter', initialTab: 4 });
    // console.log("themetype: ", theme.type);
    RNRestart.restart()
    // setThemeUpdated(true);
  };

  const handleLogout = () => {
    dispatch(logout())
    setRootScreen({ isLoggedIn: false, userType: null });
  };


  return (

    <Container topBarProps={{
      // title: 'Ana Sayfa',
      onLeftPress: () => { popScreen(props.componentId) },
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      rightIcon: null
    }}
      compId={props.componentId}
    >

<ScrollView style={{flex: 1,backgroundColor:useTheme().background, width: "100%", height: "100%"}}>
        <Text style={{color:useTheme().primary,fontSize:34}}>Counter: {counterNum} (using redux and persist)</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>Language: {language} {getVal("welcome")}</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>userDonor: {userDonor.userInfo?.name} </Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>isAuthenticated: {userDonor.isAuthenticated ? "true": "false"} </Text>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="setTurkish" onPress={() => changeLanguage('tr')} />
        <Button title="setEnglish" onPress={() => changeLanguage('en')} />
        <Button title="setDarkTheme" onPress={handleSetDarkTheme} />
        <Button title="setLightTheme" onPress={handleSetLightTheme} />
        <Button title="loginSuccess" onPress={() => dispatch(loginSuccess({name:"test",surname:"test2"}))} />
        <Button title="logout" onPress={handleLogout} />
        <Button title="goToSecondScreen" onPress={() => goToSecondScreen()} />
        </ScrollView>
    </Container>
   
  );
};

export default HomeScreen;