import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const importAll = (context) => {
  let svgs = {};
  context.keys().forEach((filename) => {
    const key = filename.replace(/^.*[\\/]/, '').split('.')[0];
    svgs[key] = context(filename).default;
  });
  return svgs;
};

const svgComponents = {
  dark: importAll(require.context('../assets/svg/Dark', false, /\.svg$/)),
  light: importAll(require.context('../assets/svg/Light', false, /\.svg$/)),
};

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
