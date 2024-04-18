import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux'
import { useTheme } from '../../constants/colors';
import { Container,CustomButton, DynamicSVG } from '@/components';

const OnBoardCarouselItem = ({svg,titleText,descText}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Container style={styles.container}>
      <DynamicSVG fileName={svg} width={200} height={200} />
      <Text style={styles.header}>{titleText}</Text>
      <Text style={[styles.subHeader]}>{descText}</Text>
      </Container>
  );
}

export default OnBoardCarouselItem;

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'white'
    // paddingHorizontal: 10,
  },
  header: {
    color: theme.primary,
    fontSize: theme.fontSize.display1,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
},
subHeader: {
    color: theme.secondary,
    fontSize: theme.fontSize.title,
    textAlign: 'center',
    marginTop: 20,
},
});