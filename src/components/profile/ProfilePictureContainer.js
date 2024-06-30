import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfilePictureContainer = ({image}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme])

console.log("image",image)
  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: image }}
          style={{width: "100%", height: "100%"}}
          resizeMode='cover'
        />
      </View>
      <View style={styles.editPictureButton}>
        <MaterialCommunityIcons name="pencil" color={theme.white} size={18} />
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    marginTop: 20
  },
  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "darkgray",
    borderRadius: 60,
    overflow: "hidden"
  },
  editPictureButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.primary,
    position: "absolute",
    right: 0,
    bottom: 0
  }
});

export default ProfilePictureContainer;