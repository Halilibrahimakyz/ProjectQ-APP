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

export const setRootScreen = ({ isLoggedIn, userType,initialTab = 0 }) => {
  console.log("isLoggedIn: ",isLoggedIn)
  if (!isLoggedIn) {
    Navigation.setRoot({
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
    });
  } else if (userType === "supporter") {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'BottomTabsId',
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'SupporterHomeScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('home',28),
                          testID: 'SupporterHome', // unique ID for this tab button
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
                      name: 'SupporterListScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('format-list-bulleted',28),
                          testID: 'SupporterList', // unique ID for this tab button
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
                      name: 'SupporterHistoryScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('clipboard-text-clock-outline',28),
                          testID: 'SupporterHistory', // unique ID for this tab button
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
                      name: 'SupporterMessagesScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('message-processing-outline',28),
                          testID: 'SupporterMessages', // unique ID for this tab button
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
                      name: 'SupporterProfileScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('account',28),
                          testID: 'SupporterProfile', // unique ID for this tab button
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
    });
  } else {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'BottomTabsId',
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'StudentHomeScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('home',28),
                          testID: 'StudentHome', // unique ID for this tab button
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
                      name: 'StudentListScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('format-list-bulleted',28),
                          testID: 'StudentList', // unique ID for this tab button
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
                      name: 'StudentCreateScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('plus-box-outline',28),
                          testID: 'StudentCreate', // unique ID for this tab button
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
                      name: 'StudentMessagesScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('message-processing-outline',28),
                          testID: 'StudentMessages', // unique ID for this tab button
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
                      name: 'StudentProfileScreen',
                      options: {
                        bottomTab: {
                          icon: MaterialCommunityIcons.getImageSourceSync('account',28),
                          testID: 'StudentProfile', // unique ID for this tab button
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
    });
  }
};

