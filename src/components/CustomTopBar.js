import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTopBar = ({ title, onLeftPress, leftIcon, onRightPress, rightIcon ,shadow }) => {

    const theme = useTheme();
    const styles = getStyles(theme, shadow);
    console.log("shadow: ",shadow)
    return (
        <View style={styles.container}>
            {leftIcon && (
                <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
                    <MaterialCommunityIcons
                        name={leftIcon}
                        color={theme.primary}
                        size={28}
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
            {rightIcon ? (
                <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                    <MaterialCommunityIcons
                        name={rightIcon}
                        color={theme.primary}
                        size={28}
                    />
                </TouchableOpacity>
            ) : (<TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                <MaterialCommunityIcons
                    name={'menu'}
                    color={theme.background}
                    size={28}
                />
            </TouchableOpacity>)}
        </View>
    );
};

const getStyles = (theme, shadow) => StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.background,
        paddingHorizontal: 10,
        ...(shadow && {
            shadowColor: theme.lightgrey,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        }),
    },
    title: {
        color: theme.primary,
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
});

export default CustomTopBar;
