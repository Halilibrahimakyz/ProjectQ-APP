import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useTheme } from '@/constants/colors';

const OnBoardPagination = memo(function ({ activeIndex, totalItems }) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const dots = Array.from({ length: totalItems }, (_, i) => {
    const width = useAnimatedStyle(() => {
      return {
        width: withTiming(activeIndex === i ? 40 : 10, { duration: 300 }),
        backgroundColor: withTiming(activeIndex === i ? theme.primary : theme.lightGrey, { duration: 300 })
      };
    });

    return <Animated.View key={i} style={[styles.icon, width]} />;
  });

  return <View style={styles.container}>{dots}</View>;
});

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default OnBoardPagination;
