import { View, Text ,ScrollView,Button} from 'react-native';
import React from 'react';

import {useTheme} from '@/constants/Colors';
import {useLanguage} from '@/constants/language'
import { popScreen,pushScreen } from '@/navigator/navFunctions';

const AppInfoSupporterScreen = props => {

  return (
    <View style={{flex: 1,backgroundColor:useTheme().background, width: "100%", height: "100%"}}>
    <Text style={{color:useTheme().primary}}>AppInfoSupporterScreen</Text>
    <Button
        title="geri Git"
        onPress={() => popScreen(props.componentId)}
      />
    </View>
  );
};

export default AppInfoSupporterScreen;