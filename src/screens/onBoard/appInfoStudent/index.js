import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';
import { FlashList } from '@shopify/flash-list';
import { Container } from '@/components';
import OnBoardCarouselItem from '@/components/onBoard/OnBoardCarouselItem';
import OnBoardPagination from '@/components/onBoard/OnBoardPagination';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/storeReduxToolkit/userStudentSlice';

const width = Dimensions.get('window').width;

const AppInfoStudentScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();
  const dispatch = useDispatch();

  const [activeSlide, setActiveSlide] = useState(0);
  const flashListRef = useRef(null);

  const carouselItemData = useMemo(() => [
    {
      svg: 'OnBoardStudent1',
      titleText: getVal("on_board_student_1_title"),
      descText: getVal("on_board_student_1_desc"),
    },
    {
      svg: 'OnBoardStudent2',
      titleText: getVal("on_board_student_2_title"),
      descText: getVal("on_board_student_2_desc"),
    },
    {
      svg: 'OnBoardStudent3',
      titleText: getVal("on_board_student_3_title"),
      descText: getVal("on_board_student_3_desc"),
    },
  ], [getVal]);

  const handleNext = useCallback(() => {
    if (flashListRef.current) {
      if (activeSlide < carouselItemData.length - 1) {
        const nextIndex = activeSlide + 1;
        setActiveSlide(nextIndex);
        flashListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      } else {
        dispatch(loginSuccess({ name: "Student", surname: "test2" }));
        setRootScreen({ isLoggedIn: true, userType: "student" });
      }
    }
  }, [activeSlide, carouselItemData.length, dispatch]);

  const handleBack = useCallback(() => {
    if (flashListRef.current) {
      if (activeSlide > 0) {
        const prevIndex = activeSlide - 1;
        setActiveSlide(prevIndex);
        flashListRef.current.scrollToIndex({ index: prevIndex, animated: true });
      } else {
        popScreen(props.componentId);
      }
    }
  }, [activeSlide, props.componentId]);

  const handleSkip = useCallback(() => {
    const someProps = {
      userType: "student",
    };
    pushScreen(props.componentId, "JoinScreen", someProps);
  }, [props.componentId]);

  const renderItem = useCallback(({ item, index }) => (
    <OnBoardCarouselItem svg={item.svg} titleText={item.titleText} descText={item.descText} />
  ), []);

  return (
    <Container
      style={styles.container}
      topBarProps={{
        onLeftPress: () => { popScreen(props.componentId) },
        leftIcon: 'arrow-left',
        onRightPress: () => { console.log('Sağ tıklandı'); },
      }}
      compId={props.componentId}
    >
      <View style={styles.content}>
        <FlashList
          ref={flashListRef}
          data={carouselItemData}
          renderItem={renderItem}
          width={width}
          horizontal
          pagingEnabled
          estimatedItemSize={3}
          onScrollToIndexFailed={() => {}}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setActiveSlide(viewableItems[0].index);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
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
    paddingHorizontal: theme.padding.default,
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

export default AppInfoStudentScreen;
