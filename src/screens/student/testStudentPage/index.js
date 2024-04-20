import { View, Text, ScrollView, Button, StatusBar} from 'react-native';
import React from 'react';

import { Navigation } from 'react-native-navigation';

import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { setStatusBar } from '@/functions/setStatusBar';

import { Container } from '@/components';

import { popScreen, pushScreen } from '@/navigator/navFunctions';


const testStudentPageScreen = props => {
  
  const theme = useTheme();

  return (
    <Container 
      topBarProps={{
        title: 'Student',
        onLeftPress: () => { popScreen(props.componentId) },
        leftIcon: 'arrow-left',
        onRightPress: () => { console.log('Sağ tıklandı'); },
        rightIcon: 'menu'}}
      compId={props.componentId}
    >

    </Container>
  );
};

export default testStudentPageScreen;