import { Navigation } from 'react-native-navigation';
import { useDefaultOptions } from '../navigation/navigationConfig';
import { setRootScreen } from '../navigation/navigationFunctions';
import { setLightTheme, setDarkTheme } from './themeSlice'; // Theme eylemlerini import edin
import { lightTheme, darkTheme } from '@/constants/colors'; // Temaları import edin

const themeMiddleware = store => next => action => {

  let result = next(action);

  if (action.type === setLightTheme.type || action.type === setDarkTheme.type) {

    const state = store.getState();
    const theme = state.theme.value === 'light' ? lightTheme : darkTheme;
    
    const defaultOptions = useDefaultOptions(theme);
    Navigation.setDefaultOptions(defaultOptions);

    const isSupporterLoggedIn = state.userSupporter.isAuthenticated;
    const isStudentLoggedIn = state.userStudent.isAuthenticated;

    let userType = null;
    let isLoggedIn = false;

    if (isSupporterLoggedIn) {
      userType = 'supporter';
      isLoggedIn = true;
    } else if (isStudentLoggedIn) {
      userType = 'student';
      isLoggedIn = true;
    }

    // console.log('userType:', userType, 'isLoggedIn:', isLoggedIn);

    setRootScreen({ isLoggedIn, userType, initialTab: 4 });
  }

  return result;
};

export default themeMiddleware;
