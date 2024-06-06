import React, { useMemo,memo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/constants/colors';
import CustomTopBar from './CustomTopBar';

const Container = memo(({ children, style, topBarProps, bottomBar }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            {topBarProps && <CustomTopBar {...topBarProps} />}
            <View style={[styles.container, style]}>
                {children}
            </View>
            {bottomBar && <View style={styles.bottomTabsContainer}></View>}
        </SafeAreaView>
    );
});

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bottomTabsContainer: {
        height: 60,
        backgroundColor: theme.background,
        borderTopColor: theme.lightgrey,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default Container;