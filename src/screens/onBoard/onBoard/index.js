import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen } from '@/navigation/navigationFunctions';
import { Container, DynamicSVG } from '@/components';

const OnBoardScreen = props => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { getVal } = useLanguage();

  return (
    <Container style={styles.container} topBarProps={{
      // title: 'Ana Sayfa',
      onLeftPress: () => { popScreen(props.componentId) },
      leftIcon: 'arrow-left',
      onRightPress: () => { console.log('Sağ tıklandı'); },
      // rightIcon: 'menu'
    }}
    compId={props.componentId}
    >
      <View style={styles.content}>
        <DynamicSVG fileName="OnBoard" width={200} height={200} />
        <Text style={styles.header}>{getVal("on_board_title")}</Text>
        <Text style={styles.subHeader}>
          {getVal("on_board_desc")}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => pushScreen(props.componentId, "AppInfoStudentScreen")} style={[styles.card, { borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }]}>
          <Text style={[styles.userType]}>{getVal("on_board_student_button")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pushScreen(props.componentId, "AppInfoSupporterScreen")} style={[styles.card, { borderTopRightRadius: 30, borderBottomRightRadius: 30 }]}>
          <Text style={[styles.userType]}>{getVal("on_board_supporter_button")}</Text>

        </TouchableOpacity>
      </View>
    </Container>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:30
  },
  header: {
    color: theme.primary,
    fontSize: theme.fontSize.heading,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeader: {
    color: theme.secondary,
    fontSize: theme.fontSize.medium,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, 
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '49.5%',
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000', //TODO
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },
  userType: {
    fontSize: theme.fontSize.button,
    color: theme.background
  },
});

export default OnBoardScreen;