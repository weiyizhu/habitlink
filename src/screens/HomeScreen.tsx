import React, {useEffect, useMemo, useState} from 'react';
import {Button, FlatList, ListRenderItem, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FloatingBtn from '../components/FloatingBtn';
import HabitItem from '../components/HabitItem';
import {HomeScreenProp, timePeriod} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {Habit, User} from '../utils/models';
import {getActionFromState} from '@react-navigation/native';
import { useUserContext } from '../utils/fn';

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
    friends: []
  },
];

const HomeScreen = ({route, navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();
  const [habits, setHabits] = useState<Habit[]>([]);
  const {uid} = useUserContext();

 
  useEffect(() => {
    const habitRef = firestore().collection('habits').where('user', '==', uid);
    return habitRef.onSnapshot(querySnapshot => {
      const habitList: Habit[] = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        habitList.push(doc.data() as Habit);
      });
      setHabits(habitList);
      console.log('habitList', habitList);
    });
  }, []);

  // const [flag, setFlag] = useState(true)
  // useEffect(() => {
  //   console.log(habits)
  //   setFlag(prev => !prev)
  // }, [habits])


  const renderItem: ListRenderItem<Habit> = ({item, index, separators}) => (
    <HabitItem {...item} navigation={navigation} />
  );

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList data={habits} renderItem={renderItem} extraData={habits} />
      <FloatingBtn />
    </View>
  );
};

export default HomeScreen;
