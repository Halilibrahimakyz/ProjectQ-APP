import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/constants/colors';

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const CustomTextInput = forwardRef(({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    secureTextEntry = false,
    icon = 'pencil',
    returnKeyType,
    onSubmitEditing
}, ref) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const [internalValue, setInternalValue] = useState(value);

    const labelOpacity = useSharedValue(0);
    const labelWidth = useSharedValue(0);
    const labelHeight = useSharedValue(0);
    const shakeAnimation = useSharedValue(0);

    useEffect(() => {
        if (isFocused || value) {
            labelOpacity.value = withTiming(1);
            labelWidth.value = withTiming(100);
            labelHeight.value = withTiming(20);
        } else {
            labelOpacity.value = withTiming(0);
            labelWidth.value = withTiming(0);
            labelHeight.value = withTiming(0);
        }
    }, [isFocused, value]);

    useEffect(() => {
        if (error) {
            shakeAnimation.value = withSequence(
                withTiming(5, { duration: 50 }),
                withRepeat(withSequence(withTiming(-5, { duration: 50 }), withTiming(5, { duration: 50 })), 3),
                withTiming(0, { duration: 50 })
            );
        }
    }, [error]);

    const animatedLabelStyle = useAnimatedStyle(() => {
        return {
            opacity: labelOpacity.value,
            width: labelWidth.value,
            height: labelHeight.value,
        };
    });

    const animatedRowStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: shakeAnimation.value }],
        };
    });

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const toggleSecureEntry = () => setIsSecure(!isSecure);

    const debouncedOnChangeText = useCallback(debounce(onChangeText, 300), [onChangeText]);

    const handleChangeText = (text) => {
        setInternalValue(text);
        debouncedOnChangeText(text);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.row, animatedRowStyle]}>
                <View style={[styles.iconContainer, { backgroundColor: error && value ? theme.red : theme.primary, borderColor: error && value ? theme.red : theme.primary }]}>
                    <MaterialCommunityIcons name={icon} color={theme.background} size={24} />
                    <Animated.Text style={[styles.label, animatedLabelStyle]}>
                        {label}
                    </Animated.Text>
                </View>
                <View style={[styles.inputContainer, { borderTopRightRadius: secureTextEntry ? 0 : 10, borderBottomRightRadius: secureTextEntry ? 0 : 10, borderRightWidth: secureTextEntry ? 0 : StyleSheet.hairlineWidth }]}>
                    <TextInput
                        ref={ref}
                        style={[styles.input, error && styles.inputError]}
                        value={internalValue}
                        onChangeText={handleChangeText}
                        placeholder={!isFocused && !value ? placeholder : ''}
                        placeholderTextColor={theme.lightGrey}
                        keyboardType={keyboardType}
                        autoCapitalize={autoCapitalize}
                        secureTextEntry={isSecure}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        returnKeyType={returnKeyType}
                        onSubmitEditing={onSubmitEditing}
                    />
                </View>
                {secureTextEntry && (
                    <TouchableOpacity onPress={toggleSecureEntry} activeOpacity={1} style={styles.iconContainerRight}>
                        <MaterialCommunityIcons name={isSecure ? "eye-off" : "eye"} color={theme.lightGrey} size={24} />
                    </TouchableOpacity>)}
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
});

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginBottom: 20,
        position: 'relative',
    },
    label: {
        color: theme.background,
        overflow: 'hidden',
        textAlign: 'right'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: theme.lightGrey,
        backgroundColor: theme.background,
    },
    iconContainer: {
        backgroundColor: theme.primary,
        height: '100%',
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.primary,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainerRight: {
        height: '100%',
        paddingHorizontal: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: theme.lightGrey,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        marginRight:10,
        color: theme.secondary,
        backgroundColor: theme.background,
    },
    inputError: {
        borderColor: theme.red,
    },
    error: {
        color: theme.red,
        marginTop: 5,
    },
});

export default CustomTextInput;
