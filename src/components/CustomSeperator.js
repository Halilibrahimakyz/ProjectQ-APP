import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/constants/colors';

const CustomSeparator = ({ text }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            {text && <Text style={styles.text}>{text}</Text>}
            <View style={styles.line} />
        </View>
    );
};


const getStyles = theme => StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: marginVertical,
    },
    line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.lightGrey,
    },
    text: {
        marginHorizontal: 10,
        color: theme.lightGrey,
    }
});

export default CustomSeparator;
