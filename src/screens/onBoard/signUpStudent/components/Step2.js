import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Step2 = ({ formData, errors,handleChange }) => {
    console.log("formdata: ",formData)

    const onHandleChange = (field, value) => {
        handleChange(field, value)
      };

      
    return (
      <View style={styles.container}>
        {/* <Text>Name:</Text> */}
        <Text style={styles.error}>Name2:</Text>
        <TextInput
          style={styles.input}
          value={formData.name2}
          onChangeText={(text) => onHandleChange('name2', text)}
        />
        {errors.name2 && <Text style={styles.error}>{errors.name2}</Text>}
        <Text style={styles.error}>Name2:</Text>
        <TextInput
          style={styles.input}
          value={formData.email2}
          onChangeText={(text) => onHandleChange('email2', text)}
        />
        {errors.email2 && <Text style={styles.error}>{errors.email2}</Text>}
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        padding: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: 'red',
        marginBottom: 10,
      },
      error: {
        color: 'red',
      },
});

export default Step2;
