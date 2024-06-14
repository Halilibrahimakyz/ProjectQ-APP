import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import InterestComponent from './InterestComponent';

const InterestsSection = ({ interestsArray }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{getVal('profile_interests')}</Text>
        <MaterialCommunityIcons name="pencil" color={theme.primary} size={22} style={{ marginLeft: 10 }} />
      </View>
      <View style={styles.interestsContainer}>
        {interestsArray.map((interest, index) => (
          <InterestComponent key={index} interest={interest}/>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    marginTop: 22,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerText: {
    color: theme.secondary,
    fontSize: theme.fontSize.medium,
    fontWeight: "bold"
  },
  interestsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6
  }
});

export default InterestsSection;