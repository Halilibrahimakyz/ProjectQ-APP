import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/constants/colors';
import { CustomSeparator, CustomModal } from '@/components';

const CustomPicker = ({ label, value, onChange, placeholder, error, options, icon = 'pencil' }) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const [isFocused, setIsFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const labelTranslateY = useSharedValue(0);
    const labelScale = useSharedValue(1);
    const labelOpacity = useSharedValue(0);
    const shakeAnimation = useSharedValue(0);

    useEffect(() => {
        console.log("valuegender: ",value)
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

    const handleFocus = () => {
        setIsFocused(true);
        setModalVisible(true);
    };

    const handleBlur = () => {
        setModalVisible(false);
        setIsFocused(false);
    };

    const handleSelect = (selectedValue) => {
        onChange(selectedValue);
        setModalVisible(false);
        setIsFocused(false);
    };

    const getLabel = (value) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : placeholder;
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.row, animatedRowStyle]}>
                <View style={[styles.iconContainer, { backgroundColor: error ? theme.red :value ? theme.primary : theme.lightGrey, borderColor: error ? theme.red :value ? theme.primary : theme.lightGrey }]}>
                    <MaterialCommunityIcons name={icon} color={theme.background} size={24} />
                </View>
                <TouchableOpacity onPress={handleFocus} style={[styles.inputContainer, error && styles.inputError,{borderColor:error ? theme.red :value ? theme.primary : theme.lightGrey}]}>
                    <Text style={[styles.input, { color: value ? theme.secondary : theme.lightGrey }]}>
                        {getLabel(value)}
                    </Text>
                    <Animated.Text style={[styles.label, animatedLabelStyle,{ color:error ? theme.red :value ? theme.primary : theme.lightGrey}]}>
                        {label}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
            <CustomModal visible={modalVisible} onClose={handleBlur}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item, index }) => (
                        <>
                            <TouchableOpacity onPress={() => handleSelect(item.value)} style={styles.option}>
                                <Text style={styles.optionText}>{item.label}</Text>
                                <View style={[styles.circle, item.value === value && styles.selectedCircle]} />
                            </TouchableOpacity>
                            {index < options.length - 1 && <CustomSeparator />}
                        </>
                    )}
                />
            </CustomModal>
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginVertical: 5,
        position: 'relative',
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
        // borderColor: theme.primary,
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
        // borderColor: theme.primary,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: theme.background,
        borderRadius: 10,
        alignItems: 'center',
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    optionText: {
        fontSize: 18,
        color: theme.secondary,
    },
    optionIcon: {
        marginLeft: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.lightGrey,
        backgroundColor: theme.background,
    },
    selectedCircle: {
        backgroundColor: theme.primary,
        borderColor: theme.primary,
    },
});

export default CustomPicker;
