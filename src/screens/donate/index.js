import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import { Container, CustomButton, CustomSeparator, CustomModal } from '@/components';
import { dismissModal } from '@/navigation/navigationFunctions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DonateToProject } from '@/services/transaction';

const { width } = Dimensions.get('window');

const DonateScreen = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();
  const [amount, setAmount] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [feePercentage, setFeePercentage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    id,
    currentAmount,
    goalAmount,
  } = props.project;

  const remainingAmount = goalAmount - currentAmount;

  const handleAmountPress = (value) => {
    if (value > remainingAmount) {
      Alert.alert(getVal('error'), getVal('amount_exceeds'));
    } else {
      setAmount(value);
    }
  };

  const handleInputChange = (text) => {
    const value = parseFloat(text) || 0;
    if (value > remainingAmount) {
      Alert.alert(getVal('error'), getVal('amount_exceeds'));
    } else {
      setAmount(value);
    }
  };

  const handleSliderChange = (value) => {
    setFeePercentage(value);
  };

  const totalFee = (amount * feePercentage) / 100;
  const totalAmount = amount + totalFee;

  const handleDonatePress = () => {
    if(totalAmount==0){
      Alert.alert(getVal('error'), getVal('amount_0'));
    }else{
      setModalVisible(true);
    }
   
  };

  const handleCloseModal = async () => {
    const response = await DonateToProject(parseInt(id, 10), parseFloat(amount));
    if(response.success){
      setModalVisible(false);
      dismissModal(props.componentId);
      Alert.alert(getVal('thanks_for_donate'));
    } else{
      Alert.alert(getVal('error'), getVal('something_went_wrong'));
    }
   
  };

  return (
    <Container
      style={styles.container}
      topBarProps={{
        title: getVal('donate'),
        leftIcon: 'close',
        onLeftPress: () => { dismissModal(props.componentId) },
        shadow: false,
      }}
      loading={loading}
      compId={props.componentId}
    >
      <CustomModal visible={modalVisible} onClose={() => handleCloseModal(props.componentId)}>
        <View style={styles.modalContent}>
          <Text style={styles.thankYouText}>{getVal('thank_you')}</Text>
          <Text style={styles.ibanText}>IBAN : TR92 0001 0002 3085 8404 8050 01</Text>
          <CustomButton title={getVal('close')} onPress={() => handleCloseModal(props.componentId)} />
        </View>
      </CustomModal>
      <View style={styles.content}>
        <KeyboardAwareScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.scrollView}
          enableOnAndroid={true}
          extraScrollHeight={100}
        >
          <Text style={styles.subtitle}>{getVal('enter_amount')}</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.textInput}
              keyboardType='numeric'
              placeholder={getVal('enter_custom_amount')}
              value={amount.toString()}
              onChangeText={handleInputChange}
            />
          </View>
          <View style={styles.buttonContainerAmount}>
            {[5, 10, 25, 50, 100, 200].map((value) => (
              <TouchableOpacity
                key={value}
                style={[styles.amountButton, amount === value && styles.selectedAmountButton]}
                onPress={() => handleAmountPress(value)}
                disabled={value > remainingAmount}
              >
                <Text style={[styles.amountButtonText, amount === value && styles.selectedAmountButtonText]}>${value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getVal('tip')}</Text>
            <Text style={styles.sliderValue}>{feePercentage}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={feePercentage}
              onValueChange={handleSliderChange}
              minimumTrackTintColor={theme.primary}
              maximumTrackTintColor={theme.lightGrey}
              thumbTintColor={theme.primary}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>{getVal('your_donation')}</Text>
            <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalContainer, { marginBottom: 10 }]}>
            <Text style={styles.totalLabel}>{getVal('your_tip')}</Text>
            <Text style={styles.totalAmount}>${totalFee.toFixed(2)}</Text>
          </View>
          <CustomSeparator />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>{getVal('total_amount')}</Text>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleDonatePress}
          style={[
            styles.button,
            {
              width: '100%',
              borderRadius: 30,
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>{getVal("continue")}</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.secondary,
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: theme.secondary,
    textAlign: 'center',
    marginVertical: 8,
  },
  amountContainer: {
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    padding: 16,
  },
  amountText: {
    fontSize: 32,
    color: theme.primary,
  },
  buttonContainerAmount: {
    marginVertical: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  amountButton: {
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    width: '30%',
  },
  selectedAmountButton: {
    backgroundColor: theme.primary,
  },
  amountButtonText: {
    fontSize: 16,
    color: theme.primary,
  },
  selectedAmountButtonText: {
    color: theme.white,
  },
  textInput: {
    width: '100%',
    textAlign: 'center',
    fontWeight:'bold',
    fontSize: 56,
    color: theme.primary,
  },
  checkboxLabel: {
    fontSize: 16,
    color: theme.secondary,
    marginVertical: 8,
  },
  sliderContainer: {
    marginVertical: 10,
    width: '100%',
  },
  sliderLabel: {
    fontSize: 16,
    color: theme.secondary,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
    margin: 0,
    padding: 0
  },
  sliderValue: {
    fontSize: 16,
    color: theme.primary,
    textAlign: 'center',
    marginTop: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  totalLabel: {
    fontSize: 16,
    color: theme.secondary,
  },
  totalAmount: {
    fontSize: 16,
    color: theme.primary,
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
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.secondary,
    marginBottom: 20,
  },
  ibanText: {
    fontSize: 16,
    color: theme.secondary,
    marginBottom: 20,
  },
});

export default DonateScreen;
