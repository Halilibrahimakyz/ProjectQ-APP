import { Text, StyleSheet } from 'react-native';
import React, { useMemo, useEffect } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container } from '@/components';
import { setStatusBar } from '@/functions/setStatusBar';

const StudentHomeScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('home'),
      onLeftPress: () => { console.log('sol tıklandı'); },
      onRightPress: () => { console.log('Sağ tıklandı'); },
    }}
      bottomBar={true}
      compId={props.componentId}
    >
      <Text style={{ color: theme.primary }}>StudentHomeScreen</Text>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

export default StudentHomeScreen;