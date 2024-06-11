import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
    WelcomeScreen,
    OnBoardScreen,
    AppInfoStudentScreen,
    AppInfoSupporterScreen,
    HomeScreen,
    JoinScreen,
    SignUpStudentScreen,
    LoginStudentScreen
} from '@/screens'

export const registerAuthScreens = () => {
  Navigation.registerComponent('WelcomeScreen', () => withProviders(WelcomeScreen));
  Navigation.registerComponent('OnBoardScreen', () => withProviders(OnBoardScreen));
  Navigation.registerComponent('AppInfoStudentScreen', () => withProviders(AppInfoStudentScreen));
  Navigation.registerComponent('AppInfoSupporterScreen', () => withProviders(AppInfoSupporterScreen));
  Navigation.registerComponent('HomeScreen', () => withProviders(HomeScreen));
  Navigation.registerComponent('JoinScreen', () => withProviders(JoinScreen));
  Navigation.registerComponent('SignUpStudentScreen', () => withProviders(SignUpStudentScreen));
  Navigation.registerComponent('LoginStudentScreen', () => withProviders(LoginStudentScreen));
};
