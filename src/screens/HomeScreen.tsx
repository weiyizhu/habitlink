import React, {useEffect} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FloatingBtn from '../components/FloatingBtn';
import HabitItem from '../components/HabitItem';
import {HabitWithUid, HomeScreenProp, TimePeriod} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {Habit} from '../utils/models';
import {useUserContext} from '../utils/fn';

const HomeScreen = ({navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();
  const {uid, habits, setHabits} = useUserContext();

  const handlePlusCirclePress = () => {
    navigation.navigate('CreateHabit', {
      user: uid as string,
    });
  };

  useEffect(() => {
    const habitRef = firestore().collection('habits').where('user', '==', uid);
    return habitRef.onSnapshot(querySnapshot => {
      const habitList: HabitWithUid[] = [];
      querySnapshot.forEach(doc => {
        const habitInfo = doc.data() as Habit;
        habitList.push({...habitInfo, uid: doc.id});
      });
      setHabits(habitList);
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
      <View style={tailwind('h-24 justify-center')}>
        <FloatingBtn handlePlusCirclePress={handlePlusCirclePress} />
      </View>
    </View>
  );
};

export default HomeScreen;
