import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const WalletActionButton = ({ borderColor, bgColor, textColor, icon, title }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: bgColor, borderColor: borderColor}]}>
      <MaterialCommunityIcons name={icon} color={textColor} size={12}/>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "48%",
    height: 46,
    backgroundColor: "red",
    borderRadius: 23,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonText: {
    color: theme.secondary,
    fontSize: theme.fontSize.medium,
    marginLeft: 6,
  }
});

export default WalletActionButton;