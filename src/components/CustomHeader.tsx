import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';
import {fontType} from '../utils/types';
import CustomText from './CustomText';

const CustomHeader = ({title}: {title: string}) => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={tailwind('h-32')}>
      <CustomText
        font={fontType.SemiBold}
        size={48}
        additionStyle="text-center"
      >
        {title}
      </CustomText>
    </SafeAreaView>
  );
};

export default CustomHeader;
