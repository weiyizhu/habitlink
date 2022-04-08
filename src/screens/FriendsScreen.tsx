import React from 'react';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FriendCard from '../components/FriendCard';
import {useUserContext} from '../utils/fn';
import {UserWID} from '../utils/models';
import FriendRequestCard from '../components/RequestCard';
import FloatingBtn from '../components/FloatingBtn';
import {FriendScreenProp} from '../utils/types';

const FriendsScreen = ({navigation}: FriendScreenProp) => {
  const tailwind = useTailwind();
  const {uid, friends, friendRequests} = useUserContext();

  const check = (user: UserWID) => {
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
  };

  const close = (user: UserWID) => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        sentFriendRequests: user.sentFriendRequests.filter(
          (id: string) => id !== uid,
        ),
      });
  };

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList
        data={friendRequests.concat(friends)}
        renderItem={({item}) => {
          return item.friends.includes(uid as string) ? (
            <FriendCard user={item as UserWID} navigation={navigation} />
          ) : (
            <FriendRequestCard
              name={item.name}
              check={() => check(item)}
              close={() => close(item)}
            />
          );
        }}
        extraData={friendRequests.concat(friends)}
      />
      <FloatingBtn
        handlePlusCirclePress={() => {
          navigation.navigate('AddFriend');
        }}
      />
    </View>
  );
};

export default FriendsScreen;
