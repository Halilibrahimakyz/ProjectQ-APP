import React, { useMemo } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container, CustomSeparator } from '@/components';
import { popScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { setDarkTheme, setLightTheme } from '@/storeReduxToolkit/themeSlice';
import { logout } from '@/storeReduxToolkit/userStudentSlice';
import SettingsItem from './components/SettingsItem';

const StudentSettingsScreen = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const language = useSelector((state) => state.language.value);
  const { getVal, changeLanguage } = useLanguage();
  const dispatch = useDispatch();

  const handleSetDarkTheme = () => dispatch(setDarkTheme());
  const handleSetLightTheme = () => dispatch(setLightTheme());

  const handleChangeTheme = () => {
    theme.type === 'dark' ? handleSetLightTheme() : handleSetDarkTheme();
  };

  const handleChangeLanguage = () => {
    changeLanguage(language === 'tr' ? 'en' : 'tr');
  };

  const handleLogout = () => {
    dispatch(logout());
    setRootScreen({ isLoggedIn: false, userType: null });
  };

  const settingsData = [
    {
      title: getVal('settings_edit_profile'),
      icon: "account",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: getVal('settings_notifications'),
      icon: "bell",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: getVal('settings_security'),
      icon: "lock",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: getVal('settings_change_language'),
      icon: "translate",
      hasChevron: false,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
      onPress: handleChangeLanguage,
    },
    {
      title: getVal('settings_help'),
      icon: "information",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: getVal('settings_invite_friends'),
      icon: "account-multiple",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: getVal('settings_logout'),
      icon: "exit-to-app",
      hasChevron: false,
      iconColor: theme.red,
      containerColor: theme.redSupport,
      onPress: handleLogout,
    },
  ];

  return (
    <Container
      style={styles.container}
      topBarProps={{
        title: getVal('settings'),
        onLeftPress: () => popScreen(props.componentId),
        leftIcon: 'arrow-left',
        onRightPress: () => console.log('Sağ tıklandı'),
        shadow: false,
      }}
      compId={props.componentId}
    >
      <FlatList
        data={settingsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <SettingsItem {...item} />
            <CustomSeparator />
          </>
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={{ height: 50 }} />
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.padding.default,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default StudentSettingsScreen;
