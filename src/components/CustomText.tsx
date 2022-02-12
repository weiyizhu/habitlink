import React from 'react';
import {Text, TextProps} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import { CustomTextProp } from '../utils/types';

export default function CustomText({
  font,
  size,
  additionStyle,
  children,
}: CustomTextProp) {
  const tailwind = useTailwind();
  return <Text style={[{fontSize: size},tailwind(` font-${font} ${additionStyle}`)]}>{children}</Text>;
}
