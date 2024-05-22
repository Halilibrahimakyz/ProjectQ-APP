import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsItem = ({title, onPress, icon, hasChevron, containerColor, iconColor}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme])


  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.nameIconContainer}>
        <View style={[styles.iconContainer, {backgroundColor: containerColor}]}>
          <MaterialCommunityIcons name={icon} color={iconColor} size={26} />
        </View>
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {hasChevron ? <MaterialCommunityIcons name="chevron-right" color={theme.primary} size={26} /> : <View/>}
    </TouchableOpacity>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%", 
    height: 85, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  nameIconContainer: {
    flexDirection: "row", 
    justifyContent: "flex-start", 
    alignItems: "center"
  },
  iconContainer: {
    width: 56, 
    height: 56, 
    backgroundColor: "#d3e3d4", 
    borderRadius: 28, 
    justifyContent: "center", 
    alignItems: "center"
  },
  settingText: {
    color: theme.secondary, 
    fontSize: theme.fontSize.medium, 
    fontWeight: "bold", 
    marginLeft: 16
  },
});

export default SettingsItem;