import { Button, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setDarkTheme, setLightTheme } from '@/storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '@/storeReduxToolkit/userStudentSlice';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Navigation } from "react-native-navigation";
import RNRestart from 'react-native-restart';
import { setRootScreen } from '@/navigation/navigationFunctions';
import { Container } from '@/components';
import { popScreen, pushScreen } from '@/navigation/navigationFunctions';

import ProfilePictureContainer from './components/ProfilePictureContainer';
import ProfileNameText from './components/ProfileNameText';
import SocialStatistics from './components/SocialStatistics';
import WalletSection from './components/WalletSection';
import AboutSection from './components/AboutSection';
import InterestsSection from './components/InterestsSection';

const demoImage = require("@/assets/images/DemoSupporterProfilePicture.jpg");


const SupporterProfileScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const language = useSelector((state) => state.language.value);

  const { getVal } = useLanguage();

  const userSupporter = useSelector((state) => state.userSupporter);
  const userStudent = useSelector((state) => state.userStudent);

  const { changeLanguage } = useLanguage();

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

  const handleSetDarkTheme = () => {
    dispatch(setDarkTheme());
  };

  const handleSetLightTheme = () => {
    dispatch(setLightTheme());
  };

  const handleLogout = () => {
    dispatch(logout())
    setRootScreen({ isLoggedIn: false, userType: null });
  };

  return (
    <Container style={styles.container} topBarProps={{
      title: getVal("profile"),
      onLeftPress: () => { console.log('sol tıklandı'); },
      leftIcon: 'menu',
      onRightPress: () => { pushScreen(props.componentId, "SupporterSettingsScreen"); },
      rightIcon: 'cog',
      shadow: true
    }}
      compId={props.componentId}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scroller}
        contentContainerStyle={{alignItems: "center"}}
      >
        <ProfilePictureContainer image={demoImage}/>
        <ProfileNameText userName="Jane Doe"/>
        <SocialStatistics
          initiativesNum={6}
          followersNum={132}
          followingNum={435}
        />
        <View style={styles.horizontalRuler}/>
        <WalletSection balanceAmount={1479} onTopUpPress={() => pushScreen(props.componentId, "SupporterWalletScreen")}/>
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

export default SupporterProfileScreen;