import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { pushScreen } from '@/navigation/navigationFunctions';

const ProjectCard = ({ project, onSave, componentId }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    title,
    currentAmount,
    goalAmount,
    endDate,
    photos,
    student,
    supporters
  } = project;

  const progress = Math.min((currentAmount / goalAmount) * 100, 100);
  const today = new Date();
  const endDateObj = new Date(endDate);
  const timeDiff = endDateObj - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const imageUrl = photos?.length > 0 ? `http://192.168.1.100:3333${photos[0].url}` : null;
  const profilePictureUrl = student?.user?.profilePicture;

  return (
    <TouchableOpacity
      style={styles.projectCard}
      activeOpacity={1}
      onPress={() => pushScreen(componentId, "ProjectScreen", { project })}
    >
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
          <Text style={styles.username}>{student?.user?.username}</Text>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <MaterialCommunityIcons name="bookmark" color={theme.white} size={24} />
        </TouchableOpacity>
        </View>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.projectImage}
            resizeMode="cover"
            onError={(e) => console.log('Image Load Error', e.nativeEvent.error)}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      
      </View>
      <View style={styles.projectInfo}>
        
        <Text style={styles.projectTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
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
            <Text style={styles.supportersValue}>{supporters ? supporters : 0}</Text>
            <Text style={styles.supportersText}> Supporter{supporters > 1 ? 's' : ''}</Text>
          </Text>
          <Text style={styles.projectDaysLeft}>
            <Text style={styles.daysLeftValue}>{daysLeft}</Text>
            <Text style={styles.daysLeftText}> days left</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme) => StyleSheet.create({
  projectCard: {
    overflow: 'hidden',
    paddingBottom: theme.padding.default,
    marginHorizontal:theme.padding.default,    
  },
  imageContainer: {
    position: 'relative',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:theme.lightGrey
    
  },
  projectImage: {
    width: '100%',
    height: 250,
  },
  saveButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: theme.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  projectInfo: {
    padding: 10,
    paddingVertical: 10,
    paddingLeft:10,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderColor:theme.lightGrey
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    // marginTop: 10,
    // marginLeft: 10,
    paddingVertical: 10,
    paddingLeft:10,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    // borderWidth:StyleSheet.hairlineWidth,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderColor:theme.lightGrey
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
  username: {
    fontSize: 14,
    color: theme.secondary,
    fontWeight: 'bold',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.secondary,
    marginBottom: 10,
  },
  projectRaised: {
    fontSize: 14,
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
    marginVertical: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectSupporters: {
    fontSize: 14,
  },
  supportersValue: {
    color: theme.primary,
  },
  supportersText: {
    color: theme.lightGrey,
  },
  projectDaysLeft: {
    fontSize: 14,
  },
  daysLeftValue: {
    color: theme.primary,
  },
  daysLeftText: {
    color: theme.lightGrey,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: theme.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.darkGrey,
  },
});

export default ProjectCard;
