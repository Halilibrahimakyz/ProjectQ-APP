import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@/constants/colors';
import { changeIndex } from '@/storeReduxToolkit/tabIndexSlice';
import { navigateToTab, showModal } from '@/navigation/navigationFunctions';
import { useAuth } from '@/functions/authenticate';

const CustomTabBar = ({ componentId }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const dispatch = useDispatch();
  const { userType } = useAuth();
  const selectedTab = useSelector((state) => state.tabIndex.value);

  const navigateToScreen = (screenName, index) => {
    dispatch(changeIndex(index));
    navigateToTab(componentId, index);
  };

  const openModal = (screenName) => {
    showModal(screenName, {}, { title: 'Create' });
  };

  const TabButton = ({ screenName, icon, index, selectedIcon, onPress }) => (
    <TouchableOpacity style={styles.buttons} onPress={onPress || (() => navigateToScreen(screenName, index))}>
      <MaterialCommunityIcons
        name={selectedTab === index ? selectedIcon : icon}
        color={selectedTab === index ? theme.primary : theme.lightGrey}
        size={24}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {userType === 'supporter' ? (
        <>
          <TabButton screenName="SupporterHomeScreen" icon="home-outline" selectedIcon="home" index={0} />
          <TabButton screenName="SupporterListScreen" icon="format-list-bulleted" selectedIcon="format-list-bulleted" index={1} />
          <TabButton screenName="SupporterHistoryScreen" icon="clipboard-text-clock-outline" selectedIcon="clipboard-text-clock-outline" index={2} />
          <TabButton screenName="SupporterMessagesScreen" icon="message-processing-outline" selectedIcon="message-processing" index={3} />
          <TabButton screenName="SupporterProfileScreen" icon="account-outline" selectedIcon="account" index={4} />
        </>
      ) : (
        <>
          <TabButton screenName="StudentHomeScreen" icon="home-outline" selectedIcon="home" index={0} />
          <TabButton screenName="StudentListScreen" icon="format-list-bulleted" selectedIcon="format-list-bulleted" index={1} />
          <TabButton
            screenName="StudentCreateScreen"
            icon="plus-box-outline"
            selectedIcon="plus-box-outline"
            index={2}
            onPress={() => openModal('StudentCreateScreen')}
          />
          <TabButton screenName="StudentMessagesScreen" icon="message-processing-outline" selectedIcon="message-processing" index={3} />
          <TabButton screenName="StudentProfileScreen" icon="account-outline" selectedIcon="account" index={4} />
        </>
      )}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:theme.dimensions.bottomTabsHeight,
    paddingHorizontal: 10,
  },
  buttons: {
    padding: 10,
  },
});

export default CustomTabBar;
