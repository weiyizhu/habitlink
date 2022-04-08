import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FriendCard from '../components/FriendCard';
import {useUserContext} from '../utils/fn';
import {User, UserWID} from '../utils/models';
import FriendRequestCard from '../components/FriendRequestCard';
import FloatingBtn from '../components/FloatingBtn';
import { FriendScreenProp } from '../utils/types';

const FriendsScreen = ({navigation}: FriendScreenProp) => {
  const tailwind = useTailwind();
  const {uid, friends, friendRequests}=
    useUserContext();

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList
        data={friendRequests.concat(friends)}
        renderItem={({item}) => {
          return item.friends.includes(uid as string) ? (
            <FriendCard {...item} />
          ) : (
            <FriendRequestCard {...item} />
          );
        }}
        extraData={friendRequests.concat(friends)}
      />
      <FloatingBtn
        handlePlusCirclePress={() => {
          navigation.navigate("AddFriend")
        }}
      />
    </View>
  );
};

export default FriendsScreen;
