import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
  } from 'react-native';
  import React, { useMemo } from 'react';
  import { useTheme } from '@/constants/colors';
  import { useLanguage } from '@/constants/language';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { Container, CustomButton } from '@/components';
  import { popScreen } from '@/navigation/navigationFunctions';
  
  const { width } = Dimensions.get('window');
  
  const ProjectScreen = (props) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const { getVal } = useLanguage();
    const { project } = props;
    const progress = Math.min((project.raised / project.goal) * 100, 100);
  
    console.log("props: ", props);
    
    return (
      <Container
        style={styles.container}
        topBarProps={{
          title: 'Project',
          onLeftPress: () => { popScreen(props.componentId); },
          leftIcon: 'arrow-left',
          onRightPress: () => { console.log('Sağ tıklandı'); },
          shadow: false,
          style:{backgroundColor:'transparent',zIndex:1}
        }}
        compId={props.componentId}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={project.image} style={styles.projectImage} resizeMode="cover" />
            <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Saved")}>
              <MaterialCommunityIcons name="bookmark" color={theme.white} size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle} >
              {project.title}
            </Text>
            <Text style={styles.projectRaised}>
              <Text style={styles.projectRaisedValue}>${project.raised}</Text>
              <Text style={styles.projectRaisedText}> fund raised from </Text>
              <Text style={styles.projectGoal}>${project.goal}</Text>
            </Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.row}>
              <Text style={styles.projectSupporters}>
                <Text style={styles.supportersValue}>{project.supporters}</Text>
                <Text style={styles.supportersText}> Supporter{project.supporters > 1 ? 's' : ''}</Text>
              </Text>
              <Text style={styles.projectDaysLeft}>
                <Text style={styles.daysLeftValue}>{project.daysLeft}</Text>
                <Text style={styles.daysLeftText}> days left</Text>
              </Text>
            </View>
            <View style={styles.buttonContainer}>
            <CustomButton
              title={"Donate Now"}
              onPress={() => console.log("donate")}
            />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Student</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionContentText}>{project.student.name} {project.student.surname}</Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionSubtitle}>Verified</Text>
          </View>
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.storyText}>
              {project.description}
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  };
  
  const getStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    scrollView:{
        paddingBottom:100
    },
    imageContainer: {
      position: 'relative',
      // top:-100,
      // zIndex:999
    },
    projectImage: {
      width: '100%',
      height: 300,
      justifyContent: 'flex-end',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    projectInfo: {
      paddingTop: 10,
      backgroundColor: theme.background,
    },
    saveButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: theme.primary,
      borderRadius: 5,
      padding: 5,
    },
    projectTitle: {
      fontSize: theme.fontSize.large,
      fontWeight: 'bold',
      color: theme.secondary,
      paddingTop: 10,
    },
    projectRaised: {
      fontSize: theme.fontSize.body,
      paddingVertical: 10,
    },
    projectRaisedValue: {
      color: theme.primary,
    },
    projectRaisedText: {
      color: theme.lightGrey,
    },
    projectGoal: {
      color: theme.primary,
    },
    progressBarBackground: {
      height: 10,
      backgroundColor: theme.darkwhite,
      borderRadius: 5,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.primary,
      
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    buttonContainer:{
        paddingTop: 10,
    },
    projectSupporters: {
      fontSize: theme.fontSize.small,
    },
    supportersValue: {
      color: theme.primary,
    },
    supportersText: {
      color: theme.lightGrey,
    },
    projectDaysLeft: {
      fontSize: theme.fontSize.small,
    },
    daysLeftValue: {
      color: theme.primary,
    },
    daysLeftText: {
      color: theme.lightGrey,
    },
    section: {
    //   padding: 20,
      backgroundColor: theme.background,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingTop: 10,
    },
    sectionTitle: {
      fontSize: theme.fontSize.title,
      fontWeight: 'bold',
      color: theme.secondary,
      paddingTop: 10,
    },
    sectionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    //   marginBottom: 5,
    },
    sectionContentText: {
      fontSize: theme.fontSize.body,
      color: theme.secondary,
    },
    followButton: {
      borderColor: theme.primary,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    followButtonText: {
      color: theme.primary,
    },
    sectionSubtitle: {
      fontSize: theme.fontSize.small,
      color: theme.lightGrey,
    //   marginBottom: 5,
    },
    storyText: {
      fontSize: theme.fontSize.body,
      color: theme.secondary,
      marginBottom: 100,
    },
  });
  
  export default ProjectScreen;
  