import { Navigation } from 'react-native-navigation';
import withReduxProvider from '../hoc/withReduxProvider';
import withGestureHandler from '../hoc/withGestureHandler';
import {
    testStudentPageScreen
} from '@/screens'

export const registerStudentScreens = () => {
    Navigation.registerComponent('testStudentPageScreen', () => withGestureHandler(testStudentPageScreen));
};
