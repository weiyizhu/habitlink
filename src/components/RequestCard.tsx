import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserWID} from '../utils/models';
import {useUserContext} from '../utils/fn';

const RequestCard = (user: UserWID) => {
  const tailwind = useTailwind();
  const {uid, friends} = useUserContext();

  return (
    <View
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
    >
      <Text style={tailwind('text-2xl font-SemiBold')}>{user.name}</Text>
      <View style={tailwind('flex-row')}>
        <MaterialCommunityIcons
          name={'check'}
          onPress={() => {
            const friendsArr = [...user.friends];
            friendsArr.push(uid as string);
            const myArr = friends.map(item => item.uid);
            myArr.unshift(user.uid);
            firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                sentFriendRequests: user.sentFriendRequests.filter(
                  (id: string) => id !== uid,
                ),
                friends: friendsArr,
              });

            firestore()
              .collection('users')
              .doc(uid as string)
              .update({
                friends: myArr,
              });
          }}
          size={25}
          color="green"
          style={tailwind('px-3')}
        />
        <MaterialCommunityIcons
          name={'close'}
          onPress={() => {
            firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                sentFriendRequests: user.sentFriendRequests.filter(
                  (id: string) => id !== uid,
                ),
              });
          }}
          size={25}
        />
      </View>
    </View>
  );
};

export default RequestCard;
