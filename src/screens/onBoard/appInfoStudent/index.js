import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';

import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen } from '@/navigator/navFunctions';
import Carousel from 'react-native-reanimated-carousel';
import { Container } from '@/components';
import OnBoardCarouselItem from '@/components/onBoard/OnBoardCarouselItem';
import OnBoardPagination from '@/components/onBoard/OnBoardPagination';

const AppInfoStudentScreen = props => {
  
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const theme = useTheme();
  const styles = getStyles(theme);

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const { getVal } = useLanguage();

  const carouselItemData = [
    {
      svg: 'OnBoardStudent1',
      titleText: getVal("on_board_student_1_title"),
      descText: getVal("on_board_student_1_desc")
    },
    {
      svg: 'OnBoardStudent2',
      titleText: getVal("on_board_student_2_title"),
      descText: getVal("on_board_student_2_desc")
    },
    {
      svg: 'OnBoardStudent3',
      titleText: getVal("on_board_student_3_title"),
      descText: getVal("on_board_student_3_desc")
    },
  ];

  const handleNext = () => {
    if (carouselRef.current) {
      if (activeSlide < carouselItemData.length - 1) {
        const nextIndex = activeSlide + 1;
        setActiveSlide(nextIndex);
        carouselRef.current.scrollTo({ count: 1, animated: true });
      } else {
        pushScreen(props.componentId, "testStudentPageScreen")
      }
    }
  };

  const handleBack = () => {
    if (carouselRef.current) {
      if (activeSlide > 0) {
        const prevIndex = activeSlide - 1;
        setActiveSlide(prevIndex);
        carouselRef.current.scrollTo({ count: -1, animated: true });
      } else {
        popScreen(props.componentId)
      }
    }
  };

  return (
    <Container style={styles.container} topBarProps={{
      // title: 'Ana Sayfa',
      onLeftPress: () => { popScreen(props.componentId) },
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu'
    }}>
      <View style={styles.content}>
        <Carousel
          vertical={false}
          ref={carouselRef}
          loop={false}
          width={width}
          autoPlay={false}
          data={carouselItemData}
          pagingEnabled={true}
          scrollAnimationDuration={300}
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ item, index }) => <OnBoardCarouselItem svg={item.svg} titleText={item.titleText} descText={item.descText} />}
        />
      </View>
      <View style={{ marginBottom: 30 }}>
        <OnBoardPagination activeIndex={activeSlide} totalItems={carouselItemData.length} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleBack} style={[styles.button1, { width: '25%', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }]}>
          <Text style={[styles.buttonText]}>{getVal("back")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.button1, { width: '48%' }]}>
          <Text style={[styles.buttonText]}>{getVal("next")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pushScreen(props.componentId, "testStudentPageScreen")} style={[styles.button1, { width: '25%', borderTopRightRadius: 30, borderBottomRightRadius: 30, backgroundColor: theme.lightGrey, justifyContent: 'flex-start' }]}>
          <Text style={[styles.buttonText]}>{getVal("skip")}</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    color: theme.primary,
    fontSize: theme.fontSize.display1,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeader: {
    color: theme.secondary,
    fontSize: theme.fontSize.title,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skipText: {
    marginBottom: 10,
    color: theme.lightGrey,
    fontSize: theme.fontSize.body,
  },
  button1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontSize: theme.fontSize.button,
    color: theme.background
  },
});


export default AppInfoStudentScreen;