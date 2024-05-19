import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    SupporterHomeScreen,
    SupporterHistoryScreen,
    SupporterListScreen,
    SupporterMessagesScreen,
    SupporterProfileScreen
} from '@/screens'

export const registerSupportScreens = () => {
    Navigation.registerComponent('SupporterHomeScreen', () => withProviders(SupporterHomeScreen));
    Navigation.registerComponent('SupporterHistoryScreen', () => withProviders(SupporterHistoryScreen));
    Navigation.registerComponent('SupporterListScreen', () => withProviders(SupporterListScreen));
    Navigation.registerComponent('SupporterMessagesScreen', () => withProviders(SupporterMessagesScreen));
    Navigation.registerComponent('SupporterProfileScreen', () => withProviders(SupporterProfileScreen));
};
