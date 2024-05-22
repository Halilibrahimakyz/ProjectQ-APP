import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';



const InterestComponent = ({interest}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{interest}</Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: theme.primary,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    marginVertical: 5
  },
  text: {
    color: theme.primary,
    fontSize: theme.fontSize.medium,
    fontWeight: "bold"
  }
});

export default InterestComponent;