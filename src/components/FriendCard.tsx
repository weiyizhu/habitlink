import {firebase} from '@react-native-firebase/firestore';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTailwind} from 'tailwind-rn';
import {useUserContext} from '../utils/fn';
import {Habit, User, UserWID} from '../utils/models';

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
      }}>
      <View>
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{user.name}</Text>
      </View>
      <MaterialCommunityIcons
        onPress={() => {
          if (
            curr?.competition &&
            Object.keys(curr.competition).length > 0 &&
            curr.competition.competitor === friendUid
          ) {
            firebase
              .firestore()
              .collection('users')
              .doc(curr.competition.competitor)
              .update({competition: {}});
            firebase
              .firestore()
              .collection('users')
              .doc(uid as string)
              .update({competition: {}});

            const habitRef = firebase
              .firestore()
              .collection('habits')
              .where('user', '==', uid)
              .where('inCompetition', '==', true);

            habitRef.get().then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                firebase
                  .firestore()
                  .collection('habits')
                  .doc(documentSnapshot.id)
                  .update({inCompetition: false});
              });
            });

            const otherRef = firebase
              .firestore()
              .collection('habits')
              .where('user', '==', friendUid)
              .where('inCompetition', '==', true);
            otherRef.get().then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                firebase
                  .firestore()
                  .collection('habits')
                  .doc(documentSnapshot.id)
                  .update({inCompetition: false});
              });
            });
          }

          firebase
            .firestore()
            .collection('users')
            .doc(friendUid)
            .get()
            .then(snapshot => {
              const friend = snapshot.data() as User;
              const friendCompRequests = friend.competitionRequests.filter(
                item => item.uid !== uid,
              );
              firebase
                .firestore()
                .collection('users')
                .doc(friendUid)
                .update({competitionRequests: friendCompRequests});
            });

          const compRequests = curr?.competitionRequests.filter(
            item => item.uid !== friendUid,
          );
          firebase
            .firestore()
            .collection('users')
            .doc(uid as string)
            .update({competitionRequests: compRequests});

          const habitRef = firebase
            .firestore()
            .collection('habits')
            .where('friends', 'array-contains', uid)
            .where('user', '==', friendUid);

          habitRef.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              const habit = documentSnapshot.data() as Habit;
              const newFriends = habit.friends.filter(item => item !== uid);
              firebase
                .firestore()
                .collection('habits')
                .doc(documentSnapshot.id)
                .update({friends: newFriends});
            });
          });

          const myHabitRef = firebase
            .firestore()
            .collection('habits')
            .where('friends', 'array-contains', friendUid)
            .where('user', '==', uid);

          myHabitRef.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              const habit = documentSnapshot.data() as Habit;
              const newFriends = habit.friends.filter(
                item => item !== friendUid,
              );
              firebase
                .firestore()
                .collection('habits')
                .doc(documentSnapshot.id)
                .update({friends: newFriends});
            });
          });

          const newFriends = curr?.friends.filter(item => item !== friendUid);
          firebase
            .firestore()
            .collection('users')
            .doc(uid as string)
            .update({friends: newFriends});
          firebase
            .firestore()
            .collection('users')
            .doc(friendUid)
            .get()
            .then(snapshot => {
              const friendUser = snapshot.data() as User;
              const newfriendUserArray = friendUser.friends.filter(
                item => item !== uid,
              );
              firebase
                .firestore()
                .collection('users')
                .doc(friendUid)
                .update({friends: newfriendUserArray});
            });
        }}
        name={'delete'}
        size={25}
      />
    </TouchableOpacity>
  );
};

export default FriendCard;
