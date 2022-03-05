import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {
  DetailsScreenNavigationProp,
  fontType,
  HabitWithUid,
} from '../utils/types';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DetailsInfo from '../components/DetailsInfo';
import {timePeriod as timePeriodEnum} from '../utils/types';
import {useUserContext} from '../utils/fn';

const DetailsScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {habits} = useUserContext();
  const {uid} = route.params;
  const habit = habits.find(habitObj => habitObj.uid === uid);

  useEffect(() => {
    navigation.setOptions({
      title: habit ? habit.name : 'Error',
    });
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

  const {
    completed,
    currentStreak,
    dates,
    description,
    goalPerTP,
    longestStreak,
    name,
    timePeriod,
    user,
  } = habit;

  const timePeriodGoal =
    timePeriod === timePeriodEnum.Day ? 'Daily' : timePeriod + 'ly';

  console.log('Details', currentStreak);

  return (
    <View style={tailwind('flex-1 items-center px-7')}>
      <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
        {description}
      </CustomText>
      <Calendar />
      <View style={tailwind('flex-row justify-evenly w-full mt-5')}>
        <DetailsInfo title={`${timePeriodGoal} \nGoal:`} num={goalPerTP} />
        <DetailsInfo title={'Current \nStreak:'} num={currentStreak} />
        <DetailsInfo title={'Longest \nStreak:'} num={longestStreak} />
      </View>
    </View>
  );
};

export default DetailsScreen;
