import React, { useMemo, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useLanguage } from '@/constants/language';
import { useTheme } from '@/constants/colors';
import { countries } from '../utils/data';

const LocationStep = ({ formData, errors, handleChange }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const [searchQuery, setSearchQuery] = useState('');
    const { getVal } = useLanguage();
    const [filteredCountries, setFilteredCountries] = useState(countries);

    const onHandleChange = (field, value) => {
        handleChange(field, value);
    };

    useEffect(() => {
        setFilteredCountries(
            countries.filter(country =>
                searchQuery === '' ||
                getVal(country.label).toLowerCase().includes(searchQuery.toLowerCase()) ||
                country.code.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [formData, searchQuery]);

    const renderItem = ({ item }) => {
        const isSelected = formData.country === item.value;

        return (
            <TouchableOpacity
                onPress={() => onHandleChange('country', item.value)}
                style={[styles.item, isSelected && styles.selectedItem]}
            >
                <Image source={item.flag} style={styles.flag} />
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.itemText}>{getVal(item.label)}</Text>
                <View style={[styles.circle, isSelected && styles.selectedCircle]} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder={getVal('search_placeholder')}
                placeholderTextColor={theme.lightGrey}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {errors.country && <Text style={styles.error}>{errors.country}</Text>}
            <FlashList
                data={filteredCountries}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
                estimatedItemSize={50}
            />

        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical:10
    },
    searchBar: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.lightGrey,
        color: theme.secondary,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.lightGrey,
        width: '100%',
    },
    selectedItem: {
        borderColor: theme.primary,
        borderWidth: 2,
    },
    flag: {
        width: 48,
        height: 32,
        marginRight: 15,
        borderRadius: 2,
    },
    code: {
        width: 30,
        fontSize: 14,
        color: theme.lightGrey,
        marginRight: 10,
    },
    itemText: {
        fontSize: 16,
        color: theme.secondary,
        flex: 1,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.lightGrey,
        backgroundColor: theme.background,
    },
    selectedCircle: {
        backgroundColor: theme.primary,
        borderColor: theme.primary,
    },
    error: {
        color: 'red',
    },
});

export default LocationStep;
