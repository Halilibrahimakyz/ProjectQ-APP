import React, { useMemo, useCallback,useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container, CustomPhotoAdd, CustomSeparator, CustomTextInput, CustomPicker, CustomDatePicker, CustomCheckbox } from '@/components';
import { dismissModal } from '@/navigation/navigationFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, setFormData, setError,setErrors, clearErrors, clearError, resetForm, setPhotoData,setIsDraft } from '@/storeReduxToolkit/projectFormSlice';
import { validateStep, handleValidation } from './utils/validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createProject } from '@/services'
import moment from 'moment';

const StudentCreateScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();
  const dispatch = useDispatch();
  const { step, formData, errors } = useSelector((state) => state.projectForm);
  const [loading, setLoading] = useState(false);

  const steps = [
    { keys: ['coverPhoto', 'title', 'description', 'category', 'expirationDate', 'goalAmount', 'privacy'] },
  ];

  const handleChange = useCallback(async (key, value) => {
    dispatch(setFormData({ [key]: value }));
    const error = await handleValidation(formData, key, value, getVal);
    if (error) {
      dispatch(setError({ [key]: error }));
    } else {
      dispatch(clearError(key));
    }
  }, [dispatch, formData, getVal]);


  const handlePrivacyPolicyPress = useCallback(() => {
    alert('Gizlilik Politikası linkine tıklandı!');
  }, []);

  const handleTermsOfServicePress = useCallback(() => {
    alert('Hizmet Şartları linkine tıklandı!');
  }, []);

  const handleDraft = useCallback(() => {
    dispatch(setIsDraft(true));
    // Save the draft logic here if needed
    console.log("drafthandle");
  }, [dispatch]);

  const handleSubmit = useCallback(async () => {
    const currentStep = steps[step - 1];
    const { isValid, errors } = await validateStep(formData, currentStep.keys, getVal);
    if (!isValid) {
      dispatch(setErrors(errors));
    } else if (step < steps.length) {
      dispatch(clearErrors(currentStep.keys));
      dispatch(nextStep());
    } else {
      setLoading(true);
     
      const projectData = {
        title: formData.title,
        description: formData.description,
        endDate: formData.expirationDate,
        goalAmount: formData.goalAmount,
        currentAmount: formData.currentAmount,
        projectType: formData.category,
        starDate: moment(new Date).format('DD/MM/YYYY'),
        photos: [
          formData.coverPhoto,
          formData.otherPhoto1,
          formData.otherPhoto2,
          formData.otherPhoto3,
          formData.otherPhoto4,
        ].filter(Boolean), // Filter out empty photos
      };
  
      console.log("projectData: ", projectData);
  
      try {
        const response = await createProject(projectData);
        console.log("response: ", response);
        dismissModal(props.componentId)
      } catch (error) {
        console.error("Failed to create project: ", error);
      } finally {
        setLoading(false); // Ensure setLoading(false) is called regardless of the request outcome
      }
     
    }
  }, [dispatch, formData, getVal, step, steps]);

  const interestsList = useMemo(() => [
    { value: 'technology', label: getVal('technology') },
    { value: 'science', label: getVal('science') },
    { value: 'art', label: getVal('art') },
    { value: 'music', label: getVal('music') },
    { value: 'sports', label: getVal('sports') },
    { value: 'literature', label: getVal('literature') },
    { value: 'gaming', label: getVal('gaming') },
    { value: 'travel', label: getVal('travel') },
    { value: 'food', label: getVal('food') },
    { value: 'history', label: getVal('historyİnterest') },
    { value: 'photography', label: getVal('photography') },
    { value: 'other', label: getVal('other') },
  ], [getVal]);

  // console.log("formData: ", formData)
  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('create'),
      leftIcon: 'close',
      onLeftPress: () => { dismissModal(props.componentId) },
      onRightPress: () => { console.log('Sağ tıklandı'); },
      shadow: false,
    }}
      // bottomBar={true}
      loading={loading}
      compId={props.componentId}
    >
      <View style={styles.content}>
        <KeyboardAwareScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.scrollView}
          enableOnAndroid={true}
          extraScrollHeight={100}
        >
          <CustomPhotoAdd
            label={getVal('addCoverPhoto')}
            value={formData.coverPhoto}
            onChange={(photo) => handleChange('coverPhoto', photo)}
            error={errors.coverPhoto}
          />
          <View style={styles.PhotoRow}>
            <View style={styles.Photo}>
              <CustomPhotoAdd
                value={formData.otherPhoto1}
                onChange={(photo) => handleChange('otherPhoto1', photo)}
                error={errors.otherPhoto1}
              />
            </View>
            <View style={styles.Photo}>
              <CustomPhotoAdd
                value={formData.otherPhoto2}
                onChange={(photo) => handleChange('otherPhoto2', photo)}
                error={errors.otherPhoto2}
              />
            </View>
            <View style={styles.Photo}>
              <CustomPhotoAdd
                value={formData.otherPhoto3}
                onChange={(photo) => handleChange('otherPhoto3', photo)}
                error={errors.otherPhoto3}
              />
            </View>
            <View style={styles.Photo}>
              <CustomPhotoAdd
                value={formData.otherPhoto4}
                onChange={(photo) => handleChange('otherPhoto4', photo)}
                error={errors.otherPhoto4}
              />
            </View>
          </View>
          <CustomSeparator />
          <Text style={styles.sectionTitle}>{getVal('projectDetails')}</Text>
          <CustomTextInput
            icon="pencil"
            label={getVal('title_label')}
            value={formData.title}
            onChangeText={(text) => handleChange('title', text)}
            placeholder={getVal('title_placeholder')}
            error={errors.title}
            secureTextEntry={false}
            required={true}
            returnKeyType="next"
          />
          <CustomTextInput
            icon="pencil"
            label={getVal('description_label')}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder={getVal('description_placeholder')}
            error={errors.description}
            secureTextEntry={false}
            required={true}
            returnKeyType="next"
            multiline={true}
          />
          <CustomPicker
            icon="earth"
            label={getVal('category_label')}
            value={formData.category}
            onChange={(text) => handleChange('category', text)}
            placeholder={getVal('category_placeholder')}
            error={errors.category}
            options={interestsList}
          />
          <CustomDatePicker
            icon="calendar"
            label={getVal('expirationDate_label')}
            value={formData.expirationDate}
            onChange={(date) => handleChange('expirationDate', date)}
            placeholder={getVal('expirationDate_placeholder')}
            error={errors.expirationDate}
            minDate={new Date}
          />
          <CustomTextInput
            icon="cash"
            label={getVal('goalAmount_label')}
            value={formData.goalAmount}
            onChangeText={(text) => handleChange('goalAmount', text)}
            placeholder={getVal('goalAmount_placeholder')}
            error={errors.goalAmount}
            secureTextEntry={false}
            required={true}
            returnKeyType="next"
            keyboardType='numeric'
          />
          <CustomCheckbox
            labelComponents={[
              { text: getVal('byChecking'), onPress: null },
              { text: getVal('terms'), onPress: handlePrivacyPolicyPress },
              { text: getVal('&'), onPress: null },
              { text: getVal('conditions'), onPress: handleTermsOfServicePress },
              { text: getVal('thatApplyToUs'), onPress: null }
            ]}
            value={formData.privacy}
            onValueChange={(text) => handleChange('privacy', text)}
            error={errors.privacy}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={handleDraft}
          style={[styles.button, { width: '33%', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }]}
        >
          <Text style={styles.buttonText}>{getVal("draft")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.button,
            {
              width: '66%',
              borderRadius: 0,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>{getVal("create")}</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    paddingHorizontal: theme.padding.default,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
    // paddingVertical: 10,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  PhotoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  Photo: {
    width: '20%',
  },
  sectionTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginVertical: 10,
    color: theme.secondary,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontSize: theme.fontSize.button,
    color: theme.background,
  },
});

export default React.memo(StudentCreateScreen);
