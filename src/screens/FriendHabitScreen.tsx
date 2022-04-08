import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FriendHabitItem from '../components/FriendHabitItem';
import {HabitWithUid, ShowHomeNavigationProp} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {Habit} from '../utils/models';
import {useUserContext} from '../utils/fn';

const FriendHabitScreen = ({route, navigation}: ShowHomeNavigationProp) => {
  const {friendUid, friendName} = route.params;
  const {uid} = useUserContext();
  const tailwind = useTailwind();
  const [habits, setHabits] = useState<HabitWithUid[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: friendName ? friendName : 'Error',
    });
    const habitRef = firestore()
      .collection('habits')
      .where('user', '==', friendUid)
      .where('friends', 'array-contains', uid);
    return habitRef.onSnapshot(querySnapshot => {
      console.log(querySnapshot);
      const habitList: HabitWithUid[] = [];
      querySnapshot.forEach(doc => {
        const habitInfo = doc.data() as Habit;
        habitList.push({...habitInfo, uid: doc.id});
      });
      setHabits(habitList);
    });
  }, [uid, setHabits]);

  const renderItem: ListRenderItem<HabitWithUid> = ({item}) => (
    <FriendHabitItem {...item} navigation={navigation} />
  );

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList data={habits} renderItem={renderItem} extraData={habits} />
    </View>
  );
};

export default FriendHabitScreen;
