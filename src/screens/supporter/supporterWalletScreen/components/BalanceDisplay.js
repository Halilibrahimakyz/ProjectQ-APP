import { Text, View, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language';

const BalanceDisplay = ({ balance }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>${balance}</Text>
      <Text style={styles.balanceLabel}>{getVal('wallet_balance')}</Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: theme.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 16
  },
  balanceText: {
    color: theme.primary,
    fontSize: theme.fontSize.display2,
    fontWeight: "bold"
  },
  balanceLabel: {
    color: theme.secondary,
    fontSize: theme.fontSize.medium
  }
});

export default BalanceDisplay;