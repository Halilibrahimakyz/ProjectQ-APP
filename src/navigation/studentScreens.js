import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    StudentHomeScreen,
    StudentCreateScreen,
    StudentListScreen,
    StudentMessagesScreen,
    StudentProfileScreen,
    StudentSettingsScreen,
    StudentWalletScreen,
} from '@/screens'

export const registerStudentScreens = () => {
    Navigation.registerComponent('StudentHomeScreen', () => withProviders(StudentHomeScreen));
    Navigation.registerComponent('StudentCreateScreen', () => withProviders(StudentCreateScreen));
    Navigation.registerComponent('StudentListScreen', () => withProviders(StudentListScreen));
    Navigation.registerComponent('StudentMessagesScreen', () => withProviders(StudentMessagesScreen));
    Navigation.registerComponent('StudentProfileScreen', () => withProviders(StudentProfileScreen));
    Navigation.registerComponent('StudentSettingsScreen', () => withProviders(StudentSettingsScreen));
    Navigation.registerComponent('StudentWalletScreen', () => withProviders(StudentWalletScreen));
};