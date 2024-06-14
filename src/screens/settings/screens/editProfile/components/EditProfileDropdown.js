// EditProfileDropdown.js

import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { CustomModal, CustomSeparator } from '@/components';
import { useTheme } from '@/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const { width } = Dimensions.get('window');

const EditProfileDropdown = ({ title }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const options = ["Male", "Female", "Other"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container} >
        <Text style={styles.inputTitle}>{title}</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles.inputText}>{selectedOption}</Text>
          <MaterialCommunityIcons name={"menu-down"} color={theme.lightGrey} size={26} />
        </TouchableOpacity>
      </View>
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <FlatList
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <>
              {index > 0 && <CustomSeparator />}
              <TouchableOpacity onPress={() => handleOptionSelect(item)} style={styles.option}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            </>
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </CustomModal>
    </>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20
  },
  inputTitle: {
    marginLeft: 24,
    color: theme.lightGrey,
    fontWeight: "bold"
  },
  inputContainer: {
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    borderRadius: width,
    borderColor: theme.primary,
    borderWidth: 2,
    height: 44,
  },
  inputText: {
    color: theme.secondary,
    fontSize: theme.fontSize.body,
    fontWeight: "bold"
  },
  option: {
    padding: 15,
  },
  optionText: {
    color: theme.secondary,
    fontSize: theme.fontSize.button
  },
});

export default EditProfileDropdown;
