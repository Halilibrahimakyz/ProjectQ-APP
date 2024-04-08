import { Navigation } from 'react-native-navigation';
import withReduxProvider from '../hoc/withReduxProvider';
import {
    WelcomeScreen,
    OnBoardScreen,
    AppInfoStudentScreen,
    AppInfoSupporterScreen,
    HomeScreen,
    TestScreen
} from '@/screens'

export const registerAuthScreens = () => {
  Navigation.registerComponent('WelcomeScreen', () => withReduxProvider(WelcomeScreen));
  Navigation.registerComponent('OnBoardScreen', () => withReduxProvider(OnBoardScreen));
  Navigation.registerComponent('AppInfoStudentScreen', () => withReduxProvider(AppInfoStudentScreen));
  Navigation.registerComponent('AppInfoSupporterScreen', () => withReduxProvider(AppInfoSupporterScreen));
  Navigation.registerComponent('HomeScreen', () => withReduxProvider(HomeScreen));
  Navigation.registerComponent('TestScreen', () => withReduxProvider(TestScreen));
};
