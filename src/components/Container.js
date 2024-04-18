import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/constants/colors';
import { CustomTopBar } from '@/components';

const Container = ({ children, style, topBarProps }) => {
    
    const theme = useTheme();
    const styles = getStyles(theme);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            {topBarProps && <CustomTopBar {...topBarProps} />}
            <View style={[styles.container, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
});

export default Container;
