import { Button, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setDarkTheme, setLightTheme,changeTheme } from '@/storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '@/storeReduxToolkit/userStudentSlice';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Navigation } from "react-native-navigation";
import RNRestart from 'react-native-restart';
import { setRootScreen } from '@/navigation/navigationFunctions';
import { Container } from '@/components';
import { popScreen, pushScreen } from '@/navigation/navigationFunctions';

import ProfilePictureContainer from '@/components/profile/ProfilePictureContainer';
import ProfileNameText from '@/components/profile/ProfileNameText';
import SocialStatistics from '@/components/profile/SocialStatistics';
import WalletSection from '@/components/profile/WalletSection';
import AboutSection from '@/components/profile/AboutSection';
import InterestsSection from '@/components/profile/InterestsSection';

const demoImage = require("@/assets/images/DemoStudentProfilePicture.jpg");

const StudentProfileScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const language = useSelector((state) => state.language.value);

  const userStudent = useSelector((state) => state.userStudent.userInfo);

  const { getVal, changeLanguage } = useLanguage();

  const interestsArray = ['Medical', 'Disaster', 'Education', 'Social', 'Humanity', 'Environment'];
  const aboutText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

  const dispatch = useDispatch();
  goToSecondScreen = () => {
    console.log("props.componentId: ", props.componentId)
    Navigation.push(props.componentId, {
      component: {
        name: 'TestScreen'
      }
    });
  };

  const handleChangeTheme = () => {
    if (theme.type === "dark") {
      dispatch(setLightTheme());
    } else {
      dispatch(setDarkTheme());
    }
  }

  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('profile'),
      onLeftPress: () => {dispatch(changeTheme())},
      leftIcon: 'theme-light-dark',
      onRightPress: () => { pushScreen(props.componentId, "Settings"); },
      rightIcon: 'cog',
      shadow: false
    }}
    bottomBar={true}
      compId={props.componentId}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scroller}
        contentContainerStyle={{alignItems: "center"}}
      >
        <ProfilePictureContainer image={userStudent.profilePicture}/>
        <ProfileNameText userName={userStudent.username}/>
        <SocialStatistics
          initiativesNum={12}
          followersNum={487}
          followingNum={126}
        />
        <View style={styles.horizontalRuler}/>
        <WalletSection balanceAmount={349} onTopUpPress={() => pushScreen(props.componentId, "StudentWalletScreen")}/>
        <AboutSection aboutText={aboutText}/>
        <InterestsSection interestsArray={interestsArray}/>
        <View style={{height: 200}}/>
      </ScrollView>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.padding.default,
  },
  scroller: {
    flex: 1,
    backgroundColor: theme.background,
    width: "100%",
    height: "100%"
  },
  horizontalRuler: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: theme.lightGrey,
    marginTop: 16
  }
});

export default StudentProfileScreen;