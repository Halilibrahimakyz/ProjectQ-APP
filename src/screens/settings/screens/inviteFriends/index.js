import { Text, StyleSheet, View, FlatList, Dimensions, PermissionsAndroid } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';
import { popScreen } from '@/navigation/navigationFunctions';
import Contacts from 'react-native-contacts';

import ContactCard from './components/ContactCard';
import formatPhoneNumber from './utility/formatPhoneNumber';

const { width } = Dimensions.get('window');

const InviteFriends = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const [contacts, setContacts] = useState([]);
  const [invitedContacts, setInvitedContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function requestContactsPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts to invite friends.',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          loadContacts();
        } else {
          console.log('Contacts permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestContactsPermission();
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        const contactList = contacts.map(contact => ({
          id: contact.recordID,
          name: contact.displayName,
          phoneNumber: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : 'N/A',
          imageUri: contact.thumbnailPath ? contact.thumbnailPath : undefined
        }));
        setContacts(contactList);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleInvite = (id) => {
    setInvitedContacts(prevState => [...prevState, id]);
  };

  const renderItem = ({ item }) => (
    <ContactCard
      imageUri={item.imageUri}
      name={item.name}
      phoneNumber={formatPhoneNumber(item.phoneNumber)} // Format the phone number
      invited={invitedContacts.includes(item.id)}
      onInvite={() => handleInvite(item.id)}
    />
  );

  const ItemSeparator = () => (
    <View style={styles.itemSeparator} />
  );

  return (
    <Container
      style={styles.container}
      topBarProps={{
        title: "Invite Friends",
        onLeftPress: () => popScreen(props.componentId),
        leftIcon: 'arrow-left',
        onRightPress: () => { console.log('Right button clicked'); },
      }}
      bottomBar={false}
      compId={props.componentId}
    >
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          loading ? <Text style={styles.loadingText}>Loading contacts...</Text> :
          <Text style={styles.noContactsText}>No contacts found</Text>
        }
      />
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.padding.default,
  },
  flatListContent: {
    alignItems: 'center', // Center the items
    paddingVertical: 10, // Add padding to the top and bottom
  },
  itemSeparator: {
    height: 24, // Space between each item
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  noContactsText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  }
});

export default InviteFriends;
