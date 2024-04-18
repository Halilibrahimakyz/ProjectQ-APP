import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/constants/colors';

const CustomButton = ({ title, onPress, style, textStyle }) => {

    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const getStyles = theme => StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: theme.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.3,
    },
    text: {
        color: theme.background,
        fontSize: theme.fontSize.button,
    },
});

export default CustomButton;
