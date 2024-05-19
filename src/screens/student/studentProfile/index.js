import {Button,ScrollView,Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '@/storeReduxToolkit/counterSlice';
import { setDarkTheme, setLightTheme } from '@/storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '@/storeReduxToolkit/userSupporterSlice';
import {useTheme} from '@/constants/colors';
import {useLanguage} from '@/constants/language'
import { Navigation } from "react-native-navigation";
import RNRestart from 'react-native-restart';
import { setRootScreen } from '@/navigation/navigationFunctions';
import { Container } from '@/components';

const StudentProfileScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const language= useSelector((state) => state.language.value);
  
  const userSupporter= useSelector((state) => state.userSupporter);
  const userStudent= useSelector((state) => state.userStudent.userInfo);
  
  const {changeLanguage } = useLanguage();

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
    RNRestart.restart()
  };

  const handleSetLightTheme = () => {
    dispatch(setLightTheme());
    RNRestart.restart()
  };

  const handleLogout = () => {
    dispatch(logout())
    setRootScreen({ isLoggedIn: false, userType: null });
  };


  return (
    <Container style={styles.container} topBarProps={{
      title: 'Profile',
      onLeftPress: () => { console.log('sol tıklandı'); },
      leftIcon: 'menu',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu',
      shadow: true
    }}
      compId={props.componentId}
    >
      <Text style={{ color: theme.primary }}>StudentProfileScreen</Text>
      <ScrollView style={{flex: 1,backgroundColor:useTheme().background, width: "100%", height: "100%"}}>
        <Text style={{color:useTheme().primary,fontSize:34}}>Language: {language}</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>userSupporter: {userSupporter.userInfo?.name} </Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>isAuthenticated: {userSupporter.isAuthenticated ? "true": "false"} </Text>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="setTurkish" onPress={() => changeLanguage('tr')} />
        <Button title="setEnglish" onPress={() => changeLanguage('en')} />
        <Button title="setDarkTheme" onPress={handleSetDarkTheme} />
        <Button title="setLightTheme" onPress={handleSetLightTheme} />
        <Button title="loginSuccess" onPress={() => dispatch(loginSuccess({name:"test",surname:"test2"}))} />
        <Button title="logout" onPress={handleLogout} />
        </ScrollView>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

export default StudentProfileScreen;