import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {UserWID} from '../utils/models';

const FriendCard = (user: UserWID) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
      onPress={() => {}}>
      <View>
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard;
