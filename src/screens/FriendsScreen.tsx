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
import {fontType, FriendScreenProp} from '../utils/types';
import CustomText from '../components/CustomText';

const FriendsScreen = ({navigation}: FriendScreenProp) => {
  const tailwind = useTailwind();
  const {uid, friends, friendRequests} = useUserContext();

  const check = (ouser: UserWID) => {
    const friendsArr = [...ouser.friends];
    friendsArr.push(uid as string);
    const myArr = friends.map(item => item.uid);
    myArr.unshift(ouser.uid);
    firestore()
      .collection('users')
      .doc(ouser.uid)
      .update({
        sentFriendRequests: ouser.sentFriendRequests.filter(
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
      {(friendRequests.length !== 0 || friends.length !== 0) && <FlatList
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
      /> }
      {friendRequests.length === 0 &&  friends.length === 0 && <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
      Click the add button to add some friends!
      </CustomText>}
      <FloatingBtn
        handlePlusCirclePress={() => {
          navigation.navigate('AddFriend');
        }}
      />
    </View>
  );
};

export default FriendsScreen;
