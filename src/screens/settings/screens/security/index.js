import { StyleSheet, Dimensions, FlatList } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container, CustomSeparator, CustomButton } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';
import { popScreen } from '@/navigation/navigationFunctions';
import SettingsItem from '@/components/settings/SettingsItem';

const { width } = Dimensions.get('window');

const Security = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const optionsData = [
    {
      title: "Face ID",
      hasSwitch: true
    },
    {
      title: "Touch ID",
      hasSwitch: true
    },
    {
      title: "Remember Me",
      hasSwitch: true
    }
  ];

  return (
    <Container style={styles.container} topBarProps={{
      title: "Security",
      onLeftPress: () => popScreen(props.componentId),
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
    }}
      bottomBar={true}
      compId={props.componentId}
    >
      <SettingsItem
        title={"Face ID"}
        hasSwitch={true}
      />
      <CustomSeparator/>
      <SettingsItem
        title={"Touch ID"}
        hasSwitch={true}
      />
      <CustomSeparator/>
      <SettingsItem
        title={"Remember Me"}
        hasSwitch={true}
      />
      <CustomSeparator/>
      <CustomButton 
        style={styles.button}
        textStyle={styles.buttonText}
        title={"Change Password"}

      />
      <CustomButton 
        style={styles.button}
        textStyle={styles.buttonText}
        title={"Change PIN"}
      />
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingHorizontal: theme.padding.default,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: "gray"
  },
  button: {
    marginTop: 24,
    height: 54,
    backgroundColor: theme.background,
    borderColor: theme.primary,
    borderWidth: 2
  },
  buttonText: {
    color: theme.primary,
    fontSize: theme.fontSize.medium,
    fontWeight: "bold"
  }
});

export default Security;
