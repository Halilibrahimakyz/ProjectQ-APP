import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Step1 = ({ formData, errors,handleChange }) => {
    console.log("formdata: ",formData)

    const onHandleChange = (field, value) => {
        handleChange(field, value)
      };

      
    return (
      <View style={styles.container}>
        {/* <Text>Name:</Text> */}
        <Text style={styles.error}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => onHandleChange('name', text)}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}
        <Text style={styles.error}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => onHandleChange('email', text)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        flex:1,
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

export default Step1;
