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
    { value: 'travel', label: getVal('travel'), icon: 'airplane' },
    { value: 'food', label: getVal('food'), icon: 'food' },
    { value: 'history', label: getVal('historyİnterest'), icon: 'history' },
    { value: 'photography', label: getVal('photography'), icon: 'camera' },
    { value: 'other', label: getVal('earth'), icon: 'earth' },
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
