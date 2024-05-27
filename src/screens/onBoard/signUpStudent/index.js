import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, StatusBar } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { Container, CustomButton, DynamicSVG } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, setFormData, setError, clearErrors, clearError } from '@/storeReduxToolkit/studentFormSlice';
import { validateStep, handleValidation } from './utils/validation';
import { LocationStep, PersonalInfoStep,PersonalInfoStepTwo } from './components'

const SignUpStudentScreen = props => {

    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();
    const dispatch = useDispatch();
    const { step, formData, errors } = useSelector((state) => state.studentForm);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    const steps = [
        { keys: ['country'], component: LocationStep },
        { keys: ['profilePicture','username', 'name', 'surname', 'email', 'password', 'rePassword'], component: PersonalInfoStep },
        { keys: ['phoneNumber', 'identificationNumber', 'gender', 'birthDate', 'city', 'school', 'department'], component: PersonalInfoStepTwo },
    ];

    useEffect(() => {
        const currentStep = steps[step - 1];
        const { isValid } = validateStep(formData, currentStep.keys, getVal);
        setIsNextEnabled(isValid);
    }, [formData, step]);


    const handleNext = () => {
        if (isNextEnabled) {
            if (step < steps.length) {
                const currentStep = steps[step];
                dispatch(clearErrors(currentStep.keys));
                dispatch(nextStep());
            } else {
                console.log("formData: ",formData)
                alert('Form submitted successfully!');
            }
        }
    };

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const handleChange = (key, value) => {
        dispatch(setFormData({ [key]: value }));
        // console.log('validate, key, value', key, value); // Debug log
        const error = handleValidation(formData,key, value, getVal);
        if (error) {
            dispatch(setError({ [key]: error }));
        } else {
            dispatch(clearError(key));
        }
    };

    const stepProps = {
        formData,
        errors,
        handleChange,
    };
    const CurrentStepComponent = steps[step - 1].component;
    return (
        <Container
            style={styles.container}
            topBarProps={{
                title: 'Choose your Location',
                onLeftPress: () => { popScreen(props.componentId); },
                leftIcon: 'arrow-left',
                onRightPress: () => { console.log('Sağ tıklandı'); },
            }}
            compId={props.componentId}
        >
            <View style={styles.content}>
                <CurrentStepComponent {...stepProps} />
            </View>
            <View style={styles.buttonContainer}>
                {step > 1 && (
                    <TouchableOpacity
                        onPress={handlePrev}
                        style={[styles.button, { width: '49.5%', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }]}
                    >
                        <Text style={styles.buttonText}>{getVal("back")}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={handleNext}
                    style={[
                        styles.button,
                        {
                            width: step > 1 ? '49.5%' : '100%',
                            borderRadius: step > 1 ? 0 : 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                            backgroundColor: isNextEnabled ? theme.primary : theme.lightGrey,
                        },
                    ]}
                    disabled={!isNextEnabled}
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
        alignItems: 'center',
        width: '100%',
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
export default SignUpStudentScreen;