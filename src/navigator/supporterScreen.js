import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    testSupporterPageScreen
} from '@/screens'

export const registerSupportScreens = () => {
    Navigation.registerComponent('testSupporterPageScreen', () => withProviders(testSupporterPageScreen));
};
