import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';



const ProfileNameText = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Text style={styles.profileName}>{props.userName}</Text>
  );
}

const getStyles = (theme) => StyleSheet.create({
  profileName: {
    color: theme.secondary,
    fontSize: theme.fontSize.heading,
    fontWeight: "bold",
    marginTop: 20,
  }
});

export default ProfileNameText;