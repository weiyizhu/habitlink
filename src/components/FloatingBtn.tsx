import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTailwind} from 'tailwind-rn/dist';

const FloatingBtn = () => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('absolute bottom-7 right-7')}>
      <MaterialCommunityIcons
        // onPress={handleCheckBoxCheck}
        name="plus-circle"
        size={50}
        color="#637081"
      />
    </TouchableOpacity>
  );
};

export default FloatingBtn;
