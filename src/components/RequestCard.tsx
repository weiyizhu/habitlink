import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {RequestCardProps} from '../utils/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RequestCard = ({name, handleCheck, handleCross}: RequestCardProps) => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
    >
      <Text style={tailwind('text-2xl font-YC_SemiBold')}>{name}</Text>
      <View style={tailwind('flex-row')}>
        <MaterialCommunityIcons
          name={'check'}
          onPress={handleCheck}
          size={25}
          color="green"
          style={tailwind('px-3')}
        />
        <MaterialCommunityIcons
          name={'close'}
          onPress={handleCross}
          color="red"
          size={25}
        />
      </View>
    </View>
  );
};

export default RequestCard;
