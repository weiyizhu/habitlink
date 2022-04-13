import { firebase } from '@react-native-firebase/firestore';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTailwind} from 'tailwind-rn';
import { useUserContext } from '../utils/fn';
import {User, UserWID} from '../utils/models';

type FriendCardProps = {
  user: UserWID;
  navigation: any;
};
const FriendCard = ({user, navigation}: FriendCardProps) => {
  const tailwind = useTailwind();
  const {uid, user: curr} = useUserContext();
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
  <MaterialCommunityIcons
        onPress={() => {
          const newFriends = curr?.friends.filter((item) => item !== friendUid);
          firebase.firestore().collection('users').doc(uid as string).update({friends: newFriends});
          firebase.firestore().collection('users').doc(friendUid).get().then((snapshot) => {
              const friendUser = snapshot.data() as User;
              const newfriendUserArray = friendUser.friends.filter((item) => item !== uid);
              firebase.firestore().collection('users').doc(friendUid).update({friends: newfriendUserArray});
          });
        }}
        name={'delete'}
        size={25}
      />
    </TouchableOpacity>
  );
};

export default FriendCard;
