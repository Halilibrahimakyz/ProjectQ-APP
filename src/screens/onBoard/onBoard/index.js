import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from '@/constants/colors';
import { useLanguage } from '@/constants/language'
import { popScreen, pushScreen } from '@/navigator/navFunctions';
import { Container, DynamicSVG } from '@/components';

const OnBoardScreen = props => {
  const { getVal, changeLanguage } = useLanguage();
  const theme = useTheme();
  const styles = getStyles(theme);

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
        <DynamicSVG fileName="OnBoard" width={300} height={300} />
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
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    color: theme.primary,
    fontSize: theme.fontSize.display1,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeader: {
    color: theme.secondary,
    fontSize: theme.fontSize.title,
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