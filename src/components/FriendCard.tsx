import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {UserWID} from '../utils/models';

type FriendCardProps = {
  user: UserWID;
  navigation: any;
};
const FriendCard = ({user, navigation}: FriendCardProps) => {
  const tailwind = useTailwind();
  const friendUid = user.uid;

  return (
    <TouchableOpacity
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
      onPress={() => {
        navigation.navigate('ShowHome', {
          friendUid: friendUid,
          friendName: user.name,
        });
      }}
    >
      <View>
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard;
