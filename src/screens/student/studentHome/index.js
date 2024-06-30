import { Text, StyleSheet, ScrollView, View, RefreshControl, Dimensions, FlatList } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container, ProjectCard, SegmentedControl } from '@/components';
import { GET_PROJECTS } from '@/api/endpoints';
import { useFetch } from '@/services';

const { width } = Dimensions.get('window');

const StudentHomeScreen = props => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: projectData, loading, error } = useFetch(GET_PROJECTS, {}, refreshTrigger);

  const renderProjectCard = ({ item }) => {
    return (
      <ProjectCard
        project={item}
        onSave={() => console.log("save")}
        componentId={props.componentId}
      />
    );
  };

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? projectData?.data
      : projectData?.data.filter(project => project.category === selectedCategory);
  }, [selectedCategory, projectData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const onRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Empower Initiatives</Text>
      <SegmentedControl onCategoryChange={handleCategoryChange} />
    </View>
  );

  return (
    <Container
      style={styles.container}
      topBarProps={{
        title: getVal('home'),
        onLeftPress: () => { console.log('sol tıklandı'); },
        onRightPress: () => { console.log('Sağ tıklandı'); },
      }}
      bottomBar={true}
      compId={props.componentId}
    >
      <FlatList
        data={filteredProjects}
        renderItem={renderProjectCard}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.contentContainer}
      />
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: theme.padding.default,
    color: theme.secondary,
  },
  contentContainer: {
    paddingBottom: 100,
  },
});

export default StudentHomeScreen;
