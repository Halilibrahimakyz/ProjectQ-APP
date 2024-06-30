import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '@/constants/colors';

const CustomPhotoAdd = ({ label, value, onChange, placeholder, error, icon = 'pencil' }) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    const [imageUri, setImageUri] = useState(value);

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 1080,
            maxHeight: 1080,
            quality: 1,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                const base64Image = await convertToBase64(uri);
                const fullBase64 = `data:image/jpeg;base64,${base64Image}`;
                setImageUri(fullBase64);
                onChange(fullBase64);
            }
        });
    };

    const convertToBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    return (
        <View style={styles.container}>
            {/* {label && <Text style={styles.label}>{label}</Text>} */}
            <TouchableOpacity style={[styles.imageContainer, { borderColor: error ? theme.red : imageUri ? theme.primary : theme.lightGrey, borderStyle: imageUri ? 'solid' : 'dashed' }]} onPress={pickImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
                ) : (
                    <>
                        <MaterialCommunityIcons name="plus" color={theme.primary} size={24} />
                        {label && <Text style={styles.label}>{label}</Text>}
                    </>
                )}
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
        width: '100%'
    },
    label: {
        marginBottom: 10,
        color: theme.primary,
        fontSize: 16,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        position: 'relative',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode:'cover'
    },
    error: {
        color: theme.red,
        marginTop: 5,
        fontSize: theme.fontSize.small,
        marginLeft: 0,
        textAlign: 'center',
    },
});

export default CustomPhotoAdd;
