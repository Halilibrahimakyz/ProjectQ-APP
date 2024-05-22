import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    SupporterHomeScreen,
    SupporterHistoryScreen,
    SupporterListScreen,
    SupporterMessagesScreen,
    SupporterProfileScreen,
    SupporterSettingsScreen,
    SupporterWalletScreen
} from '@/screens'

export const registerSupportScreens = () => {
    Navigation.registerComponent('SupporterHomeScreen', () => withProviders(SupporterHomeScreen));
    Navigation.registerComponent('SupporterHistoryScreen', () => withProviders(SupporterHistoryScreen));
    Navigation.registerComponent('SupporterListScreen', () => withProviders(SupporterListScreen));
    Navigation.registerComponent('SupporterMessagesScreen', () => withProviders(SupporterMessagesScreen));
    Navigation.registerComponent('SupporterProfileScreen', () => withProviders(SupporterProfileScreen));
    Navigation.registerComponent('SupporterSettingsScreen', () => withProviders(SupporterSettingsScreen));
    Navigation.registerComponent('SupporterWalletScreen', () => withProviders(SupporterWalletScreen));
};
