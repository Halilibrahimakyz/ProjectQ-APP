import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { Container, CustomButton, DynamicSVG } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, setFormData, setError, clearErrors, clearError, resetForm } from '@/storeReduxToolkit/studentFormSlice';
import { validateStep, handleValidation } from './utils/validation';
import { LocationStep, PersonalInfoStep, PersonalInfoStepTwo, InterestStep } from './components'
import { loginStudent } from '@/services'
import { CustomTextInput, ProfilePicturePicker } from '@/components';

const LoginStudentScreen = props => {

    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
        const response = await loginStudent(formData);

    };

    const handleBack = () => {
        popScreen(props.componentId);
    };

    const onHandleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' }); // clear error for the field
        }
    };


    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <Container
            style={styles.container}
            topBarProps={{
                title: 'Login',
                onLeftPress: () => { handleBack() },
                leftIcon: 'arrow-left',
                onRightPress: () => { console.log('Sağ tıklandı'); },
            }}
            compId={props.componentId}
        >
            <View style={styles.content}>
                <CustomTextInput
                    ref={emailRef}
                    icon="email"
                    label={getVal('email_label')}
                    value={formData.email}
                    onChangeText={(text) => onHandleChange('email', text)}
                    placeholder={getVal('email_placeholder')}
                    error={errors.email}
                    secureTextEntry={false}
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current.focus()}
                />
                <CustomTextInput
                    ref={passwordRef}
                    icon="lock"
                    label={getVal('password_label')}
                    value={formData.password}
                    onChangeText={(text) => onHandleChange('password', text)}
                    placeholder={getVal('password_placeholder')}
                    error={errors.password}
                    secureTextEntry={true}
                    returnKeyType="done"
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                        styles.button,
                        {
                            width: '100%',
                            borderRadius: 30,
                            backgroundColor: theme.primary,
                        },
                    ]}
                >
                    <Text style={styles.buttonText}>{getVal("next")}</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        paddingHorizontal: theme.padding.default,
    },
    content: {
        flex: 1,
        width: '100%',
        paddingVertical: 10
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.3,
    },
    buttonText: {
        fontSize: theme.fontSize.button,
        color: theme.background,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    error: {
        color: 'red',
    },
});
export default LoginStudentScreen;