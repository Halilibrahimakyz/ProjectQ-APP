// Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/constants/colors';

const CustomLoader = () => {
    const theme = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor, // İsteğe bağlı: Loader arkaplanı
    },
  });
  

export default CustomLoader;
