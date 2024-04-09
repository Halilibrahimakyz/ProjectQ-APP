import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/constants/Colors';

const OnBoardPagination = memo(function ({ activeIndex, totalItems }) {
  const dots = [];

  for (let i = 0; i < totalItems; i++) {
    dots.push(
      <View
        key={i}
        style={activeIndex == i ? styles.activeIcon : styles.inactiveIcon}
      />,
    );
  }

  return <View style={styles.container}>{dots}</View>;
});

const commonIcon = {
  width: 10,
  height: 10,
  borderRadius: 5,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  marginHorizontal: 15,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    ...commonIcon,
    backgroundColor: "#13B156",
  },
  inactiveIcon: {
    ...commonIcon,
    backgroundColor: "gray",
  },
});

export default OnBoardPagination;