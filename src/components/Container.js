import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/constants/colors';
import { CustomTopBar } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';

const Container = ({ children, style, topBarProps, bottomBar }) => {

    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            {topBarProps && <CustomTopBar {...topBarProps} />}
            <View style={[styles.container, style]}>
                {children}
            </View>
            {bottomBar && <View style={styles.bottomTabsContainer}>
            </View>}

        </SafeAreaView>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bottomTabsContainer: {
        height: 60, // Alt sekmelerin yüksekliği
        backgroundColor: theme.background,
        borderTopColor: theme.lightgrey,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default Container;
