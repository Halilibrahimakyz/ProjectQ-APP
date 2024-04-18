import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    testStudentPageScreen
} from '@/screens'

export const registerStudentScreens = () => {
    Navigation.registerComponent('testStudentPageScreen', () => withProviders(testStudentPageScreen));
};
