import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DrawerLeft = () => {
  return (
    <View style={styles.container}>
      <Text>Drawer Left Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

