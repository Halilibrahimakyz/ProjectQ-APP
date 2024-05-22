import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';


const SocialStatistics = ({initiativesNum, followersNum, followingNum}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <View style={styles.socialSection}>
        <Text style={styles.sectionNumber}>{initiativesNum}</Text>
        <Text style={styles.sectionDescription}>Initiatives Supported</Text>
      </View>
      <View style={styles.verticalRuler} />
      <View style={styles.socialSection}>
        <Text style={styles.sectionNumber}>{followersNum}</Text>
        <Text style={styles.sectionDescription}>Followers</Text>
      </View>
      <View style={styles.verticalRuler} />
      <View style={styles.socialSection}>
        <Text style={styles.sectionNumber}>{followingNum}</Text>
        <Text style={styles.sectionDescription}>Following</Text>
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 45,
    marginTop: 16,
    paddingVertical: 5
  },
  socialSection: {
    width: "32%",
    height: "100%",
    backgroundColor: theme.background,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  sectionNumber: {
    color: theme.secondary,
    fontSize: theme.fontSize.heading,
    fontWeight: "bold"
  },
  sectionDescription: {
    color: theme.secondary,
    fontSize: theme.fontSize.medium,
    textAlign: "center"
  },
  verticalRuler: {
    width: StyleSheet.hairlineWidth,
    height: "90%",
    backgroundColor: theme.lightGrey
  }
});

export default SocialStatistics;