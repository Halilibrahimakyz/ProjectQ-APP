import React from 'react';
import withReduxProvider from './withReduxProvider';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const withProviders = (Component) => {
  const WithRedux = withReduxProvider(Component);
  const WithGestureHandlerAndRedux = gestureHandlerRootHOC(WithRedux);
  return WithGestureHandlerAndRedux;
};

export default withProviders;