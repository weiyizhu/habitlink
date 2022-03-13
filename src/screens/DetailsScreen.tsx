import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {
  DetailsScreenNavigationProp,
  fontType,
  MarkedDatesType,
} from '../utils/types';
import {Calendar, DateData} from 'react-native-calendars';
import DetailsInfo from '../components/DetailsInfo';
import {TimePeriod} from '../utils/types';
import {calcHabitDetailsInfo, useUserContext} from '../utils/fn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {firebase} from '@react-native-firebase/firestore';

const DetailsScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {habits} = useUserContext();
  const {uid} = route.params;
  const habit = habits.find(habitObj => habitObj.uid === uid);
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

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

  useLayoutEffect(() => {
    if (habit) {
      const {name, description, goalPerTP, timePeriod, friends, user} = habit;
      navigation.setOptions({
        headerRight: () => (
          <MaterialIcons
            onPress={() => {
              navigation.navigate('EditHabit', {
                uid,
                name,
                description,
                goalPerTP,
                timePeriod,
                friends,
                user,
              });
            }}
            name={'edit'}
            size={25}
            style={{right: 35}}
          />
        ),
      });
    }
  }, [uid, habit, navigation]);

  if (habit === undefined) {
    return (
      <View style={tailwind('flex-1 items-center px-7')}>
        <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
          Cannot find habit.
        </CustomText>
      </View>
    );
  }

  const toggleDayCompleted = (day: DateData) => {
    const newDates = [...habit.dates];
    const pressedDay = firebase.firestore.Timestamp.fromDate(
      new Date(moment(day.dateString).format('LL')),
    );
    let index = -1;
    for (let i = 0; i < newDates.length; i++) {
      if (JSON.stringify(newDates[i]) === JSON.stringify(pressedDay)) {
        index = i;
        break;
      }
    }
    console.log(index);
    if (index > -1) {
      newDates.splice(index, 1);
    } else {
      newDates.push(pressedDay);
    }
    firebase.firestore().collection('habits').doc(uid).update({
      dates: newDates,
    });
  };

  const {completed, dates, description, goalPerTP, name, timePeriod, user} =
    habit;

  const timePeriodGoal =
    timePeriod === TimePeriod.Day ? 'Daily' : timePeriod + 'ly';

  console.log('Details', currentStreak);

  return (
    <View style={tailwind('flex-1 px-7')}>
      <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
        {description}
      </CustomText>
      <Calendar
        markingType="period"
        markedDates={markedDates}
        maxDate={moment().format('YYYY-MM-DD')}
        onDayPress={toggleDayCompleted}
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

export default DetailsScreen;
