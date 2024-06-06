import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container } from '@/components';
import { popScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { logout } from '@/storeReduxToolkit/userSupporterSlice';
import SettingsItem from './components/SettingsItem';
import {CustomSeparator} from '@/components';

const SupporterSettingsScreen = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const language = useSelector((state) => state.language.value);
  const { getVal, changeLanguage } = useLanguage();
  const dispatch = useDispatch();

  const handleChangeLanguage = () => {
    changeLanguage(language === 'tr' ? 'en' : 'tr');
  };

  const handleLogout = () => {
    dispatch(logout());
    setRootScreen({ isLoggedIn: false, userType: null });
  };

  const settingsData = useMemo(() => [
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
  ], [getVal, theme, language]);

  const renderItem = ({ item }) => (
    <SettingsItem {...item} />
  );

  return (
    <Container
      style={styles.container}
      topBarProps={{
        title: getVal('settings'),
        onLeftPress: () => popScreen(props.componentId),
        leftIcon: 'arrow-left',
        onRightPress: () => console.log('Right icon pressed'),
        shadow: false,
      }}
      compId={props.componentId}
    >
      <FlatList
        data={settingsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={CustomSeparator}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={7} // İlk yüklemede kaç eleman render edilecek
        maxToRenderPerBatch={5} // Her seferinde kaç eleman yüklenecek
        windowSize={10} // Kaç eleman önceden yüklenecek
      />
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.padding.default,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default SupporterSettingsScreen;
