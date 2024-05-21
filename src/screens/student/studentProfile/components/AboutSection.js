import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';



const AboutSection = ({aboutText}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About</Text>
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
    fontSize: theme.fontSize.large, 
    fontWeight: "bold"
  },
  body: {
    color: theme.secondary, 
    fontSize: theme.fontSize.medium, 
    marginTop: 6, 
    lineHeight: 24
  }
});

export default AboutSection;