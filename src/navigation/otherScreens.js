import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    ProjectScreen
} from '@/screens'

export const registerOtherScreens = () => {
    Navigation.registerComponent('ProjectScreen', () => withProviders(ProjectScreen));
};