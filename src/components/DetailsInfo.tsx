import React from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {fontType} from '../utils/types';
import CustomText from './CustomText';

const DetailsInfo = ({title, num}: {title: string; num: number}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-row justify-between')}>
      <CustomText font={fontType.Medium} size={18}>
        {title}
      </CustomText>
      <View style={tailwind('items-center justify-center ml-2')}>
        <CustomText font={fontType.Medium} size={18}>
          {num}
        </CustomText>
      </View>
    </View>
  );
};

export default DetailsInfo;
