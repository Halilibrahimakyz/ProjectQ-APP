import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/constants/colors';

const CustomIcon = ({ icon, color }) => {
    const theme = useTheme();
    const iconColor = color || theme.secondary;

    return (
        <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name={icon} color={theme.primary} size={24} />
        </View>
    );
};

export default CustomIcon;
