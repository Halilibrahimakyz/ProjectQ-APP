import React, { useMemo, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { useTheme } from '@/constants/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

const CustomSwitch = ({ isOn }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const [isOnState, setIsOnState] = useState(isOn);

    const translateX = useSharedValue(isOn ? 24 : 0);
    const backgroundColor = useSharedValue(isOn ? theme.primary : theme.secondary);

    useEffect(() => {
        translateX.value = isOn ? 24 : 0;
        backgroundColor.value = isOn ? theme.primary : theme.secondary;
        setIsOnState(isOn);
    }, [isOn]);

    const toggleSwitch = () => {
        const newState = !isOnState;
        setIsOnState(newState);
        translateX.value = withTiming(newState ? 24 : 0, { duration: 200 });
        backgroundColor.value = withTiming(newState ? theme.primary : theme.secondary, { duration: 200 });
    };

    const circleAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }]
    }));

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            translateX.value,
            [0, 24],
            [theme.secondary, theme.primary]
        )
    }));

    return (
        <TouchableWithoutFeedback onPress={toggleSwitch}>
            <Animated.View style={[styles.container, containerAnimatedStyle]}>
                <Animated.View style={[styles.circle, circleAnimatedStyle]} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const getStyles = theme => StyleSheet.create({
    container: {
        width: 56,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        paddingHorizontal: 3,
        overflow: "hidden"
    },
    circle: {
        height: 26,
        width: 26,
        borderRadius: 14,
        backgroundColor: theme.white,
        elevation: 4
    }
});

export default CustomSwitch;
