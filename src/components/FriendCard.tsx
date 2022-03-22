import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {FriendCardProps} from '../utils/types';

const FriendCard = ({name, uid}: FriendCardProps) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
      onPress={() => {}}
    >
      <View>
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard;
