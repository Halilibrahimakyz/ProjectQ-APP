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

    const labelTranslateY = useSharedValue(0);
    const labelScale = useSharedValue(1);
    const labelOpacity = useSharedValue(0);
    const shakeAnimation = useSharedValue(0);

    useEffect(() => {
        if (isFocused || value) {
            labelTranslateY.value = withTiming(-20);
            labelScale.value = withTiming(1);
            labelOpacity.value = withTiming(1);
        } else {
            labelTranslateY.value = withTiming(0);
            labelScale.value = withTiming(0);
            labelOpacity.value = withTiming(0);
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
            transform: [
                { translateY: labelTranslateY.value },
                { scale: labelScale.value },
            ],
            opacity: labelOpacity.value,
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
                <View style={[styles.iconContainer, { backgroundColor: error ? theme.red : theme.primary, borderColor: error ? theme.red : theme.primary }]}>
                    <MaterialCommunityIcons name={icon} color={theme.background} size={24} />
                </View>
                <View style={[styles.inputContainer, { borderTopRightRadius: secureTextEntry ? 0 : 10, borderBottomRightRadius: secureTextEntry ? 0 : 10, borderRightWidth: secureTextEntry ? 0 : StyleSheet.hairlineWidth, borderColor: error ? theme.red : theme.primary }]}>
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
                    <Animated.Text style={[styles.label, animatedLabelStyle, { color: error ? theme.red : theme.primary }]}>
                        {label}
                    </Animated.Text>
                </View>
                {secureTextEntry && (
                    <TouchableOpacity onPress={toggleSecureEntry} activeOpacity={1} style={[styles.iconContainerRight,{ borderColor: error ? theme.red : theme.primary}]}>
                        <MaterialCommunityIcons name={isSecure ? "eye-off" : "eye"} color={theme.lightGrey} size={24} />
                    </TouchableOpacity>
                )}
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
});

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginVertical: 5,
        position: 'relative',
        width:'100%',
    },
    label: {
        color: theme.primary,
        position: 'absolute',
        top: 10,
        left: 0,
        backgroundColor: theme.background,
        paddingHorizontal: 5,
        fontSize:theme.fontSize.small
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
        position: 'relative',
        height:50
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
        marginRight: 10,
        color: theme.secondary,
        backgroundColor: theme.background,
        
    },
    inputError: {
        borderColor: theme.red,
    },
    error: {
        color: theme.red,
        marginTop: 5,
        fontSize: theme.fontSize.small,
        marginLeft: 45,
    },
});

export default CustomTextInput;
