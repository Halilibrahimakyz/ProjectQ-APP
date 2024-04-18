import React, { useState, useEffect } from 'react';
import { Animated, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkTheme, setLightTheme } from '../storeReduxToolkit/themeSlice';
const AnimatedBackgroundScreen = () => {

  const currentTheme = useSelector(state => state.theme.value);
  const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));

  const dispatch = useDispatch();
  
  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: currentTheme === 'dark' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentTheme]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#EBEEF2', '#151619'],
  });

  return (
    <Animated.View style={{ flex: 1, backgroundColor: interpolatedBackgroundColor }}>
      <Text style={{ color: 'red' }}>asdasd</Text>
      <Button title="setDarkTheme" onPress={() => dispatch(setDarkTheme())} />
      <Button title="setLightTheme" onPress={() => dispatch(setLightTheme())} />
    </Animated.View>
  );
};

export default AnimatedBackgroundScreen;
