import { StyleSheet, Dimensions, FlatList } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container, CustomSeparator } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';
import { popScreen } from '@/navigation/navigationFunctions';
import SettingsItem from '@/components/settings/SettingsItem';

const { width } = Dimensions.get('window');

const Notifications = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const optionsData = [
    {
      title: "Sound",
      hasSwitch: true,
      switchIsOn: true
    },
    {
      title: "Vibrate",
      hasSwitch: true,
      switchIsOn: true
    },
    {
      title: "New Tips Available",
      hasSwitch: true
    },
    {
      title: "New Service Available",
      hasSwitch: true
    }
  ];

  return (
    <Container style={styles.container} topBarProps={{
      title: "Notifications",
      onLeftPress: () => popScreen(props.componentId),
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
    }}
      bottomBar={true}
      compId={props.componentId}
    >
      <FlatList
        data={optionsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            {index > 0 && <CustomSeparator/>}
            <SettingsItem {...item}/>
          </>
        )}
        contentContainerStyle={styles.contentContainer}
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

export default Notifications;
