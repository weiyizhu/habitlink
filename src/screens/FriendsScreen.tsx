import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FriendCard from '../components/FriendCard';
import {useUserContext} from '../utils/fn';
import {User} from '../utils/models';
import {FriendCardProps} from '../utils/types';

const FriendsScreen = () => {
  const tailwind = useTailwind();
  const {user, friends, setFriends} = useUserContext();

  useEffect(() => {
    let temp: FriendCardProps[] = [];
    user?.friends.forEach((friendid: string) => {
      const toAdd: FriendCardProps | null = null;
      firestore()
        .collection('users')
        .doc(friendid)
        .get()
        .then(f => {
          const obj: User = f.data() as User;
          temp = temp.concat({name: obj.name, uid: friendid});
          setFriends(temp);
        });
    });
  }, [user, setFriends]);

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList
        data={friends}
        renderItem={({item}) => {
          return <FriendCard {...item} />;
        }}
        extraData={friends}
      />
    </View>
  );
};

export default FriendsScreen;
