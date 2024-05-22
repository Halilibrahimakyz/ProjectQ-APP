import { Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container } from '@/components';

const SupporterListScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <Container style={styles.container} topBarProps={{
      title: 'List',
      onLeftPress: () => { console.log('sol tıklandı'); },
      leftIcon: 'menu',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu',
      shadow: false
    }}
      compId={props.componentId}
    >
      <Text style={{ color: theme.primary }}>SupporterListScreen</Text>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

export default SupporterListScreen;