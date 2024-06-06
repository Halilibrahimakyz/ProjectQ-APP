import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/constants/colors';
import moment from 'moment';

const CustomDatePicker = ({ label, value, onChange, placeholder, error, icon = 'calendar', minAge }) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const [isFocused, setIsFocused] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const labelTranslateY = useSharedValue(0);
    const labelScale = useSharedValue(1);
    const labelOpacity = useSharedValue(0);
    const shakeAnimation = useSharedValue(0);

    useEffect(() => {
        if (isFocused || value) {
            labelTranslateY.value = withTiming(-20);
            labelScale.value = withTiming(0.8);
            labelOpacity.value = withTiming(1);
        } else {
            labelTranslateY.value = withTiming(0);
            labelScale.value = withTiming(1);
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

    const handleConfirm = (date) => {
        setDatePickerVisibility(false);
        onChange(date.toISOString());
    };

    const handleCancel = () => {
        setDatePickerVisibility(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setDatePickerVisibility(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setDatePickerVisibility(false);
    };

    const formattedDate = value ? moment(value).format('DD/MM/YYYY') : '';

    // Calculate the maximum date based on the minAge prop
    const maxDate = minAge ? moment().subtract(minAge, 'years').toDate() : undefined;

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.row, animatedRowStyle]}>
                <View style={[styles.iconContainer, { backgroundColor: error && value ? theme.red : theme.primary, borderColor: error && value ? theme.red : theme.primary }]}>
                    <MaterialCommunityIcons name={icon} color={theme.background} size={24} />
                </View>
                <TouchableOpacity onPress={handleFocus} style={[styles.inputContainer, error && styles.inputError]}>
                    <Text style={[styles.input, { color: value ? theme.secondary : theme.lightGrey }]}>
                        {value ? formattedDate : placeholder}
                    </Text>
                    <Animated.Text style={[styles.label, animatedLabelStyle,{ color: error  ? theme.red : theme.primary}]}>
                        {label}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                maximumDate={maxDate} // Set the maximum date
                cancelTextStyle={{ color: theme.primary }}
                confirmTextStyle={{ color: theme.primary }}
                customHeaderIOS={() => (
                    <View style={[styles.modalHeader, { backgroundColor: theme.primary }]}>
                        <Text style={styles.modalHeaderText}>Select Date</Text>
                    </View>
                )}
            />
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginBottom: 20,
        position: 'relative',
    },
    label: {
        color: theme.secondary,
        position: 'absolute',
        top: 10,
        left: 0,
        backgroundColor: theme.background,
        paddingHorizontal: 5,
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
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 5,
        height: 50,
        borderRightWidth: StyleSheet.hairlineWidth,
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
    input: {
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
    modalHeader: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalHeaderText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CustomDatePicker;
