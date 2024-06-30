import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/constants/colors';
const categories = ['All', 'technology',
  'science',
  'art',
  'music',
  'sports',
  'literature',
  'gaming',
  'travel',
  'food',
  'history',
  'photography',
  'other'];

const SegmentedControl = ({ onCategoryChange }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  wrapper: {
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.padding.default,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.primary,
    marginRight: 5,
    backgroundColor: 'transparent',
  },
  selectedCategoryButton: {
    backgroundColor: theme.primary,
  },
  categoryText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: theme.white,
  },
});

export default SegmentedControl;
