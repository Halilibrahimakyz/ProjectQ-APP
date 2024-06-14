// EditProfile.js

import React, { useMemo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container, CustomSeparator, ProfilePicturePicker } from '@/components';
import { popScreen } from '@/navigation/navigationFunctions';
import EditProfileTextInput from './components/EditProfileTextInput';
import EditProfileDropdown from './components/EditProfileDropdown'; // Import the new component
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

const EditProfile = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  const onPictureChange = (base64Picture) => {
    console.log("Picture changed");
  };

  return (
    <Container
      style={styles.container}
      topBarProps={{
        title: "Edit Profile",
        onLeftPress: () => popScreen(props.componentId),
        leftIcon: 'arrow-left',
        onRightPress: () => { console.log('Sağ tıklandı'); },
      }}
      bottomBar={true}
      compId={props.componentId}
    >
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        enableOnAndroid={true}
        extraScrollHeight={100}
      >

        <ProfilePicturePicker onChange={onPictureChange} />
        <CustomSeparator />
        <EditProfileTextInput title={"Full Name"} />
        <EditProfileTextInput title={"Email"} icon={"email"} />
        <EditProfileTextInput title={"Phone Number"} icon={"phone"} />
        <EditProfileDropdown title={"Gender"} />
        <EditProfileTextInput title={"Location"} icon={"map-marker"} />
      </KeyboardAwareScrollView>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.padding.default,
  },
  keyboardAwareContainer: {
    flex: 1,
    paddingVertical:10
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  }
});

export default EditProfile;




// import React, { useMemo, useRef } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { useLanguage } from '@/constants/language';
// import { useTheme } from '@/constants/colors';
// import { CustomTextInput,ProfilePicturePicker } from '@/components';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useSelector, useDispatch } from 'react-redux';

// const EditProfile = () => {

//     const { formData, errors } = useSelector((state) => state.studentForm);
//     const theme = useTheme();
//     const styles = useMemo(() => getStyles(theme), [theme]);
//     const dispatch = useDispatch();
//     const { getVal } = useLanguage();

//     const nameRef = useRef(null);
//     const surnameRef = useRef(null);
//     const emailRef = useRef(null);
//     const passwordRef = useRef(null);
//     const rePasswordRef = useRef(null);

//     const onHandleChange = (field, value) => {
//         handleChange(field, value);
//     };

//     return (
//         <KeyboardAwareScrollView
//             style={styles.container}
//             contentContainerStyle={styles.scrollView}
//             enableOnAndroid={true}
//             extraScrollHeight={100}
//         >
//              {/* <Text style={styles.infoText}>{getVal('personal_info_instructions')}</Text> */}
//             <ProfilePicturePicker
//                 // label="Profile Picture"
//                 value={formData.profilePicture}
//                 onChange={(photo) => onHandleChange('profilePicture', photo)}
//                 error={errors.profilePicture}
//             />
//             <CustomTextInput
//                 icon="account"
//                 label={getVal('username_label')}
//                 value={formData.username}
//                 onChangeText={(text) => onHandleChange('username', text)}
//                 placeholder={getVal('username_placeholder')}
//                 error={errors.username}
//                 secureTextEntry={false}
//                 required={true}
//                 returnKeyType="next"
//                 onSubmitEditing={() => nameRef.current.focus()}
//             />
//             <CustomTextInput
//                 ref={nameRef}
//                 icon="account"
//                 label={getVal('name_label')}
//                 value={formData.name}
//                 onChangeText={(text) => onHandleChange('name', text)}
//                 placeholder={getVal('name_placeholder')}
//                 error={errors.name}
//                 secureTextEntry={false}
//                 returnKeyType="next"
//                 onSubmitEditing={() => surnameRef.current.focus()}
//             />
//             <CustomTextInput
//                 ref={surnameRef}
//                 icon="account"
//                 label={getVal('surname_label')}
//                 value={formData.surname}
//                 onChangeText={(text) => onHandleChange('surname', text)}
//                 placeholder={getVal('surname_placeholder')}
//                 error={errors.surname}
//                 secureTextEntry={false}
//                 returnKeyType="next"
//                 onSubmitEditing={() => emailRef.current.focus()}
//             />
//             <CustomTextInput
//                 ref={emailRef}
//                 icon="email"
//                 label={getVal('email_label')}
//                 value={formData.email}
//                 onChangeText={(text) => onHandleChange('email', text)}
//                 placeholder={getVal('email_placeholder')}
//                 error={errors.email}
//                 secureTextEntry={false}
//                 returnKeyType="next"
//                 onSubmitEditing={() => passwordRef.current.focus()}
//             />
//             <CustomTextInput
//                 ref={passwordRef}
//                 icon="lock"
//                 label={getVal('password_label')}
//                 value={formData.password}
//                 onChangeText={(text) => onHandleChange('password', text)}
//                 placeholder={getVal('password_placeholder')}
//                 error={errors.password}
//                 secureTextEntry={true}
//                 returnKeyType="next"
//                 onSubmitEditing={() => rePasswordRef.current.focus()}
//             />
//             <CustomTextInput
//                 ref={rePasswordRef}
//                 icon="lock"
//                 label={getVal('rePassword_label')}
//                 value={formData.rePassword}
//                 onChangeText={(text) => onHandleChange('rePassword', text)}
//                 placeholder={getVal('rePassword_placeholder')}
//                 error={errors.rePassword}
//                 secureTextEntry={true}
//                 returnKeyType="done"
//             />
//         </KeyboardAwareScrollView>
//     );
// };

// const getStyles = (theme) => StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         paddingVertical:10
//     },
//     scrollView: {
//         flexGrow: 1,
//         paddingBottom: 20,
//     },
//     infoText: {
//         fontSize: theme.fontSize.subHeading,
//         color: theme.textPrimary,
//         textAlign: 'Left',
//         marginVertical: 20,
//     },
// });

// export default EditProfile;
