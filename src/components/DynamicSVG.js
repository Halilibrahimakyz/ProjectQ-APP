import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
// Dark theme SVGs
import DarkOnBoard from '../assets/svg/Dark/OnBoard.svg';
import DarkOnBoardStudent1 from '../assets/svg/Dark/OnBoardStudent1.svg';
import DarkOnBoardStudent2 from '../assets/svg/Dark/OnBoardStudent2.svg';
import DarkOnBoardStudent3 from '../assets/svg/Dark/OnBoardStudent3.svg';
import DarkOnBoardSupporter1 from '../assets/svg/Dark/OnBoardSupporter1.svg';
import DarkOnBoardSupporter2 from '../assets/svg/Dark/OnBoardSupporter2.svg';
import DarkOnBoardSupporter3 from '../assets/svg/Dark/OnBoardSupporter3.svg';
import DarkWelcome from '../assets/svg/Dark/Welcome.svg';
import LetsYouIn from '../assets/svg/Dark/LetsYouIn.svg'
import Apple_logo_black from '../assets/svg/Dark/Apple_logo_black'
import google from '../assets/svg/Dark/google'

import LightOnBoard from '../assets/svg/Light/OnBoard.svg';
import LightOnBoardStudent1 from '../assets/svg/Light/OnBoardStudent1.svg';
import LightOnBoardStudent2 from '../assets/svg/Light/OnBoardStudent2.svg';
import LightOnBoardStudent3 from '../assets/svg/Light/OnBoardStudent3.svg';
import LightOnBoardSupporter1 from '../assets/svg/Light/OnBoardSupporter1.svg';
import LightOnBoardSupporter2 from '../assets/svg/Light/OnBoardSupporter2.svg';
import LightOnBoardSupporter3 from '../assets/svg/Light/OnBoardSupporter3.svg';
import LightWelcome from '../assets/svg/Light/Welcome.svg';
import Apple_logo_white from '../assets/svg/Light/Apple_logo_white'

const svgComponents = {
  dark: {
    OnBoard: DarkOnBoard,
    OnBoardStudent1: DarkOnBoardStudent1,
    OnBoardStudent2: DarkOnBoardStudent2,
    OnBoardStudent3: DarkOnBoardStudent3,
    OnBoardSupporter1: DarkOnBoardSupporter1,
    OnBoardSupporter2: DarkOnBoardSupporter2,
    OnBoardSupporter3: DarkOnBoardSupporter3,
    Welcome: DarkWelcome,
    LetsYouIn:LetsYouIn,
    AppleLogo:Apple_logo_white,
    GoogleLogo:google
  },
  light: {
    OnBoard: LightOnBoard,
    OnBoardStudent1: LightOnBoardStudent1,
    OnBoardStudent2: LightOnBoardStudent2,
    OnBoardStudent3: LightOnBoardStudent3,
    OnBoardSupporter1: LightOnBoardSupporter1,
    OnBoardSupporter2: LightOnBoardSupporter2,
    OnBoardSupporter3: LightOnBoardSupporter3,
    Welcome: LightWelcome,
    LetsYouIn:LetsYouIn,
    AppleLogo:Apple_logo_black,
    GoogleLogo:google
  },
};
// const importAll = (context) => {
//   let svgs = {};
//   context.keys().forEach((filename) => {
//     const key = filename.replace(/^.*[\\/]/, '').split('.')[0];
//     svgs[key] = context(filename).default;
//   });
//   return svgs;
// };

// const svgComponents = {
//   dark: importAll(require.context('../assets/svg/Dark', false, /\.svg$/)),
//   light: importAll(require.context('../assets/svg/Light', false, /\.svg$/)),
// };

const DynamicSVG = ({ fileName, width, height }) => {
  const theme = useSelector(state => state.theme.value);
  const SVGComponent = svgComponents[theme]?.[fileName];

  if (!SVGComponent) {
    console.error(`SVG dosyası bulunamadı: ${fileName} (${theme})`);
    return null;
  }

  return (
    <View>
      <SVGComponent width={width} height={height} />
    </View>
  );
};

export default DynamicSVG;
