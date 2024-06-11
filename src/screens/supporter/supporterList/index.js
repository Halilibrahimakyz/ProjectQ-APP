import { Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { Container } from '@/components';
import {useFetch} from '@/services';
import { useSelector, useDispatch } from 'react-redux';
import { TEST } from '@/api/endpoints';

const SupporterListScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();
  console.log("apiRoutes.test: ",TEST)
  const { data, loading, error } = useFetch(TEST);
  console.log("data: ",data,loading,error)
  const accessToken = useSelector((state) => state.authorization.accessToken);
  console.log("token : ",accessToken)
  const counterNum = useSelector((state) => state.counter.value);
  console.log("counterNum : ",counterNum)
  return (
    <Container style={styles.container} topBarProps={{
      title: getVal('list'),
      onLeftPress: () => { console.log('sol tıklandı'); },
      onRightPress: () => { console.log('Sağ tıklandı'); },
    }}
      bottomBar={true}
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