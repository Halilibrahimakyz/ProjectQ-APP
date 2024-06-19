import React, { useMemo, useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useLanguage } from '@/constants/language';
import { useTheme } from '@/constants/colors';
import { CustomTextInput, CustomPicker, CustomDatePicker } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GET_CITIES, GET_UNIVERTIES } from '@/api/endpoints';
import { useFetch } from '@/services';

const PersonalInfoStepTwo = ({ formData, errors, handleChange }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();

    const phoneNumberRef = useRef(null);
    const idNumberRef = useRef(null);
    const occupationRef = useRef(null);
    const companyRef = useRef(null);
    const [formattedCities, setFormattedCities] = useState([]);
    const { data: citiesData } = useFetch(GET_CITIES, { countryCode: formData.country });

    useEffect(() => {
        if (citiesData && citiesData.success) {
            const formattedData = citiesData.data.map(city => ({
                label: city.label,
                value: city.value
            }));
            setFormattedCities(formattedData);
        }
    }, [citiesData]);

    const onHandleChange = (field, value) => {
        handleChange(field, value);
        console.log("field:",field)
        console.log("value:",value)
    };

    const genderOptions = [
        { label: getVal("male"), value: 'male' },
        { label: getVal("female"), value: 'female' },
        { label: getVal("idontwantspecify"), value: 'idontwantspecify' },
    ];

    const behalfCompanyOptions = [
        { label: getVal("yes"), value: 'yes' },
        { label: getVal("no"), value: 'no' },
    ];

    const wantsAnonymousOptions = [
        { label: getVal("yes"), value: 'yes' },
        { label: getVal("no"), value: 'no' },
    ];

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollView}
            enableOnAndroid={true}
            extraScrollHeight={100}
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
            <CustomPicker
                icon="city"
                label={getVal('city_label')}
                value={formData.city}
                onChange={(text) => onHandleChange('city', text)}
                placeholder={getVal('city_placeholder')}
                error={errors.city}
                options={formattedCities}
            />
            <CustomTextInput
                ref={occupationRef}
                icon="briefcase"
                label={getVal('occupation_label')}
                value={formData.occupation}
                onChangeText={(text) => onHandleChange('occupation', text)}
                placeholder={getVal('occupation_placeholder')}
                error={errors.occupation}
                secureTextEntry={false}
                returnKeyType="next"
                onSubmitEditing={() => occupationRef.current.focus()}
            />
            <CustomTextInput
                ref={companyRef}
                icon="office-building"
                label={getVal('company_label')}
                value={formData.company}
                onChangeText={(text) => onHandleChange('company', text)}
                placeholder={getVal('company_placeholder')}
                error={errors.company}
                secureTextEntry={false}
                returnKeyType="next"
                onSubmitEditing={() => companyRef.current.focus()}
            />
            <CustomPicker
                icon="account-group"
                label={getVal('behalfCompany_label')}
                value={formData.behalfCompany}
                onChange={(text) => onHandleChange('behalfCompany', text)}
                placeholder={getVal('behalfCompany_placeholder')}
                error={errors.behalfCompany}
                options={behalfCompanyOptions}
            />
            <CustomPicker
                icon="eye-off"
                label={getVal('wantsAnonymous_label')}
                value={formData.wantsAnonymous}
                onChange={(text) => onHandleChange('wantsAnonymous', text)}
                placeholder={getVal('wantsAnonymous_placeholder')}
                error={errors.wantsAnonymous}
                options={wantsAnonymousOptions}
            />
        </KeyboardAwareScrollView>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 10
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default PersonalInfoStepTwo;
