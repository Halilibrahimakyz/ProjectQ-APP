
import { useSelector } from 'react-redux';

const baseTheme = {
  fontSize: {
    small: 12, // Yardımcı metinler için, örneğin etiketler veya talimatlar.
    body: 14, // Ana içerik metni için standart boyut. Paragraflar, açıklamalar.
    button: 16, // Buton metinleri için. Yeterli dokunma alanı sağlamak ve okunabilirliği artırmak için.
    title: 20, // Küçük başlıklar için. Bölüm başlıkları gibi.
    heading: 24, // Büyük başlıklar için. Ekran başlıkları, önemli bilgiler.
    display1: 30, // Büyük ekran başlıkları veya önemli metinler için.
    display2: 36, // Çok büyük metinler için, örneğin açılış ekranında kullanılan metinler.
  },
  primary: '#13B156',
  accent: '#09101D',
  black: '#151619',
  white: '#FFFFFF',
};

export const lightTheme = {
  ...baseTheme,
  background: '#EBEEF2',
  background2: '#151619',
  secondary: '#262934',
  lightGrey: '#838383',
  onBoardBackButton: '#838383',
  onBoardSkipButton: '#A9A9A9',
  onBoardDescText: '#292929',
  type:'light'
};

export const darkTheme = {
  ...baseTheme,
  background: '#151619',
  background2: '#EBEEF2',
  secondary: '#838383', // Assuming this was intended to be different in dark mode
  lightGrey: '#838383',
  onBoardBackButton: '#A9A9A9',
  onBoardSkipButton: '#838383',
  onBoardDescText: '#fff',
  type:'dark'
};

export const useTheme = () => {
  const theme = useSelector(state => state.theme.value === 'light' ? lightTheme : darkTheme);
  return theme;
};