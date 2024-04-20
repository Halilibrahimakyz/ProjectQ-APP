import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { pushScreen } from '@/navigator/navFunctions';
import { Container, CustomButton,DynamicSVG } from '@/components';

const WelcomeScreen = props => {

    const { getVal, changeLanguage } = useLanguage();
    
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <Container style={styles.container} compId={props.componentId}>
            <View style={styles.content}>
            <DynamicSVG fileName="Welcome" width={300} height={300} />
                <Text style={styles.header}>{getVal("welcome")}</Text>
                <Text style={styles.subHeader}>
                    {getVal("This_is_where_your_ideas")}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={getVal("lets_start")}
                    onPress={() => pushScreen(props.componentId, "OnBoardScreen")}
                />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        {getVal("have_acc")}{' '}
                    </Text>
                    <TouchableOpacity onPress={() => pushScreen(props.componentId, "HomeScreen")}>
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
    },
    content: {
        alignItems: 'center', 
        marginTop: 20,
    },
    header: {
        color: theme.primary,
        fontSize: theme.fontSize.display1,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subHeader: {
        color: theme.secondary,
        fontSize: theme.fontSize.title,
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center', 
        marginBottom: 20, 
    },
    button: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 30,
        width: '100%',
        marginTop: 30,
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
export default WelcomeScreen;