import {Button, SafeAreaView,Text, Touchable, TouchableOpacity, Vibration, View} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../storeReduxToolkit/counterReducer';
import { setDarkTheme, setLightTheme } from '../../storeReduxToolkit/themeReducer';
import {useTheme} from '@/constants/Colors';
//import { useSelector, useDispatch } from 'react-redux'
//import { updateField } from './formSlice'


const HomeScreen = props => {

  const counterNum = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  //const formData = useSelector((state) => state.form.formData);
  //const dispatch = useDispatch();

  return (
    <View style={{flex: 1,backgroundColor:useTheme().background, width: "100%", height: "100%"}}>
    {/*<TouchableOpacity onPress={dispatch(setUser({ name, value: formattedDate.format('MM/DD/YYYY') }))}></TouchableOpa>
        <Text style={{color:Colors.text}}>{getVal("text")}</Text>*/}
        <Text style={{color:useTheme().primary,fontSize:34}}>Counter: {counterNum} (using redux and persist)</Text>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />

        <Button title="setDarkTheme" onPress={() => dispatch(setDarkTheme())} />
        <Button title="setLightTheme" onPress={() => dispatch(setLightTheme())} />
        </View>
  );
};

export {HomeScreen};