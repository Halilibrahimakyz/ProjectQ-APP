import { Navigation } from "react-native-navigation";

import { View, Text } from 'react-native'
import React from 'react'

const setStatusBar = (componentId, theme) => {
  Navigation.mergeOptions(componentId, {
    statusBar: {
      backgroundColor: theme.background,
      style: theme.type === "dark" ? "light" : "dark"
    }
  });
}

export { setStatusBar };