import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SocialsButton = ({ title, icon }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} color={theme.white} size={52}/>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const getStyles = theme => StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    width: "44%",
    height: 130,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: theme.white,
    fontSize: theme.fontSize.medium,
    marginTop: 12
  }
});

export default SocialsButton;
