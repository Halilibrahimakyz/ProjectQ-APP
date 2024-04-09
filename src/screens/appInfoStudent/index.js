import { View, Text, ScrollView, Button, Dimensions} from 'react-native';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import {useTheme} from '@/constants/Colors';
import {useLanguage} from '@/constants/language'
import { popScreen,pushScreen } from '@/navigator/navFunctions';
import Carousel from 'react-native-reanimated-carousel';
import OnBoardCarouselItem from '@/components/onBoard/OnBoardCarouselItem';
import OnBoardPagination from '@/components/onBoard/OnBoardPagination';

import OnBoardStudent1Light from '@/assets/svg/Light/OnBoardStudent1Light.svg'
import OnBoardStudent2Light from '@/assets/svg/Light/OnBoardStudent2Light.svg'
import OnBoardStudent3Light from '@/assets/svg/Light/OnBoardStudent3Light.svg'

import OnBoardStudent1Dark from '@/assets/svg/Dark/OnBoardStudent1Dark.svg'
import OnBoardStudent2Dark from '@/assets/svg/Dark/OnBoardStudent2Dark.svg'
import OnBoardStudent3Dark from '@/assets/svg/Dark/OnBoardStudent3Dark.svg'

const AppInfoStudentScreen = props => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const theme = useSelector((state) => state.theme.value);

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const { getVal } = useLanguage();

  const carouselItemData = [
    {
      svg: theme === "dark" ? (<OnBoardStudent1Dark width={250} height={250} />) : (<OnBoardStudent1Light width={250} height={250} />),
      titleText: getVal("on_board_student_1_title"),
      descText: getVal("on_board_student_1_desc")
    },
    {
      svg: theme === "dark" ? (<OnBoardStudent2Dark width={250} height={250} />) : (<OnBoardStudent2Light width={250} height={250} />),
      titleText: getVal("on_board_student_2_title"),
      descText: getVal("on_board_student_2_desc")
    },
    {
      svg: theme === "dark" ? (<OnBoardStudent3Dark width={250} height={250} />) : (<OnBoardStudent3Light width={250} height={250} />),
      titleText: getVal("on_board_student_3_title"),
      descText: getVal("on_board_student_3_desc")
    },
  ];

  const handleNext = () => {
    if (carouselRef.current) {
      const nextIndex = activeSlide + 1;
      if (nextIndex < carouselItemData.length) {
        setActiveSlide(nextIndex);
        carouselRef.current.scrollTo({count: 1});
      }
    }
  };

  const handleBack = () => {
    if (carouselRef.current) {
      const prevIndex = activeSlide - 1;
      if (prevIndex > -1) {
        setActiveSlide(prevIndex);
        carouselRef.current.scrollTo({count: -1});
      }
    }
  };

  return (
    <View style={{ backgroundColor: useTheme().background, width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center"}}>
      <Text style={{ color: useTheme().primary }}>AppInfoStudentScreen</Text>
      <Button
        title="geri Git"
        onPress={() => popScreen(props.componentId)}
      />
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={height * 0.7}
        autoPlay={false}
        data={carouselItemData}
        scrollAnimationDuration={200}
        onSnapToItem={setActiveSlide}
        renderItem={({ item, index }) => <OnBoardCarouselItem svg={item.svg} titleText={item.titleText} descText={item.descText} />}
        />
      <View style={{width: "70%", justifyContent: "center", alignItems: "center", marginBottom: 50, flexDirection: "row"}}>
        <Text style={{marginRight: 30, fontSize: 18, color: useTheme().onBoardBackButton}}
          onPress={handleBack}>{getVal("on_board_back_button")}</Text>
        <OnBoardPagination activeIndex={activeSlide} totalItems={carouselItemData.length} />
        <Text style={{marginLeft: 30, fontSize: 18, color: useTheme().primary}}
          onPress={handleNext}>{getVal("on_board_next_button")}</Text>
      </View>
      <Text style={{fontSize: 18, color: useTheme().onBoardSkipButton, marginBottom: 40}}
        onPress={() => {console.log("Clicked 'SKIP'");}}>{getVal("on_board_skip_button")}</Text>
    </View>
  );
};

export default AppInfoStudentScreen;