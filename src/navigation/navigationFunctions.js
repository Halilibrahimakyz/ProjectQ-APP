import { Navigation } from "react-native-navigation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const pushScreen = (componentId, screenName) => {
  console.log("Component ID: ", componentId);
  Navigation.push(componentId, {
    component: {
      name: screenName
    },
  });
};

export const popScreen = (componentId) => {
  console.log("Component ID: ", componentId);
  Navigation.pop(componentId, {});
};

export const setRootScreen = ({ isLoggedIn, userType, initialTab = 0 }) => {
  let root;

  if (isLoggedIn) {
    root = {
      root: {
        bottomTabs: {
          id: 'BottomTabsId',
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: userType === 'supporter' ? 'SupporterHomeScreen' : 'StudentHomeScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('home', 28),
                          testID: userType === 'supporter' ? 'SupporterHome' : 'StudentHome',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: userType === 'supporter' ? 'SupporterListScreen' : 'StudentListScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('format-list-bulleted', 28),
                          testID: userType === 'supporter' ? 'SupporterList' : 'StudentList',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: userType === 'supporter' ? 'SupporterHistoryScreen' : 'StudentCreateScreen',
                      options: {
                        bottomTab: {
                          icon: userType === 'supporter' ? MaterialCommunityIcons.getImageSourceSync('clipboard-text-clock-outline', 28) : MaterialCommunityIcons.getImageSourceSync('plus-box-outline', 28),
                          testID: userType === 'supporter' ? 'SupporterHistory' : 'StudentCreate',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: userType === 'supporter' ? 'SupporterMessagesScreen' : 'StudentMessagesScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('message-processing-outline', 28),
                          testID: userType === 'supporter' ? 'SupporterMessages' : 'StudentMessages',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: userType === 'supporter' ? 'SupporterProfileScreen' : 'StudentProfileScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('account', 28),
                          testID: userType === 'supporter' ? 'SupporterProfile' : 'StudentProfile',
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
          options: {
            bottomTabs: {
              currentTabIndex: initialTab,
            },
          },
        },
      },
    };
  } else {
    root = {
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'WelcomeScreen',
                options: {
                  topBar: {
                    visible: false,
                    drawBehind: true,
                  },
                },
              },
            },
          ],
        },
      },
    };
  }

  Navigation.setRoot(root);
};