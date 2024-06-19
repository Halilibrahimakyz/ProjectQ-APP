import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { Container, CustomButton, DynamicSVG,CustomSeparator } from '@/components';
import { useDispatch } from 'react-redux';
import { loginSuccess as loginSuccessStudent } from '@/storeReduxToolkit/userStudentSlice';
import { loginSuccess as loginSuccessSupporter } from '@/storeReduxToolkit/userSupporterSlice';

const JoinScreen = props => {

    const theme = useTheme();
    const styles = getStyles(theme);
    const { getVal } = useLanguage();
    console.log("props join screen: ",props)

    // const handlePass = () => {
    //     dispatch(loginSuccess({ name: "Student", surname: "test2" }))
    //     setRootScreen({ isLoggedIn: true, userType: "student" });
    // };

    const handleGoogleLogin = () => {
        console.log("Google ile giriş");
    };

    const handleAppleLogin = () => {
        console.log("Apple ile giriş");
    };

    const handleCreateAccount = (userType) => {
        if(userType=="student"){
            pushScreen(props.componentId, "SignUpStudentScreen");
        }else{
            pushScreen(props.componentId, "SignUpSupporterScreen");
        }
    };

    const handleLogin = () => {
        pushScreen(props.componentId, "LoginScreen");
    };


    console.log(props.userType)
    return (
        <Container style={styles.container} topBarProps={{
            // title: 'Ana Sayfa',
            onLeftPress: () => { popScreen(props.componentId) },
            leftIcon: 'arrow-left',
            onRightPress: () => { console.log('Sağ tıklandı'); },
            // rightIcon: 'menu'
        }}
            compId={props.componentId}
        >
            <View style={styles.content}>
                <DynamicSVG fileName="LetsYouIn" width={300} height={300} />
                <Text style={styles.header}>{getVal("lets_step_inside")}</Text>
            </View>
            <View style={styles.buttonContainerThirdParty}>
                <TouchableOpacity style={[styles.button,{marginBottom:10}]} onPress={handleGoogleLogin}>
                <DynamicSVG fileName={"GoogleLogo"} width={25} height={25} />
                    <Text style={[styles.text,{paddingLeft:10}]}>{getVal("continue_with_google")}</Text>
                </TouchableOpacity>
               
                <TouchableOpacity style={styles.button} onPress={handleAppleLogin}>
                <DynamicSVG fileName={"AppleLogo"} width={25} height={25} />
                    <Text style={[styles.text,{paddingLeft:10}]}>{getVal("continue_with_apple")}</Text>
                </TouchableOpacity>
            </View>
            <CustomSeparator text="Or"/>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={getVal("create_account")}
                    onPress={() => handleCreateAccount(props.userType)}
                />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        {getVal("have_acc")}{' '}
                    </Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>{getVal("log_in")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: theme.padding.default,
    },
    content: {
        alignItems: 'center',
        marginTop: 20,
    },
    header: {
        color: theme.primary,
        fontSize: theme.fontSize.heading,
        fontWeight: 'bold',
        marginTop: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainerThirdParty: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 3,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 4,
        // shadowOpacity: 0.3,
        flexDirection: 'row',
        backgroundColor: theme.background,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.lightGrey
    },
    text: {
        color: theme.lightGrey,
        fontSize: theme.fontSize.button,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        color: theme.lightGrey,
        fontSize: theme.fontSize.body,
    },
    loginButtonText: {
        color: theme.primary,
        fontWeight: 'bold',
        fontSize: theme.fontSize.body,
    },
});

export default JoinScreen;