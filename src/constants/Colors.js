
import { useSelector } from 'react-redux';

const baseTheme = {
  fontSize: {
    small: 12, // Yardımcı metinler için, örneğin etiketler veya talimatlar.
    body: 14, // Ana içerik metni için standart boyut. Paragraflar, açıklamalar.
    medium:16,
    button: 18, // Buton metinleri için. Yeterli dokunma alanı sağlamak ve okunabilirliği artırmak için.
    title: 18, // Küçük başlıklar için. Bölüm başlıkları gibi.
    large:20,
    heading: 24, // Büyük başlıklar için. Ekran başlıkları, önemli bilgiler.
    display1: 30, // Büyük ekran başlıkları veya önemli metinler için.
    display2: 36, // Çok büyük metinler için, örneğin açılış ekranında kullanılan metinler.
  },
  primary: '#13B156',//Green
  accent: '#09101D',//Dark Blue
  black: '#151619',//Black
  white: '#FBFBFB',//White
  purple: '#8B13B1'
};

export const lightTheme = {
  ...baseTheme,
  background: '#EBEEF2',//Dark White
  background2: '#151619',//Black
  secondary: '#262934',//Grey
  lightGrey: '#838383',//Light Grey
  type:'light'
};

export const darkTheme = {
  ...baseTheme,
  background: '#151619',
  background2: '#EBEEF2',
  secondary: '#838383', // Assuming this was intended to be different in dark mode
  lightGrey: '#838383',//Light Grey
  type:'dark'
};

export const useTheme = () => {
  const theme = useSelector(state => state.theme.value === 'light' ? lightTheme : darkTheme);
  return theme;
};