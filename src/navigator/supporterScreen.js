import { Navigation } from 'react-native-navigation';
import withReduxProvider from '../hoc/withReduxProvider';
import {
    testSupporterPageScreen
} from '@/screens'

export const registerSupportScreens = () => {
    Navigation.registerComponent('testSupporterPageScreen', () => withReduxProvider(testSupporterPageScreen));
};
