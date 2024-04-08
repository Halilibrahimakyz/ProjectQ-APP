import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Navigation } from "react-native-navigation";
import { useTheme } from '@/constants/Colors';
import { useLanguage } from '@/constants/language'
import { pushScreen } from '../../navigator/navFunctions';
import Dark from '@/assets/svg/Dark.svg'
import Light from '@/assets/svg/Light.svg'


const WelcomeScreen = props => {

    const { getVal, changeLanguage } = useLanguage();
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            {theme === 'dark' ? (<Dark width={300} height={300} />) : (<Light width={300} height={300} />)}
            <Text style={styles.header}>{getVal("welcome")}</Text>
            <Text style={styles.subHeader}>
                {getVal("This_is_where_your_ideas")}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => pushScreen(props.componentId, "OnBoardScreen")}
            >
                <Text style={styles.buttonText}>{getVal("lets_start")}</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                {getVal("have_acc")}{' '}
                </Text>
                <TouchableOpacity onPress={() => pushScreen(props.componentId, "HomeScreen")}>
                    <Text style={styles.loginButtonText}>{getVal("log_in")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        color: theme.primary,
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subHeader: {
        color: theme.secondary,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 30,
        width: '100%',
        marginTop: 30,
    },
    buttonText: {
        color: theme.background,
        textAlign: 'center',
        fontSize: 18,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent:'center'
      },
    loginText: {
        color: theme.lightGrey,
    },
    loginButtonText: {
        color: theme.primary,
        fontWeight: 'bold'
    },
});
export default WelcomeScreen;