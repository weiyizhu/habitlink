import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {FriendCardProps} from '../utils/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendRequestCard = ({name, uid}: FriendCardProps) => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
    >
      <Text style={tailwind('text-2xl font-SemiBold')}>{name}</Text>
      <View style={tailwind('flex-row')}>
        <MaterialCommunityIcons
          name={'check'}
          onPress={() => {
            console.log('check');
          }}
          size={25}
          style={tailwind('px-3')}
        />
        <MaterialCommunityIcons
          name={'close'}
          onPress={() => {
            console.log('close');
          }}
          size={25}
        />
      </View>
    </View>
  );
};

export default FriendRequestCard;
