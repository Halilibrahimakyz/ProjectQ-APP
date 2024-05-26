import { Text, View, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';

const AboutSection = ({ aboutText }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{getVal('profile_about')}</Text>
      <Text style={styles.body}>{aboutText}</Text>
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
  header: {
    color: theme.secondary, 
    fontSize: theme.fontSize.title, 
    fontWeight: "bold"
  },
  body: {
    color: theme.secondary, 
    fontSize: theme.fontSize.medium, 
    marginTop: 6, 
  }
});

export default AboutSection;