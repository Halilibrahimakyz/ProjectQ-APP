import { Navigation } from "react-native-navigation";

export const pushScreen = (componentId, screenName) => {
  console.log("Component ID: ", componentId);
  Navigation.push(componentId, {
    component: {
      name: screenName,
      options: {
        // animations: {
        //   push: {
        //     content: {
        //       translationX: {
        //         from: require('react-native').Dimensions.get('window').width,
        //         to: 0,
        //         duration: 50
        //       }
        //     }
        //   },
        //   pop: {
        //     content: {
        //       translationX: {
        //         from: 0,
        //         to: require('react-native').Dimensions.get('window').width,
        //         duration: 50
        //       }
        //     }
        //   }
        // },
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
