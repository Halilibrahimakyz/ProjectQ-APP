import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTopBar = ({ 
  title, 
  onLeftPress, 
  leftIcon, 
  onRightPress, 
  rightIcon, 
  shadow, 
  style, 
  textStyle, 
  buttonColor,
  isAbsolute 
}) => {
    const theme = useTheme();
    const styles = getStyles(theme, shadow, isAbsolute);
    
    return (
        <View style={[styles.container, style]}>
            <View style={styles.iconPlaceholder}>
                {leftIcon && (
                    <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
                        <MaterialCommunityIcons
                            name={leftIcon}
                            color={buttonColor ? buttonColor : theme.primary}
                            size={28}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={[styles.title, textStyle]}>{title}</Text>
            <View style={styles.iconPlaceholder}>
                {rightIcon && (
                    <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                        <MaterialCommunityIcons
                            name={rightIcon}
                            color={buttonColor ? buttonColor : theme.primary}
                            size={28}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const getStyles = (theme, shadow, isAbsolute) => StyleSheet.create({
    container: {
        height: 60,
        marginTop:theme.dimensions.statusBarHeight,
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
        ...(isAbsolute && {
            position: 'absolute',
            top: theme.dimensions.statusBarHeight,
            left: 0,
            right: 0,
            zIndex: 10,
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
    iconPlaceholder: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomTopBar;
