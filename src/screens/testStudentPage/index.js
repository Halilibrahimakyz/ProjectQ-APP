import { View, Text ,ScrollView,Button} from 'react-native';
import React from 'react';

import { useTheme } from '@/constants/Colors';
import { useLanguage } from '@/constants/language'

const testStudentPageScreen = props => {

    return (
        <View style={{ flex: 1, backgroundColor: 'white', width: "100%", height: "100%" }}>
        <Text style={{ color: 'red', fontSize: 34 }}>testStudentPageScreen</Text>
    </View>
    );
};

export default testStudentPageScreen;