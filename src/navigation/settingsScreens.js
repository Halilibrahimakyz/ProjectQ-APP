import { Navigation } from 'react-native-navigation';
import withProviders from '../hoc/withProviders';
import {
  Settings,
  EditProfile,
  Help,
  InviteFriends,
  Notifications,
  Security
} from '@/screens'

export const registerSettingsScreens = () => {
  Navigation.registerComponent('Settings', () => withProviders(Settings));
  Navigation.registerComponent('EditProfile', () => withProviders(EditProfile));
  Navigation.registerComponent('Help', () => withProviders(Help));
  Navigation.registerComponent('InviteFriends', () => withProviders(InviteFriends));
  Navigation.registerComponent('Notifications', () => withProviders(Notifications));
  Navigation.registerComponent('Security', () => withProviders(Security));
};