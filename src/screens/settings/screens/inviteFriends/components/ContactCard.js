import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';

const ContactCard = ({ imageUri, name, phoneNumber, invited, onInvite }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme, invited), [theme, invited]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={onInvite}
        disabled={invited} // Disable the button if already invited
      >
        <Text style={styles.inviteButtonText}>
          {invited ? 'Invited' : 'Invite'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme, invited) => StyleSheet.create({
  container: {
    width: "98%",
    height: 74,
    borderColor: theme.lightGrey,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden"
  },
  image: {
    height: "100%",
    aspectRatio: 1,
  },
  details: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16
  },
  name: {
    color: theme.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
  phoneNumber: {
    color: theme.secondary,
    fontSize: theme.fontSize.small,
    marginTop: 6
  },
  inviteButton: {
    backgroundColor: invited ? theme.primary : 'transparent', // Change background color if invited
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 80,
    borderWidth: invited ? 0 : 2, // Remove border if invited
    borderColor: theme.primary,
    borderRadius: 20,
    marginRight: 15,
  },
  inviteButtonText: {
    color: invited ? theme.white : theme.primary, // Change text color if invited
    fontSize: theme.fontSize.body,
    fontWeight: "bold",
  }
});

export default ContactCard;
