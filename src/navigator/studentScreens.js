import { Navigation } from 'react-native-navigation';
import withReduxProvider from '../hoc/withReduxProvider';
import {
    testStudentPageScreen
} from '@/screens'

export const registerStudentScreens = () => {
    Navigation.registerComponent('testStudentPageScreen', () => withReduxProvider(testStudentPageScreen));
};
