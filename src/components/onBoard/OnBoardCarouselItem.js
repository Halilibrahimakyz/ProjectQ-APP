import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux'

import Dark from '@/assets/svg/Dark.svg'
import Light from '@/assets/svg/Light.svg'
import { useTheme } from '../../constants/Colors';

const OnBoardCarouselItem = (props) => {

  const theme = useSelector((state) => state.theme.value)

  return (
    <View style={styles.container}>
      {props.svg}
      <Text style={styles.titleText}>{props.titleText}</Text>
      <Text style={[styles.descText, {color: useTheme().onBoardDescText}]}>{props.descText}</Text>
    </View>
  );
}

export default OnBoardCarouselItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#13B156",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  descText: {
    fontSize: 18,
    textAlign: "center",
  },
});