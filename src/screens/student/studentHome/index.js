import { Text, StyleSheet } from 'react-native';
import React, { useMemo, useEffect,useState } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container, CustomSwitch } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';

const StudentHomeScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [loading, setLoading] = useState(false);
  const { getVal } = useLanguage();

  const loaderTry = () => {
    setLoading(true); // Önce true yap
    const timer = setTimeout(() => {
        setLoading(false); // 3 saniye sonra false yap
    }, 1000);

    return () => clearTimeout(timer);
};

  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('home'),
      leftIcon:'home',
      onLeftPress: () => { loaderTry() },
      onRightPress: () => { console.log('Sağ tıklandı'); },
    }}
      bottomBar={true}
      compId={props.componentId}
      loading={loading}
    >
      <Text style={{ color: theme.primary }}>StudentHomeScreen</Text>
      <CustomSwitch/>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

export default StudentHomeScreen;