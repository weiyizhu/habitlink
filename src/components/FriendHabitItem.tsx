import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {HabitItemProps, TimePeriod} from '../utils/types';
import {findTimestampIndex, sortDates} from '../utils/fn';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

const FriendHabitItem = ({
  navigation,
  dates,
  goalPerTP,
  name,
  timePeriod,
  uid,
}: HabitItemProps) => {
  const tailwind = useTailwind();
  const todayTimestamp = firebase.firestore.Timestamp.fromDate(
    new Date(moment().format('LL')),
  );
  const checked = findTimestampIndex(dates, todayTimestamp) > -1;

  let completed = 0;
  const currWeek = moment().week();
  const currMonth = moment().month();
  const currYear = moment().year();
  if (timePeriod === TimePeriod.Day) {
    if (checked) completed = 1;
  } else if (timePeriod === TimePeriod.Week) {
    const sortedDates = sortDates(dates, false);
    for (const date of sortedDates) {
      const currDay = moment(date.toDate());
      if (currDay.year() === currYear && currDay.week() === currWeek) {
        completed++;
      } else break;
    }
  } else {
    const sortedDates = sortDates(dates, false);
    for (const date of sortedDates) {
      const currDay = moment(date.toDate());
      if (currDay.year() === currYear && currDay.month() === currMonth) {
        completed++;
      } else break;
    }
  }

  const bgColor = completed >= goalPerTP ? 'bg-hl-blue' : 'bg-neutral-200';

  return (
    <TouchableOpacity
      style={tailwind(
        `px-3 py-2 ${bgColor} flex-row justify-between items-center mb-4`,
      )}
      onPress={() => {
        navigation.navigate('ShowDetails', {
          uid,
        });
      }}
    >
      <View>
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{name}</Text>
        <Text
          style={tailwind('text-sm font-YC_Light')}
        >{`${completed}/${goalPerTP} x ${timePeriod}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendHabitItem;
