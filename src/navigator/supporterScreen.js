import { Navigation } from 'react-native-navigation';
import withReduxProvider from '../hoc/withReduxProvider';
import withGestureHandler from '../hoc/withGestureHandler';
import {
    testSupporterPageScreen
} from '@/screens'

export const registerSupportScreens = () => {
    Navigation.registerComponent('testSupporterPageScreen', () => withGestureHandler(testSupporterPageScreen));
};
