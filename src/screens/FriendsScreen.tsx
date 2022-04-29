import React, {useState} from 'react';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FriendCard, {deleteFunction} from '../components/FriendCard';
import {useUserContext} from '../utils/fn';
import {User, UserWID} from '../utils/models';
import FriendRequestCard from '../components/RequestCard';
import FloatingBtn from '../components/FloatingBtn';
import {fontType, FriendScreenProp} from '../utils/types';
import CustomText from '../components/CustomText';
import Dialog from '../components/Dialog';

const FriendsScreen = ({navigation}: FriendScreenProp) => {
  const tailwind = useTailwind();
  const {
    uid,
    user: curr,
    friends,
    friendRequests,
    friendDialog,
    friendUidDialog,
    setFriendDialog,
  } = useUserContext();

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
    <View style={tailwind('flex-1 px-7 justify-between')}>
      {(friendRequests.length !== 0 || friends.length !== 0) && (
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
      )}
      {(friendRequests.length !== 0 || friends.length !== 0) && friendDialog && (
        <Dialog
          isDialogVisible={friendDialog}
          setIsDialogVisible={setFriendDialog}
          title="Warning"
          message={
            'You are about to unfriend this user, are you sure you want to do this?'
          }
          handleYes={() => {
            deleteFunction(curr as User, friendUidDialog, uid as string);
          }}
          yesLabel="Proceed"
          noLabel="Cancel"
        />
      )}

      {friendRequests.length === 0 && friends.length === 0 && (
        <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
          Click the add button to add some friends!
        </CustomText>
      )}
      <View style={tailwind('h-24 justify-center')}>
        <FloatingBtn
          handlePlusCirclePress={() => {
            navigation.navigate('AddFriend');
          }}
        />
      </View>
    </View>
  );
};

export default FriendsScreen;
