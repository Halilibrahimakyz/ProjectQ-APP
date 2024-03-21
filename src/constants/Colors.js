
import { useSelector } from 'react-redux';

export const lightTheme = {
  background: '#EBEEF2',
  background2: '#151619',
  primary: '#13B156',
  secondary: '#262934',
  accent: '#09101D',
  black: '#151619'
};

export const darkTheme = {
  background: '#151619',
  background2: '#EBEEF2',
  primary: '#13B156',
  secondary: '#EBEEF2',
  accent: '#FFFFFF',
  black: '#09101D'
};


export const useTheme = () => {
  const currentTheme = useSelector((state) => state.theme.value); 
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;
  return theme;
};

// text: 'red', //light_orange
// white:'#FFFFFF',
// darkWhite:'#EBEEF2',
// green:'#13B156',
// gray:'#262934',
// darkBlue:'#09101D',
// black:'#151619'