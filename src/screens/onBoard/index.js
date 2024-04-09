import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from '@/constants/Colors';
import { useLanguage } from '@/constants/language'
import { popScreen,pushScreen } from '@/navigator/navFunctions';

import OnBoardLight from '@/assets/svg/Light/OnBoardLight.svg'
import OnBoardDark from '@/assets/svg/Dark/OnBoardDark.svg'
import OnBoardStudentButtonLight from '@/assets/svg/Light/OnBoardStudentButtonLight.svg'
import OnBoardStudentButtonDark from '@/assets/svg/Dark/OnBoardStudentButtonDark.svg'
import OnBoardSupporterButtonLight from '@/assets/svg/Light/OnBoardSupporterButtonLight.svg'
import OnBoardSupporterButtonDark from '@/assets/svg/Dark/OnBoardSupporterButtonDark.svg'


const OnBoardScreen = props => {
  const { getVal } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: useTheme().background, width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center", paddingHorizontal: 10}}>
      <Text style={{ color: useTheme().primary }}>OnBoardScreen</Text>
      <Button
        title="geri Git"
        onPress={() => popScreen(props.componentId)}
      />

      {useTheme().type === "dark" ? <OnBoardDark width={250} height={250} /> : <OnBoardLight width={250} height={250} />}
      <Text style={{ color: useTheme().primary, fontSize: 48, fontWeight: "bold", textAlign: "center", marginTop: 10}}>{getVal("on_board_title")}</Text>
      <Text style={{ color: useTheme().onBoardDescText, fontSize: 20, fontWeight: "400", textAlign: "center", marginTop: 17}}>{getVal("on_board_desc")}</Text>
      <View style={{marginTop: 20, width: "100%", height: 200, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>

        <TouchableOpacity onPress={() => pushScreen(props.componentId, "AppInfoStudentScreen")} style={{borderWidth: 2, borderColor: useTheme().primary, width: 145, height: 170, borderRadius: 20, justifyContent: "center", alignItems: "center"}}>
          {useTheme().type === "dark" ? <OnBoardStudentButtonDark width={120} height={120} /> : <OnBoardStudentButtonLight width={120} height={120} />}
          <Text style={{color: useTheme().onBoardDescText, fontSize: 22}}>{getVal("on_board_student_button")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pushScreen(props.componentId,"AppInfoSupporterScreen")} style={{borderWidth: 2, borderColor: useTheme().primary, width: 145, height: 170, borderRadius: 20, justifyContent: "center", alignItems: "center"}}>
          {useTheme().type === "dark" ? <OnBoardSupporterButtonDark width={120} height={120} /> : <OnBoardSupporterButtonLight width={120} height={120} />}
          <Text style={{color: useTheme().onBoardDescText, fontSize: 22}}>{getVal("on_board_supporter_button")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardScreen;