import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import Carousel from 'react-native-reanimated-carousel';
import { Container } from '@/components';
import OnBoardCarouselItem from '@/components/onBoard/OnBoardCarouselItem';
import OnBoardPagination from '@/components/onBoard/OnBoardPagination';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/storeReduxToolkit/userSupporterSlice';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AppInfoSupporterScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();
  const dispatch = useDispatch();

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const carouselItemData = useMemo(() => [
    {
      svg: 'OnBoardSupporter1',
      titleText: getVal("on_board_supporter_1_title"),
      descText: getVal("on_board_supporter_1_desc")
    },
    {
      svg: 'OnBoardSupporter2',
      titleText: getVal("on_board_supporter_2_title"),
      descText: getVal("on_board_supporter_2_desc")
    },
    {
      svg: 'OnBoardSupporter3',
      titleText: getVal("on_board_supporter_3_title"),
      descText: getVal("on_board_supporter_3_desc")
    },
  ], [getVal]);

  const handleNext = useCallback(() => {
    if (carouselRef.current) {
      if (activeSlide < carouselItemData.length - 1) {
        const nextIndex = activeSlide + 1;
        setActiveSlide(nextIndex);
        carouselRef.current.scrollTo({ count: 1, animated: true });
      } else {
        dispatch(loginSuccess({ name: "Supporter", surname: "test2" }))
        // pushScreen(props.componentId, "StudentHomeScreen");
        setRootScreen({ isLoggedIn: true, userType: "supporter" });
      }
    }
  }, [activeSlide, carouselItemData.length, props.componentId]);

  const handleBack = useCallback(() => {
    if (carouselRef.current) {
      if (activeSlide > 0) {
        const prevIndex = activeSlide - 1;
        setActiveSlide(prevIndex);
        carouselRef.current.scrollTo({ count: -1, animated: true });
      } else {
        popScreen(props.componentId);
      }
    }
  }, [activeSlide, props.componentId]);

  const handleSkip = useCallback(() => {
    dispatch(loginSuccess({ name: "Supporter", surname: "test2" }))
    setRootScreen({ isLoggedIn: true, userType: "supporter" });
  }, [props.componentId]);



  return (
    <Container style={styles.container} topBarProps={{
      // title: 'Ana Sayfa',
      onLeftPress: () => { popScreen(props.componentId) },
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu'
    }}
      compId={props.componentId}
    >
      <View style={styles.content}>
        <Carousel
          vertical={false}
          ref={carouselRef}
          loop={false}
          width={width}
          autoPlay={false}
          data={carouselItemData}
          windowSize={3}
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
        <TouchableOpacity onPress={handleBack} style={[styles.button, { width: '25%', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }]}>
          <Text style={[styles.buttonText]}>{getVal("back")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.button, { width: '48%' }]}>
          <Text style={[styles.buttonText]}>{getVal("next")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip} style={[styles.button, { width: '25%', borderTopRightRadius: 30, borderBottomRightRadius: 30, backgroundColor: theme.lightGrey, justifyContent: 'flex-start' }]}>
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
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
    color: theme.background,
  }
});

export default AppInfoSupporterScreen;