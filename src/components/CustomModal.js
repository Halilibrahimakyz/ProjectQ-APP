import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/constants/colors';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const CustomModal = ({ visible, onClose, children }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 300 });
            scale.value = withSpring(1, { damping: 15 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            scale.value = withTiming(0.8, { duration: 300 });
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.modalContent, animatedStyle]}>
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const getStyles = (theme) => StyleSheet.create({
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
        // padding: 20,
    },
});

export default CustomModal;
