import React, {useEffect, useMemo, useState} from 'react';
import {Button, FlatList, ListRenderItem, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FloatingBtn from '../components/FloatingBtn';
import HabitItem from '../components/HabitItem';
import {HabitWithUid, HomeScreenProp, timePeriod} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {Habit, User} from '../utils/models';
import {getActionFromState} from '@react-navigation/native';
import {useUserContext} from '../utils/fn';

const bobby = '4eY9hdKiwODlOKeOcnEW';
const bobby2 = 'yDSrrUp2DQSkifDwvjov';
const habit1 = '3gsLcMNx3icA6O7fnlpQ';
const habit2 = 'EY7ppVzrMRKwPoNAY84R';

const mockData: Habit[] = [
  {
    user: 'bobby',
    currentStreak: 3,
    dates: [],
    completed: 1,
    description: 'habit description',
    goalPerTP: 4,
    name: 'habit 1',
    timePeriod: timePeriod.Week,
    longestStreak: 4,
    friends: [],
  },
];

const HomeScreen = ({route, navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();
  const {uid, habits, setHabits} = useUserContext();

  useEffect(() => {
    const habitRef = firestore().collection('habits').where('user', '==', uid);
    return habitRef.onSnapshot(querySnapshot => {
      const habitList: HabitWithUid[] = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        const habitInfo = doc.data() as Habit;
        habitList.push({...habitInfo, uid: doc.id});
      });
      setHabits(habitList);
      console.log('habitList', habitList);
    });
  }, [uid, setHabits]);

  const renderItem: ListRenderItem<HabitWithUid> = ({
    item,
    index,
    separators,
  }) => <HabitItem {...item} navigation={navigation} />;

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList data={habits} renderItem={renderItem} extraData={habits} />
      <FloatingBtn />
    </View>
  );
};

export default HomeScreen;
