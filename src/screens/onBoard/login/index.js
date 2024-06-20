import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { Container, CustomButton, DynamicSVG } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/services'
import { CustomTextInput } from '@/components';
import { loginSuccess as loginSuccessStudent } from '@/storeReduxToolkit/userStudentSlice';
import { loginSuccess as loginSuccessSupporter } from '@/storeReduxToolkit/userSupporterSlice';

const LoginScreen = props => {

    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        emailOrUsername: '',
        password: ''
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const validateForm = () => {
        const isDisabled = !formData.emailOrUsername || !formData.password;
        setIsSubmitDisabled(isDisabled);
    };

    const handleSubmit = async () => {
        setLoading(true)
        if (isSubmitDisabled) {
            setErrors({
                emailOrUsername: formData.emailOrUsername ? '' : getVal('emailOrUsernameRequired'),
                password: formData.password ? '' : getVal('passwordRequired'),
            });
            setLoading(false)
            return;
        }

        try {
            const response = await login(formData);
            const { user } = response;
            let userInfo = {
                username: user.username,
                name: user.name,
                surname: user.surname,
                email: user.email,
                profilePicture: user.profilePicture,
                idNumber: user.idNumber,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                country: user.country,
                city: user.city.name,
                birthDate: user.birthDate,
                bio: user.bio,
                identificate: user.identificate,
                isActive: user.isActive,
                userType: user.userType,
                interests: user.interests,
            };

            if (user.userType === 'student') {
                userInfo = {
                    ...userInfo,
                    school: user.student.school.name,
                    studentClass: user.student.class,
                    department: user.student.department,
                    gpa: user.student.gpa,
                    verification: user.student.verification,
                    goals: user.student.goals,
                };
            } else if (user.userType === 'supporter') {
                userInfo = {
                    ...userInfo,
                    occupation: user.supporter.occupation,
                    company: user.supporter.company,
                    behalfCompany: user.supporter.behalfCompany,
                    wantsAnonymous: user.supporter.wantsAnonymous,
                };
            }
            console.log("userInfo: ", userInfo)
            if(user.userType==='student'){
                dispatch(loginSuccessStudent(userInfo));
            }else{
                dispatch(loginSuccessSupporter(userInfo));
            }
            
            setRootScreen({ isLoggedIn: true, userType: user.userType });
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error response", error.response);
            if (error.response && error.response.data && error.response.data.error) {
                const errorCode = error.response.data.error.code;
                const errorMessage = error.response.data.error.message;
                console.log("errorss:", errorCode);
                if (errorCode === 1009) {
                    setErrors({ ...errors, emailOrUsername: errorMessage });
                } else if (errorCode === 1010) {
                    setErrors({ ...errors, password: errorMessage });
                } else {
                    console.log("hataaa");
                    alert('An unexpected error occurred. Please try again later.');
                }
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };

    const handleBack = () => {
        popScreen(props.componentId);
    };

    const onHandleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
        validateForm();
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const emailOrUsernameRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <Container
            style={styles.container}
            topBarProps={{
                title: getVal('login'),
                onLeftPress: () => { handleBack() },
                leftIcon: 'arrow-left',
                onRightPress: () => { console.log('Sağ tıklandı'); },
            }}
            loading={loading}
            compId={props.componentId}
        >
            <View style={styles.content}>
                <CustomTextInput
                    ref={emailOrUsernameRef}
                    icon="email"
                    label={getVal('emailOrUsernameLabel')}
                    value={formData.emailOrUsername}
                    onChangeText={(text) => onHandleChange('emailOrUsername', text)}
                    placeholder={getVal('emailOrUsernamePlaceholder')}
                    error={errors.emailOrUsername}
                    secureTextEntry={false}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
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
                            backgroundColor: isSubmitDisabled ? theme.lightGrey : theme.primary,
                        },
                    ]}
                    disabled={isSubmitDisabled}
                >
                    <Text style={styles.buttonText}>{getVal("log_in")}</Text>
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

export default LoginScreen;
