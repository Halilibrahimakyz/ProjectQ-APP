import { Dimensions, Platform } from 'react-native';
// import { useSelector } from 'react-redux';
import { useTheme } from '@/constants/colors';
const windowWidth = Dimensions.get('window').width;

// const getAnimationDuration = () => {
//   if (Platform.OS === 'android') {
//     return 300;
//   } else {
//     return 300;
//   }
// };

export const useDefaultOptions = (theme) => {
  return {
    bottomTabs: {
      visible: true,
      drawBehind: true,
      backgroundColor: 'transparent',
      titleDisplayMode: 'alwaysHide',
      hideShadow: false,
      lazyLoad: true,
    },
    bottomTab: {
      iconColor: theme.lightGrey,
      selectedIconColor: theme.primary,
      textColor: theme.primary,
      selectedTextColor: theme.primary
    },
    topBar: {
      visible: false,
    },
    animations: {
      push: {
        waitForRender: true,
        content: {
          translationX: {
            from: windowWidth,
            to: 0,
            duration: 300,
          },
        }
      },
      pop: {
        waitForRender: true,
        content: {
          translationX: {
            from: 0,
            to: windowWidth,
            duration: 300,
          }
        }
      },
      setRoot: {
        waitForRender: true,
        enabled: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 300,
        },
      },
    },
    statusBar: {
      backgroundColor: 'transparent',
      style: theme.type === "dark" ? "light" : "dark",
      drawBehind: true
    },
    layout: {
      backgroundColor: theme.background
    },
    navigationBar: {
      backgroundColor: theme.background,
      visible: false
    }
  };
};