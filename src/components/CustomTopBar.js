import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTopBar = ({ title, onLeftPress, leftIcon, onRightPress, rightIcon }) => {

    const theme = useTheme();
    const styles = getStyles(theme);
    
    return (
        <View style={styles.container}>
            {leftIcon && (
                <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
                    <MaterialCommunityIcons
                        name={leftIcon}
                        color={theme.primary}
                        size={35}
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
            {rightIcon ? (
                <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                    <MaterialCommunityIcons
                        name={rightIcon}
                        color={theme.primary}
                        size={35}
                    />
                </TouchableOpacity>
            ) : (<TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                <MaterialCommunityIcons
                    name={'menu'}
                    color={theme.background}
                    size={35}
                />
            </TouchableOpacity>)}
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.background,
        paddingHorizontal: 10,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
});

export default CustomTopBar;
