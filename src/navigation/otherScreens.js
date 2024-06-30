import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    ProjectScreen,
    DonateScreen
} from '@/screens'

export const registerOtherScreens = () => {
    Navigation.registerComponent('ProjectScreen', () => withProviders(ProjectScreen));
    Navigation.registerComponent('DonateScreen', () => withProviders(DonateScreen));
};