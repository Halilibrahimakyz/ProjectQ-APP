import { Text, StyleSheet, ScrollView, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container } from '@/components';
import { popScreen, pushScreen } from '@/navigation/navigationFunctions';

import BalanceDisplay from './components/BalanceDisplay';
import WalletActionButton from './components/WalletActionButton';

const StudentWalletScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <Container style={styles.container} topBarProps={{
      title: getVal("wallet"),
      onLeftPress: () => { popScreen(props.componentId); },
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu',
      shadow: false
    }}
      compId={props.componentId}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroller}
        contentContainerStyle={{alignItems: "center"}}
      >
        <BalanceDisplay balance={349}/>
        <View style={styles.buttonContainer}>
          <WalletActionButton 
            bgColor={theme.primary} 
            borderColor={theme.primary}
            icon={"upload"}
            title={getVal("wallet_topup")}
            textColor={theme.background}
          />
          <WalletActionButton 
            bgColor={theme.background} 
            borderColor={theme.primary}
            icon={"download"}
            title={getVal("wallet_withdraw")}
            textColor={theme.primary}
          />
        </View>
        <View style={styles.horizontalRuler}/>
      </ScrollView>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  scroller: {
    flex: 1,
    backgroundColor: theme.background,
    width: "100%",
    height: "100%"
  },
  horizontalRuler: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: theme.lightGrey,
    marginTop: 16
  },
  buttonContainer: {
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default StudentWalletScreen;