import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {
  fontType,
  HabitWithUid,
  MarkedDatesType,
  ShowDetailsNavigationProp,
} from '../utils/types';
import {Calendar} from 'react-native-calendars';
import DetailsInfo from '../components/DetailsInfo';
import {TimePeriod} from '../utils/types';
import {calcHabitDetailsInfo} from '../utils/fn';
import moment from 'moment';
import {firebase} from '@react-native-firebase/firestore';
import {Habit} from '../utils/models';

const FriendDetailsScreen = ({
  navigation,
  route,
}: ShowDetailsNavigationProp) => {
  const tailwind = useTailwind();
  const {uid} = route.params;
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [habit, setHabit] = useState<HabitWithUid | undefined>();

  useEffect(() => {
    return firebase
      .firestore()
      .collection('habits')
      .doc(uid)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.data() as Habit;
        setHabit({...data, uid: uid});
      });
  }, [uid, navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: habit ? habit.name : 'Error',
    });
    if (habit) {
      const [newMarkedDates, currStreak, maxStreak] =
        calcHabitDetailsInfo(habit);
      setMarkedDates(newMarkedDates);
      setCurrentStreak(currStreak);
      setLongestStreak(maxStreak);
    }
  }, [habit, navigation]);

  if (habit === undefined) {
    return (
      <View style={tailwind('flex-1 items-center px-7')}>
        <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
          Cannot find habit.
        </CustomText>
      </View>
    );
  }

  const {description, goalPerTP, timePeriod} = habit;

  const timePeriodGoal =
    timePeriod === TimePeriod.Day ? 'Daily' : timePeriod + 'ly';

  return (
    <View style={tailwind('flex-1 px-7')}>
      <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
        {description}
      </CustomText>
      <Calendar
        markingType="period"
        markedDates={markedDates}
        maxDate={moment().format('YYYY-MM-DD')}
        hideExtraDays
        enableSwipeMonths
      />
      <View style={tailwind('flex-row justify-evenly w-full mt-5')}>
        <DetailsInfo title={`${timePeriodGoal} \nGoal:`} num={goalPerTP} />
        <DetailsInfo title={'Current \nStreak:'} num={currentStreak} />
        <DetailsInfo title={'Longest \nStreak:'} num={longestStreak} />
      </View>
    </View>
  );
};

export default FriendDetailsScreen;
