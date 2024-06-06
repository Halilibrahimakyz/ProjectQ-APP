import { Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container } from '@/components';

const StudentCreateScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('create'),
      onLeftPress: () => { console.log('sol tıklandı'); },
      onRightPress: () => { console.log('Sağ tıklandı'); },
      shadow: false
    }}
      bottomBar={true}
      compId={props.componentId}
    >
      <Text style={{ color: theme.primary }}>StudentCreateScreen</Text>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

export default StudentCreateScreen;