import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { Container, CustomButton, DynamicSVG } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, setFormData, setError, clearErrors, clearError, resetForm } from '@/storeReduxToolkit/studentFormSlice';
import { validateStep, handleValidation } from './utils/validation';
import { LocationStep, PersonalInfoStep, PersonalInfoStepTwo, InterestStep } from './components'
import { signupStudent } from '@/services'
import { loginSuccess } from '@/storeReduxToolkit/userStudentSlice';

const SignUpStudentScreen = props => {

    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();
    const dispatch = useDispatch();
    const { step, formData, errors } = useSelector((state) => state.studentForm);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    const steps = [
        { keys: ['country'], component: LocationStep },
        { keys: ['profilePicture', 'username', 'name', 'surname', 'email', 'password', 'rePassword'], component: PersonalInfoStep },
        { keys: ['phoneNumber', 'idNumber', 'gender', 'birthDate', 'city', 'school', 'department'], component: PersonalInfoStepTwo },
        { keys: ['interests'], component: InterestStep },
    ];

    useEffect(() => {
        const validateCurrentStep = async () => {
            const currentStep = steps[step - 1];
            const { isValid } = await validateStep(formData, currentStep.keys, getVal);
            setIsNextEnabled(isValid);
        };

        validateCurrentStep();
    }, [formData, step]);

    useEffect(() => {
        const backAction = () => {
            if (step > 1) {
                handlePrev();
                return true; // Geri tuşunun varsayılan davranışını engeller
            } else {
                dispatch(resetForm());
                popScreen(props.componentId);
                return true; // Geri tuşunun varsayılan davranışını engeller
            }
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Etkinlik dinleyicisini temizle
    }, [step]);

    const handleNext = async () => {
        const currentStep = steps[step - 1];
        if (isNextEnabled) {
            const { isValid, errors } = await validateStep(formData, currentStep.keys, getVal);
            if (!isValid) {
                for (const key in errors) {
                    dispatch(setError({ [key]: errors[key] }));
                }
            } else if (step < steps.length) {
                dispatch(clearErrors(currentStep.keys));
                dispatch(nextStep());
            } else {
                const response = await signupStudent(formData);
                const { student } = response;
                const userInfo = {
                    username: student.user.username,
                    name: student.user.name,
                    surname: student.user.surname,
                    email: student.user.email,
                    profilePicture: student.user.profilePicture,
                    idNumber: student.user.idNumber,
                    phoneNumber: student.user.phoneNumber,
                    gender: student.user.gender,
                    country: student.user.country,
                    city: student.user.city,
                    birthDate: student.user.birthDate,
                    bio: student.user.bio,
                    identificate: student.user.identificate,
                    isActive: student.user.isActive,
                    userType: student.user.userType,
                    interests: student.user.interests,
                    school: student.school,
                    studentClass: student.class,
                    department: student.department,
                    gpa: student.gpa,
                    verification: student.verification,
                    goals: student.goals,
                };

                dispatch(loginSuccess(userInfo));
                setRootScreen({ isLoggedIn: true, userType: "student" });
                alert('Form submitted successfully!');
            }
        } else {
            const { isValid, errors } = await validateStep(formData, currentStep.keys, getVal);
            if (!isValid) {
                for (const key in errors) {
                    dispatch(setError({ [key]: errors[key] }));
                }
            }
        }
    };

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const handleChange = async (key, value) => {
        dispatch(setFormData({ [key]: value }));
        // console.log('validate, key, value', key, value); // Debug log
        const error = await handleValidation(formData, key, value, getVal);
        console.log("errorvalidate: ", error)
        if (error) {
            dispatch(setError({ [key]: error }));
        } else {
            dispatch(clearError(key));
        }
    };

    const handleBack = () => {
        dispatch(resetForm());
        popScreen(props.componentId);
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
                onLeftPress: () => { handleBack() },
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
                // disabled={!isNextEnabled}
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
        marginVertical: 20,
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