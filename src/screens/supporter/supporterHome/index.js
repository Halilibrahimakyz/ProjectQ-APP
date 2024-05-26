import { Text, StyleSheet, ScrollView, View, Image, Dimensions,FlatList } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container, ProjectCard, SegmentedControl } from '@/components';
import { FlashList } from '@shopify/flash-list';
import { dummyProjects } from './data';
import { setStatusBar } from '@/functions/setStatusBar';

const student1 = require("@/assets/images/student1.jpg");
const student2 = require("@/assets/images/student2.jpg");
const student3 = require("@/assets/images/student3.jpg");
const student4 = require("@/assets/images/student4.jpg");
const student5 = require("@/assets/images/student5.jpg");


const { width } = Dimensions.get('window');

const SupporterHomeScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const horizontalScrollViewRef = useRef(null);

  const bannerData = [
    {
      image: student1,
      title: 'Empower Dreams',
    },
    {
      image: student2,
      title: 'Inspire Growth',
    },
    {
      image: student3,
      title: 'Create Change',
    },
  ];

  useEffect(() => {
    setStatusBar(props.componentId,theme)
  }, [theme, props.componentId]);

  const renderProjectCard = ({ item }) => {
    console.log("item.image:", item.image);
    return (
      <ProjectCard
        project={item}
        onSave={() => console.log("save")}
        componentId={props.componentId}
      />
    );
  };
  
  const renderBanner = ({ item }) => (
    <View style={styles.bannerItem}>
      <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
      <View style={styles.overlay} />
      <Text style={styles.bannerTitle}>{item.title}</Text>
    </View>
  );
  

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? dummyProjects
      : dummyProjects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  const featuredProjects = dummyProjects.slice(0, 3);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (horizontalScrollViewRef.current) {
      horizontalScrollViewRef.current.scrollTo({ x: 0, animated: true });
      console.log("ScrollView scrolled to the beginning.");
    }
  }, [selectedCategory]);


  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('home'),
      onLeftPress: () => { console.log('sol tıklandı'); },
      // leftIcon: 'menu',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      style: { backgroundColor: theme.primary },
      textStyle: { color: theme.background },
      buttonColor: theme.background
    }}
      compId={props.componentId}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={bannerData}
            renderItem={renderBanner}
            width={width - 40}
            height={(width - 40) / 2}
            loop={true}
            autoPlay={true}
            autoPlayInterval={3000}
          />
        </View>
        <Text style={styles.sectionTitle}>Empower Initiatives</Text>
        <SegmentedControl onCategoryChange={handleCategoryChange} />
        
          
          <FlashList
            horizontal
            data={filteredProjects}
            renderItem={renderProjectCard}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={200}
            showsHorizontalScrollIndicator={false}
          />
        <Text style={styles.sectionTitle}>Featured Projects</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollView}>
          <FlashList
            horizontal
            data={featuredProjects}
            renderItem={renderProjectCard}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={200}
            contentContainerStyle={styles.flashListContainer}
          />
        </ScrollView>
      </ScrollView>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingBottom: 100,
  },
  flashListContainer: {
    paddingBottom: 100,
  },
  carouselContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  carousel: {
    alignItems: 'center',
  },
  bannerItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: theme.white,
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
  },
  horizontalScrollView: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginTop: 10,
    color:theme.secondary
    // marginLeft: 20,
  },
});

export default SupporterHomeScreen;