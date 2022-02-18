import React, {useEffect, useState} from 'react';
import {Button, FlatList, ListRenderItem, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FloatingBtn from '../components/FloatingBtn';
import HabitItem from '../components/HabitItem';
import {HomeScreenProp, timePeriod} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {Habit, User} from '../utils/models';

const bobby = '4eY9hdKiwODlOKeOcnEW';
const bobby2 = 'yDSrrUp2DQSkifDwvjov';
const habit1 = '3gsLcMNx3icA6O7fnlpQ';
const habit2 = 'EY7ppVzrMRKwPoNAY84R';

const mockData: Habit[] = [
  {
    currentStreak: 3,
    dates: [],
    details: {
      completed: 1,
      description: 'habit description',
      goalPerTP: 4,
      name: 'habit 1',
      timePeriod: timePeriod.Week,
    },
    longestStreak: 4,
  },
];

const HomeScreen = ({route, navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();
  const [user, setUser] = useState<User>();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    console.log('first');
    // const fetchInfo = () => {
    //   return new Promise<Habit[]>(resolve => {
    //     const userRef = firestore().collection('users').doc(bobby);
    //     return userRef.onSnapshot(documentSnapshot => {
    //       const currentUser = documentSnapshot.data() as User | undefined;
    //       setUser(currentUser);
    //       let habitList: Habit[] = [];
    //       currentUser?.habits.forEach(habitId => {
    //         const habitRef = firestore().collection('habits').doc(habitId);
    //         const unsubscribe = habitRef.onSnapshot(documentSnapshot => {
    //           const habit = documentSnapshot.data() as Habit | undefined;
    //           habit && habitList.push(habit);
    //           console.log(habit, habitList);
    //         });
    //         unsubscribe();
    //       });
    //       resolve(habitList)
    //     });
    //   });
    // };
    // fetchInfo().then(x => {console.log(x); setHabits(x)})

    const userRef = firestore().collection('users').doc(bobby);
    return userRef.onSnapshot(documentSnapshot => {
      const currentUser = documentSnapshot.data() as User | undefined;
      setUser(currentUser);
      let habitList: Habit[] = [];
      currentUser?.habits.forEach(habitId => {
        const habitRef = firestore().collection('habits').doc(habitId);
        const unsubscribe = habitRef.onSnapshot(documentSnapshot => {
          const habit = documentSnapshot.data() as Habit | undefined;
          habit && habitList.push(habit);
          console.log(habit, habitList);
          unsubscribe();
        });
      });
      console.log(habitList);
      setHabits(habitList);
    });
  }, []);

  // const userRef = firestore().collection('users').doc(bobby);
  // userRef.onSnapshot(documentSnapshot => {
  //   const currentUser = documentSnapshot.data() as User | undefined;
  //   setUser(currentUser);
  //   let habitList: Habit[] = [];
  //   currentUser?.habits.forEach(habitId => {
  //     const habitRef = firestore().collection('habits').doc(habitId);
  //     habitRef.onSnapshot(documentSnapshot => {
  //       const habit = documentSnapshot.data() as Habit | undefined;
  //       habit && habitList.push(habit);
  //     });
  //   });
  //   console.log(habitList);
  //   setHabits(habitList);
  // });

  const renderItem: ListRenderItem<Habit> = ({item, index, separators}) => (
    <HabitItem {...item} navigation={navigation} />
  );

  return (
    <View style={tailwind('flex-1 px-7')}>
      <FlatList data={mockData} renderItem={renderItem} extraData={habits} />
      <FloatingBtn />
    </View>
  );
};

export default HomeScreen;
