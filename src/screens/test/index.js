import {Button,ScrollView,Text, View} from 'react-native';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../storeReduxToolkit/counterSlice';
import { setDarkTheme, setLightTheme } from '../../storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '../../storeReduxToolkit/userDonorSlice';
import {useTheme} from '@/constants/Colors';
import {useLanguage} from '@/constants/language'
import Welcome from '../../assets/svg/Welcome.svg'
import Dark from '@/assets/svg/Dark.svg'
import Light from '@/assets/svg/Light.svg'

const TestScreen = props => {

  const counterNum = useSelector((state) => state.counter.value);
  const language= useSelector((state) => state.language.value);
  const theme= useSelector((state) => state.theme.value);
  const userDonor= useSelector((state) => state.userDonor);
  const userStudent= useSelector((state) => state.userStudent.userInfo);
  const { getVal, changeLanguage } = useLanguage();

  const dispatch = useDispatch();

  return (
    <ScrollView style={{flex: 1,backgroundColor:useTheme().background, width: "100%", height: "100%"}}>
        <Text style={{color:useTheme().primary,fontSize:34}}>Counter: {counterNum} (using redux and persist)</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>Language: {language} {getVal("welcome")}</Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>userDonor: {userDonor.userInfo?.name} </Text>
        <Text style={{color:useTheme().primary,fontSize:34}}>isAuthenticated: {userDonor.isAuthenticated ? "true": "false"} </Text>
        <View style={{alignItems:'center'}}>
          {theme === 'dark'?(<Dark  width={300} height={300} />):(<Light  width={300} height={300} />)

          }
        
        </View>
        </ScrollView>
  );
};

export default TestScreen;