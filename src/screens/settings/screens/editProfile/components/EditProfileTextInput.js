import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const EditProfileTextInput = ({ title, icon }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
        />
        <MaterialCommunityIcons name={icon} color={theme.lightGrey} size={26} />
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20
  },
  inputTitle: {
    marginLeft: 24,
    color: theme.lightGrey,
    fontWeight: "bold"
  },
  inputContainer: {
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    borderRadius: width,
    borderColor: theme.primary,
    borderWidth: 2,
    height: 44,
  },
  inputStyle: {
    flex: 1,
    color: theme.secondary,
    fontSize: theme.fontSize.body,
    fontWeight: "bold",
  }
});

export default EditProfileTextInput;