import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import CustomSwitch from '@/components/CustomSwitch';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsItem = ({title, onPress, icon, hasChevron, containerColor, iconColor, hasSwitch, switchIsOn}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme])


  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <View style={styles.nameAndIconContainer}>
        {icon && <View style={[styles.iconContainer, {backgroundColor: containerColor}]}>
          <MaterialCommunityIcons name={icon} color={iconColor} size={22} />
        </View>}
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {hasChevron ? <MaterialCommunityIcons name="chevron-right" color={theme.primary} size={22} /> : <View/>}
      {hasSwitch && <CustomSwitch isOn={switchIsOn}/>}
    </TouchableOpacity>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%", 
    height: 75, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  nameAndIconContainer: {
    flexDirection: "row", 
    justifyContent: "flex-start", 
    alignItems: "center"
  },
  iconContainer: {
    width: 46, 
    height: 46, 
    backgroundColor: "#1a1c1a", 
    borderRadius: 24, 
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