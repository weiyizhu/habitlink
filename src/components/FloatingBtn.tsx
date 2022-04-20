import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTailwind} from 'tailwind-rn/dist';
import {FloatingBtnProps} from '../utils/types';

const FloatingBtn = ({handlePlusCirclePress}: FloatingBtnProps) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('self-end')}>
      <MaterialCommunityIcons
        onPress={handlePlusCirclePress}
        name="plus-circle"
        size={50}
        color="#637081"
      />
    </TouchableOpacity>
  );
};

export default FloatingBtn;
