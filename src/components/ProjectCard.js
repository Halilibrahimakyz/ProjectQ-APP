import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { popScreen, pushScreen, setRootScreen } from '@/navigation/navigationFunctions';

const ProjectCard = ({project, onSave,componentId  }) => {
  const {image, title, raised, goal, supporters, daysLeft}=project
  const theme = useTheme();
  const styles = getStyles(theme);
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <TouchableOpacity style={styles.projectCard} activeOpacity={1} onPress={() => pushScreen(componentId, "ProjectScreen", { project })}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.projectImage} resizeMode="cover" />
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <MaterialCommunityIcons name="bookmark" color={theme.white} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.projectInfo}>
      <Text style={styles.projectTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.projectRaised}>
          <Text style={styles.projectRaisedValue}>${raised}</Text>
          <Text style={styles.projectRaisedText}> fund raised from </Text>
          <Text style={styles.projectGoal}>${goal}</Text>
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.row}>
          <Text style={styles.projectSupporters}>
            <Text style={styles.supportersValue}>{supporters}</Text>
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
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: theme.padding.default,
    width: 250,
  },
  imageContainer: {
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: 150,
  },
  saveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: theme.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  saveButtonText: {
    color: theme.light,
    fontWeight: 'bold',
  },
  projectInfo: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 0.3,
    borderRightWidth: 0.3,
    borderLeftWidth: 0.3,
    borderColor: theme.darkwhite,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.secondary,
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
});

export default ProjectCard;
