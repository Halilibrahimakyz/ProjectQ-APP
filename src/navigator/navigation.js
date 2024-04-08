import { Navigation } from 'react-native-navigation';

export const startApp = () => {
const isLoggedIn=true
const userType="student"
  if (isLoggedIn) {
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
  } else {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: userType === 'admin' ? 'AdminDashboard' : 'HomeScreen',
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                },
              },
            },
          }],
        },
      },
    });
  }
};
