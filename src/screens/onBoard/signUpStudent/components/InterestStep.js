import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useLanguage } from '@/constants/language';
import { useTheme } from '@/constants/colors';
import { InterestSelection } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const InterestStep = ({ formData, errors, handleChange }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const onHandleChange = (field, value) => {
    handleChange(field, value);
  };

  const interestsList = [
    { value: 'technology', label: getVal('technology'), icon: 'laptop' },
    { value: 'science', label: getVal('science'), icon: 'atom' },
    { value: 'art', label: getVal('art'), icon: 'palette' },
    { value: 'music', label: getVal('music'), icon: 'music' },
    { value: 'sports', label: getVal('sports'), icon: 'soccer' },
    { value: 'literature', label: getVal('literature'), icon: 'book' },
    { value: 'gaming', label: getVal('gaming'), icon: 'gamepad-variant' },
    { value: 'environment', label: getVal('environment'), icon: 'tree' },
    { value: 'health', label: getVal('health'), icon: 'heart-pulse' },
    { value: 'education', label: getVal('education'), icon: 'school' },
    { value: 'social', label: getVal('social'), icon: 'account-group' },
    { value: 'travel', label: getVal('travel'), icon: 'airplane' },
    { value: 'food', label: getVal('food'), icon: 'food' },
    { value: 'finance', label: getVal('finance'), icon: 'currency-usd' },
    { value: 'robotics', label: getVal('robotics'), icon: 'robot' },
    { value: 'photography', label: getVal('photography'), icon: 'camera' },
    { value: 'fashion', label: getVal('fashion'), icon: 'hanger' },
    { value: 'architecture', label: getVal('architecture'), icon: 'city' },
    { value: 'history', label: getVal('historyİnterest'), icon: 'history' },
    { value: 'psychology', label: getVal('psychology'), icon: 'brain' },
    { value: 'business', label: getVal('business'), icon: 'briefcase' },
    { value: 'marketing', label: getVal('marketing'), icon: 'chart-bar' },
    { value: 'philosophy', label: getVal('philosophy'), icon: 'thought-bubble' },
    { value: 'astronomy', label: getVal('astronomy'), icon: 'telescope' },
    { value: 'engineering', label: getVal('engineering'), icon: 'wrench' },
    { value: 'culinary', label: getVal('culinary'), icon: 'chef-hat' },
    { value: 'cinema', label: getVal('cinema'), icon: 'film' },
    { value: 'writing', label: getVal('writing'), icon: 'pen' },
    { value: 'dance', label: getVal('dance'), icon: 'dance-ballroom' },
    { value: 'theater', label: getVal('theater'), icon: 'drama-masks' },
];

  const icons = {
    Technology: 'account-cowboy-hat',
    Science: 'account-cowboy-hat',
    Art: 'account-cowboy-hat',
    Music: 'account-cowboy-hat',
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <Text style={styles.infoText}>{getVal('interests_label_student')}</Text>
      <InterestSelection
        interestsList={interestsList}
        selectedInterests={formData.interests}
        onChange={(interests) => onHandleChange('interests', interests)}
        icons={icons}
        error={errors.interests}
      />
    </KeyboardAwareScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  infoText: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    color: theme.secondary,
    marginBottom: 10,
  },
});

export default InterestStep;
