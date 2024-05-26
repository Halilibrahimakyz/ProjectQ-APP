import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useLanguage } from '@/constants/language';
import { useTheme } from '@/constants/colors';
import { CustomTextInput  } from '@/components';
import _ from 'lodash';

const PersonalInfoStep = ({ formData, errors, handleChange }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();

    const onHandleChange = (field, value) => {
        handleChange(field, value);
    };

    return (
        <View style={styles.container}>
           <CustomTextInput
                label={getVal('name_label') || 'name'}
                value={formData.name}
                onChangeText={(text) => onHandleChange('name', text)}
                placeholder={getVal('name_placeholder') || 'name'}
                error={errors.name}
                secureTextEntry={true}
            />
            <CustomTextInput
                label={getVal('surname_label') || 'surname'}
                value={formData.surname}
                onChangeText={(text) => onHandleChange('surname', text)}
                placeholder={getVal('surname_placeholder') || 'surname'}
                error={errors.surname}
            />
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    input: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.lightGrey,
        color: theme.secondary,
        backgroundColor: theme.background,
    },
    error: {
        color: 'red',
    },
});

export default PersonalInfoStep;
