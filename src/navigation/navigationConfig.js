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

export const useDefaultOptions = () => {
  const theme = useTheme();
  return {
    bottomTabs: {
      visible: true,
      drawBehind: true,
      backgroundColor: theme.background,
      titleDisplayMode: 'alwaysHide',
      hideShadow:false
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
  // Navigation.setDefaultOptions({
  //   // statusBar: {
  //   //   backgroundColor: currentColorTheme.black
  //   // },
  //   // layout: {
  //   //   orientation: ['portrait'],
  //   //   backgroundColor: currentColorTheme.screenBackgroundColor
  //   // },
  //   bottomTabs: {
  //     visible: true,
  //     drawBehind: true,
  //     backgroundColor: theme.background,
  //     titleDisplayMode: 'alwaysShow'
  //   },
  //   bottomTab: {
  //     iconColor: theme.background2,
  //     selectedIconColor: theme.primary,
  //     textColor: theme.primary,
  //     selectedTextColor: theme.primary
  //   },
  //   topBar: {
  //     visible: false,
  //     // leftButtonColor: currentColorTheme.navBarButtonColor,
  //     // rightButtonColor: currentColorTheme.navBarButtonColor,
  //     // title: {
  //     //   color: currentColorTheme.navBarTextColor
  //     // },
  //     // subtitle: {
  //     //   fontSize: 12,
  //     //   color: currentColorTheme.transluscentText
  //     // },
  //     // background: {
  //     //   color: currentColorTheme.navBarBackgroundColor
  //     // },
  //     // backButton: {
  //     //   color: currentColorTheme.navBarButtonColor,
  //     //   showTitle: false
  //     // }
  //   },
  //   animations: {
  //     push: {
  //       waitForRender: true, //We prevent from going to the page before it is rendered.
  //       content: {
  //         translationX: {
  //           from: windowWidth,
  //           to: 0,
  //           duration: animationDuration,
  //         }
  //       }
  //     },
  //     pop: {
  //       waitForRender: true, //We prevent from going to the page before it is rendered.
  //       content: {
  //         translationX: {
  //           from: 0,
  //           to: windowWidth,
  //           duration: 300,
  //           duration: animationDuration,
  //         }
  //       }
  //     }
  //   },
  //   // animations: {
  //   //   push: {
  //   //     waitForRender: true
  //   //   }
  //   // }
  // })
