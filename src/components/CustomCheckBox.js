import React, { useState, useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/constants/colors';

const CustomCheckbox = forwardRef(({
    labelComponents,
    value,
    onValueChange,
    error,
    icon = 'checkbox-marked',
    uncheckedIcon = 'checkbox-blank-outline',
}, ref) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const [isChecked, setIsChecked] = useState(value);

    const shakeAnimation = useSharedValue(0);

    useEffect(() => {
        if (error) {
            shakeAnimation.value = withSequence(
                withTiming(5, { duration: 50 }),
                withRepeat(withSequence(withTiming(-5, { duration: 50 }), withTiming(5, { duration: 50 })), 3),
                withTiming(0, { duration: 50 })
            );
        }
    }, [error]);

    const animatedRowStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: shakeAnimation.value }],
        };
    });

    const handlePress = () => {
        setIsChecked(!isChecked);
        onValueChange(!isChecked);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.row, animatedRowStyle]}>
                <TouchableOpacity
                    style={[styles.iconContainer, { borderColor: error ? theme.red : isChecked ? theme.primary : theme.lightGrey }]}
                    onPress={handlePress}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name={isChecked ? icon : uncheckedIcon}
                        color={error ? theme.red : isChecked ? theme.primary : theme.lightGrey}
                        size={24}
                    />
                </TouchableOpacity>
                <View style={styles.labelContainer}>
                    {labelComponents.map((component, index) => (
                        <Text
                            key={index}
                            onPress={component.onPress}
                            style={[
                                styles.label,
                                { color: error ? theme.red : isChecked || component.onPress ? theme.primary : theme.lightGrey },
                                component.onPress ? styles.link : null
                            ]}
                        >
                            {component.text}
                        </Text>
                    ))}
                </View>
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
});

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginVertical: 20,
        position: 'relative',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    labelContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1, // This will help the container to shrink
    },
    label: {
        fontSize: theme.fontSize.medium,
        flexShrink: 1, // This will help the text to shrink instead of overflowing
    },
    link: {
        textDecorationLine: 'underline',
    },
    error: {
        color: theme.red,
        marginTop: 5,
        fontSize: theme.fontSize.small,
        marginLeft: 45,
    },
});

export default CustomCheckbox;
