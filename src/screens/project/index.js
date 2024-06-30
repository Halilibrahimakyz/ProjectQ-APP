import React, { useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container, CustomButton,CustomModal } from '@/components';
import { popScreen, setStatusBar,showModal } from '@/navigation/navigationFunctions';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const ProjectScreen = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();
  const {
    title,
    currentAmount,
    goalAmount,
    endDate,
    photos,
    student,
    supporters,
    description
  } = props.project;

  const progress = Math.min((currentAmount / goalAmount) * 100, 100);
  const today = new Date();
  const endDateObj = new Date(endDate);
  const timeDiff = endDateObj - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("Image liked!");
      // Like functionality can be added here
    }
  };

  const profilePictureUrl = student?.user?.profilePicture;
  const imageUrls = photos?.length > 0 ? photos.map(photo => `http://192.168.1.100:3333${photo.url}`) : [];

  return (
    <Container
      style={styles.container}
      topBarProps={{
        onLeftPress: () => popScreen(props.componentId),
        leftIcon: 'arrow-left',
        shadow: false,
        style: { backgroundColor: 'transparent', zIndex: 1, top: 0 },
        isAbsolute: true,
      }}
      bottomBar={false}
      compId={props.componentId}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <TapGestureHandler key={index} onHandlerStateChange={handleDoubleTap} numberOfTaps={2}>
                <Image
                  source={{ uri: url }}
                  style={styles.projectImage}
                  resizeMode="cover"
                  onError={(e) => console.log('Image Load Error', e.nativeEvent.error)}
                />
              </TapGestureHandler>
            ))
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{title}</Text>
          <Text style={styles.projectRaised}>
            <Text style={styles.projectRaisedValue}>${currentAmount}</Text>
            <Text style={styles.projectRaisedText}> fund raised from </Text>
            <Text style={styles.projectGoal}>${goalAmount}</Text>
          </Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.row}>
            <Text style={styles.projectSupporters}>
              <Text style={styles.supportersValue}>{supporters || 0}</Text>
              <Text style={styles.supportersText}> Supporter{supporters > 1 ? 's' : ''}</Text>
            </Text>
            <Text style={styles.projectDaysLeft}>
              <Text style={styles.daysLeftValue}>{daysLeft}</Text>
              <Text style={styles.daysLeftText}> days left</Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton title={"Donate Now"} onPress={()=> showModal('DonateScreen', {project:props.project})} />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.profileContainer}>
            {profilePictureUrl ? (
              <Image
                source={{ uri: profilePictureUrl }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderProfileImage}>
                <Text style={styles.placeholderProfileText}>No Image</Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <View>
                <Text style={styles.username}>{student?.user?.username} ({student?.user?.name} {student?.user?.surname})</Text>
                <Text style={styles.sectionSubtitle}>Verified</Text>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.storyText}>{description}</Text>
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
  scrollView: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
    height: 400,
  },
  projectImage: {
    width,
    height: 400,
  },
  placeholderImage: {
    width: width,
    height: 400,
    backgroundColor: theme.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.darkGrey,
  },
  projectInfo: {
    padding: 10,
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
  buttonContainer: {
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
    backgroundColor: theme.background,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: theme.padding.default,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    color: theme.secondary,
    paddingTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  placeholderProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  placeholderProfileText: {
    color: theme.darkGrey,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    color: theme.secondary,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: theme.fontSize.small,
    color: theme.lightGrey,
  },
  followButton: {
    alignItems: 'center',
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  followButtonText: {
    color: theme.primary,
  },
  storyText: {
    fontSize: theme.fontSize.body,
    color: theme.secondary,
    marginBottom: 100,
  },
});

export default ProjectScreen;