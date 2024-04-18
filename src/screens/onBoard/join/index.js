import { Text, StyleSheet } from 'react-native';
import React from 'react';

import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { pushScreen } from '@/navigator/navFunctions';
import { Container, CustomButton } from '@/components';

const JoinScreen = props => {

    const { getVal, changeLanguage } = useLanguage();

    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <Container>
            <Text style={styles.text}>Let's You In</Text>
            <CustomButton
                title={getVal('buttonTitle')}
                onPress={() => pushScreen(props.componentId, "HomeScreen")}
            />
        </Container>
    );
};

const getStyles = (theme) => StyleSheet.create({
    text: {
        marginTop: 10,
        color: theme.primary,
        fontSize: theme.fontSize.title,
    },
});

export default JoinScreen;