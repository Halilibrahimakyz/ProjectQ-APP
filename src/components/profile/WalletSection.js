import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WalletSection = ({ balanceAmount, onTopUpPress }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <View style={styles.walletIconContainer}>
          <MaterialCommunityIcons name="wallet" color={theme.primary} size={25} />
        </View>
        <View style={styles.balanceTextContainer}>
          <Text style={styles.balanceAmountText}>${balanceAmount}</Text>
          <Text style={styles.balanceDescriptionText}>{getVal('profile_wallet_desc')}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onTopUpPress} style={styles.topUpButton}>
        <Text style={styles.topUpButtonText}>{getVal('profile_wallet_topup')}</Text>
      </TouchableOpacity>
    </View>
  );
}


const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%", 
    height: 80, 
    marginTop: 20, 
    borderRadius: 18, 
    borderWidth: StyleSheet.hairlineWidth, 
    borderColor: theme.lightGrey, 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 22, 
    flexDirection: "row"
  },
  balanceContainer: {
    flexDirection: "row", 
    justifyContent: "flex-start", 
    alignItems: "center"
  },
  walletIconContainer: {
    justifyContent: "center", 
    alignItems: "center", 
    height: 42, 
    width: 42, 
    borderRadius: 21, 
    backgroundColor: theme.primarySupport
  },
  balanceTextContainer: {
    justifyContent: "center", 
    alignItems: "flex-start", 
    marginLeft: 14 
  },
  balanceAmountText: {
    color: theme.secondary, 
    fontSize: theme.fontSize.title, 
    fontWeight: "bold"
  },
  balanceDescriptionText: {
    color: theme.secondary, 
    fontSize: theme.fontSize.small
  },
  topUpButton: {
    paddingHorizontal: 15, 
    height: 38, 
    borderWidth: 1, 
    borderRadius: 20, 
    borderColor: theme.primary, 
    justifyContent: "center", 
    alignItems: "center"
  },
  topUpButtonText: {
    color: theme.primary, 
    fontSize: theme.fontSize.body, 
    fontWeight: "bold"
  },
});

export default WalletSection;