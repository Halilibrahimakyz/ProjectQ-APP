import { Navigation } from "react-native-navigation";

export const pushScreen = (componentId, screenName) => {
  console.log("Component ID: ", componentId);
  Navigation.push(componentId, {
    component: {
      name: screenName,
      options: {
        animations: {
          push: {
            waitForRender: true, //We prevent from going to the page before it is rendered.
            content: {
              translationX: {
                from: require('react-native').Dimensions.get('window').width,
                to: 0,
                duration: 300
              }
            }
          },
          pop: {
            waitForRender: true, //We prevent from going to the page before it is rendered.
            content: {
              translationX: {
                from: 0,
                to: require('react-native').Dimensions.get('window').width,
                duration: 300
              }
            }
          }
        },
        topBar: {
          visible: false, 
          drawBehind: true, 
        },
      }
    },
  });
};

export const popScreen = (componentId) => {
    console.log("Component ID: ", componentId);
    Navigation.pop(componentId,{});
  };
