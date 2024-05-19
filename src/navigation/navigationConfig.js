import { Dimensions, Platform } from 'react-native';
// import { useSelector } from 'react-redux';
import { useTheme } from '@/constants/colors';
const windowWidth = Dimensions.get('window').width;

const getAnimationDuration = () => {
  if (Platform.OS === 'android') {
    return 400;
  } else {
    return 300;
  }
};

export const useDefaultOptions = (theme) => {
  return {
    bottomTabs: {
      visible: true,
      drawBehind: true,
      backgroundColor: theme.background,
      titleDisplayMode: 'alwaysHide',
      hideShadow:false,
    },
    bottomTab: {
      iconColor: theme.lightGrey,
      selectedIconColor: theme.primary,
      textColor: theme.primary,
      selectedTextColor: theme.primary
    },
    topBar: {
          visible: false,
          // leftButtonColor: theme.primary,
          // rightButtonColor: theme.primary,
          // title: {
          //   color: theme.primary
          // },
          // subtitle: {
          //   fontSize: 12,
          //   color: theme.primary
          // },
          // background: {
          //   color: theme.background
          // },
          // backButton: {
          //   color: theme.primary,
          //   showTitle: false
          // }
        },
    animations: {
      push: {
        waitForRender: true,
        content: {
          translationX: {
            from: windowWidth,
            to: 0,
            duration: getAnimationDuration(),
          }
        }
      },
      pop: {
        waitForRender: true,
        content: {
          translationX: {
            from: 0,
            to: windowWidth,
            duration: getAnimationDuration(),
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
      backgroundColor: theme.background,
      style: theme.type === "dark" ? "light" : "dark"
    },
    layout: {
      backgroundColor: theme.background
    },
  };
};