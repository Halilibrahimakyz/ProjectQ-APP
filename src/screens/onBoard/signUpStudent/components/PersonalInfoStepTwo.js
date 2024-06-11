import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useLanguage } from '@/constants/language';
import { useTheme } from '@/constants/colors';
import { CustomTextInput, CustomPicker, CustomDatePicker } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PersonalInfoStepTwo = ({ formData, errors, handleChange }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();

    const phoneNumberRef = useRef(null);
    const idNumberRef = useRef(null);
    const birthDateRef = useRef(null);
    const cityRef = useRef(null);
    const departmentRef = useRef(null);

    const onHandleChange = (field, value) => {
        handleChange(field, value);
    };

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' },
        { label: 'Option 5', value: 'option5' },
        { label: 'Option 6', value: 'option6' },
        { label: 'Option 7', value: 'option7' },
        { label: 'Option 8', value: 'option8' },
        { label: 'Option 9', value: 'option9' },
        { label: 'Option 10', value: 'option10' },
    ];

    const genderOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollView}
            enableOnAndroid={true}
            extraScrollHeight={100} // Adjust as needed
        >
            <CustomTextInput
                ref={phoneNumberRef}
                icon="phone"
                label={getVal('phoneNumber_label')}
                value={formData.phoneNumber}
                onChangeText={(text) => onHandleChange('phoneNumber', text)}
                placeholder={getVal('phoneNumber_placeholder')}
                error={errors.phoneNumber}
                secureTextEntry={false}
                returnKeyType="next"
                onSubmitEditing={() => phoneNumberRef.current.focus()}
            />
            <CustomTextInput
                ref={idNumberRef}
                icon="card-account-details"
                label={getVal('identificationNumber_label')}
                value={formData.idNumber}
                onChangeText={(text) => onHandleChange('idNumber', text)}
                placeholder={getVal('identificationNumber_placeholder')}
                error={errors.idNumber}
                secureTextEntry={false}
                returnKeyType="next"
                onSubmitEditing={() => idNumberRef.current.focus()}
            />
            <CustomPicker
                icon="gender-male-female"
                label={getVal('gender_label')}
                value={formData.gender}
                onChange={(text) => onHandleChange('gender', text)}
                placeholder={getVal('gender_placeholder')}
                error={errors.gender}
                options={genderOptions}
            />
            <CustomDatePicker
                icon="calendar"
                label={getVal('birthDate_label')}
                value={formData.birthDate}
                onChange={(date) => onHandleChange('birthDate', date)}
                placeholder={getVal('birthDate_placeholder')}
                error={errors.birthDate}
                minAge={18}
            />
            <CustomTextInput
                ref={cityRef}
                icon="city"
                label={getVal('city_label')}
                value={formData.city}
                onChangeText={(text) => onHandleChange('city', text)}
                placeholder={getVal('city_placeholder')}
                error={errors.city}
                secureTextEntry={false}                
            />
            <CustomPicker
                icon="school"
                label={getVal('school_label')}
                value={formData.school}
                onChange={(text) => onHandleChange('school', text)}
                placeholder={getVal('school_placeholder')}
                error={errors.school}
                options={options}
            />
            <CustomTextInput
                ref={departmentRef}
                icon="domain"
                label={getVal('department_label')}
                value={formData.department}
                onChangeText={(text) => onHandleChange('department', text)}
                placeholder={getVal('department_placeholder')}
                error={errors.department}
                secureTextEntry={false}
                returnKeyType="done"
                onSubmitEditing={() => departmentRef.current.focus()}
            />
        </KeyboardAwareScrollView>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical:10
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default PersonalInfoStepTwo;
