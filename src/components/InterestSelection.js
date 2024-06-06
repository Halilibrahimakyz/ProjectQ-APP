import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/constants/colors';

const InterestSelection = ({
  interestsList = [],
  selectedInterests = [],
  onChange,
  error,
  label,
  icons = {},
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [internalSelectedInterests, setInternalSelectedInterests] = useState(selectedInterests);

  useEffect(() => {
    setInternalSelectedInterests(selectedInterests);
  }, [selectedInterests]);

  const toggleInterest = (interest) => {
    let updatedInterests;
    if (internalSelectedInterests.includes(interest)) {
      updatedInterests = internalSelectedInterests.filter((item) => item !== interest);
    } else {
      updatedInterests = [...internalSelectedInterests, interest];
    }
    setInternalSelectedInterests(updatedInterests);
    onChange(updatedInterests);
  };

  const renderRow = (items) => (
    <View style={styles.row}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={[
            styles.interestButton,
            internalSelectedInterests.includes(item.value) && styles.selectedInterestButton,
          ]}
          onPress={() => toggleInterest(item.value)}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={35}
            color={internalSelectedInterests.includes(item.value) ? theme.background : theme.primary}
          />
          <Text
            style={[
              styles.interestText,
              internalSelectedInterests.includes(item.value) && styles.selectedInterestText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      {items.length < 3 && (
        Array.from({ length: 3 - items.length }).map((_, index) => (
          <View key={index} style={styles.emptySpace} />
        ))
      )}
    </View>
  );

  const rows = [];
  for (let i = 0; i < interestsList.length; i += 3) {
    rows.push(interestsList.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.title}>{label}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {renderRow(row)}
        </View>
      ))}
     
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    marginVertical: 5,
    position: 'relative',
  },
  title: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  interestButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: theme.background,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3.33%',
    marginRight: '3.33%',
  },
  selectedInterestButton: {
    backgroundColor: theme.primary,
  },
  emptySpace: {
    width: '30%',
    marginRight: '3.33%',
  },
  interestText: {
    fontSize:theme.fontSize.body,
    color: theme.secondary,
    marginTop: 5,
  },
  selectedInterestText: {
    color: theme.background,
  },
  error: {
    color: theme.red,
    marginBottom: 10,
    fontSize: theme.fontSize.small,
  },
});

export default InterestSelection;
