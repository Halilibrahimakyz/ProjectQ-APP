import { Text, StyleSheet, ScrollView, View, Image, Dimensions, FlatList } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container, CustomSeparator } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';
import { popScreen } from '@/navigation/navigationFunctions';

import SettingsItem from '@/components/settings/SettingsItem';

import SocialsButton from './components/SocialsButton'

const { width } = Dimensions.get('window');

const Help = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const itemsData = [
    {
      title: "FAQ",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: "Contact Us",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: "Terms & Conditions",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,

    },
    {
      title: "Privacy Policy",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
    {
      title: "About Us",
      hasChevron: true,
      iconColor: theme.primary,
      containerColor: theme.primarySupport,
    },
  ];

  return (
    <Container style={styles.container} topBarProps={{
      title: "Help",
      onLeftPress: () => popScreen(props.componentId),
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
    }}
      bottomBar={true}
      compId={props.componentId}
    >
      <View style={{flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: "center", marginBottom: 12}}>
        <SocialsButton title={"Instagram"} icon={"instagram"}/>
        <SocialsButton title={"Twitter"} icon={"twitter"}/>
        <SocialsButton title={"Website"} icon={"earth"}/>
        <SocialsButton title={"YouTube"} icon={"youtube"}/>
      </View>
      <FlatList
        data={itemsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <CustomSeparator />
            <SettingsItem {...item} />
          </>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: theme.padding.default,
  }
});

export default Help;
