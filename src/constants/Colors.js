
import { useSelector } from 'react-redux';

export const lightTheme = {
  background: '#EBEEF2',//darkwhite
  background2: '#151619',//black
  primary: '#13B156',//green
  secondary: '#262934',//grey
  accent: '#09101D',//darkblue
  lightGrey:'#838383',//lightGrey
  black: '#151619',//black
  white: '#FFFFFF' //white
};

export const darkTheme = {
  background: '#151619',//black
  background2: '#EBEEF2',//darkwhite
  primary: '#13B156',//green
  secondary: '#838383',//grey
  lightGrey:'#838383',//lightGrey
  accent: '#09101D',//darkblue
  black: '#151619',//black
  white: '#FFFFFF' //white
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