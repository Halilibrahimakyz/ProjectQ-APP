import { Navigation } from "react-native-navigation";

import { View, Text } from 'react-native'
import React from 'react'

const setStatusBar = (componentId, theme) => {
  Navigation.mergeOptions(componentId, {
    statusBar: {
      backgroundColor: theme.primary,
      style: theme.type === "dark" ? "dark" : "light"
    }
  });
}

export { setStatusBar };