import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container } from '@/components';
import { popScreen, pushScreen } from '@/navigation/navigationFunctions';
import { setDarkTheme, setLightTheme } from '@/storeReduxToolkit/themeSlice';
import { loginSuccess, logout } from '@/storeReduxToolkit/userStudentSlice';
import { setRootScreen } from '@/navigation/navigationFunctions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SettingsItem from './components/SettingsItem';

const SupporterSettingsScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const language = useSelector((state) => state.language.value);

  const { getVal, changeLanguage } = useLanguage();

  const dispatch = useDispatch();

  const handleSetDarkTheme = () => {
    dispatch(setDarkTheme());
  };

  const handleSetLightTheme = () => {
    dispatch(setLightTheme());
  };

  const handleChangeTheme = () => {
    if (theme.type === "dark") {
      handleSetLightTheme();
    } else {
      handleSetDarkTheme();
    }
  }

  const handleChangeLanguage = () => {
    if (language === "tr"){
      changeLanguage("en");
    } else {
      changeLanguage("tr");
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    setRootScreen({ isLoggedIn: false, userType: null });
  };

  return (
    <Container style={styles.container} topBarProps={{
      title: 'Settings',
      onLeftPress: () => { popScreen(props.componentId); },
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu',
      shadow: false
    }}
      compId={props.componentId}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scroller}
        contentContainerStyle={{alignItems: "center"}}
      >
        <SettingsItem 
          title="Edit Profile" 
          icon="account" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Notification" 
          icon="bell" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Security" 
          icon="lock" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Change Theme" 
          icon="brightness-4" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
          onPress={handleChangeTheme}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Change Language" 
          icon="translate" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
          onPress={handleChangeLanguage}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Help" 
          icon="information" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Invite Friends" 
          icon="account-multiple" 
          hasChevron={true} 
          iconColor={theme.primary} 
          containerColor={"#d3e3d4"}
        />
        <View style={styles.horizontalRuler}/>
        <SettingsItem 
          title="Logout" 
          icon="exit-to-app" 
          hasChevron={false} 
          iconColor={"#b11313"} 
          containerColor={"#e3d3d3"}
          onPress={handleLogout}
        />
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
    height: 1,
    width: "100%",
    backgroundColor: theme.lightGrey,
  }
});

export default SupporterSettingsScreen;